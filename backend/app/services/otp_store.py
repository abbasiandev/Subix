"""Shared, single-use OTP state backed by Turso."""

from dataclasses import dataclass
from typing import Optional

from app.db import client as db


PHONE_HOURLY_LIMIT = 5
CLIENT_IP_HOURLY_LIMIT = 20


@dataclass(frozen=True)
class ActiveChallenge:
    challenge_id: str
    code_hmac: str


def reserve(
    *,
    challenge_id: str,
    phone: str,
    client_ip: Optional[str],
    code_hmac: str,
    created_at: int,
    expires_at: int,
    cooldown_seconds: int,
    hourly_limit: int = PHONE_HOURLY_LIMIT,
    ip_hourly_limit: int = CLIENT_IP_HOURLY_LIMIT,
) -> bool:
    """Atomically reserve a send slot and persist a non-active challenge.

    The conditional INSERT is one SQLite write statement.  It counts failed
    provider sends too, so a caller cannot bypass the cooldown or hourly quota
    by repeatedly causing provider failures.
    """
    hour_start = created_at - 3600
    cooldown_start = created_at - cooldown_seconds
    result = db.execute_atomic(
        """
        INSERT INTO otp_challenges
            (challenge_id, phone_number, client_ip, code_hmac, status,
             created_at, expires_at, failed_attempts)
        SELECT ?, ?, ?, ?, 'reserved', ?, ?, 0
        WHERE NOT EXISTS (
            SELECT 1 FROM otp_challenges
            WHERE phone_number = ? AND created_at > ?
        )
        AND (
            SELECT COUNT(*) FROM otp_challenges
            WHERE phone_number = ? AND created_at > ?
        ) < ?
        AND (
            ? IS NULL OR (
                SELECT COUNT(*) FROM otp_challenges
                WHERE client_ip = ? AND created_at > ?
            ) < ?
        )
        RETURNING challenge_id
        """,
        [
            challenge_id,
            phone,
            client_ip,
            code_hmac,
            created_at,
            expires_at,
            phone,
            cooldown_start,
            phone,
            hour_start,
            hourly_limit,
            client_ip,
            client_ip,
            hour_start,
            ip_hourly_limit,
        ],
    )
    return bool(result.rows)


def activate(challenge_id: str) -> bool:
    # Activating a replacement must invalidate every older active challenge in
    # the same statement. Otherwise an old code could become usable again if
    # the newest challenge were consumed first.
    result = db.execute_atomic(
        """
        UPDATE otp_challenges
        SET status = CASE
            WHEN challenge_id = ? THEN 'active'
            ELSE 'superseded'
        END
        WHERE phone_number = (
            SELECT phone_number
            FROM otp_challenges
            WHERE challenge_id = ? AND status = 'reserved'
        )
        AND (challenge_id = ? OR status = 'active')
        RETURNING challenge_id
        """,
        [challenge_id, challenge_id, challenge_id],
    )
    return any(row.values and row.values[0] == challenge_id for row in result.rows)


def latest_active(phone: str, now: int) -> Optional[ActiveChallenge]:
    result = db.execute_once(
        """
        SELECT challenge_id, code_hmac
        FROM otp_challenges
        WHERE phone_number = ? AND status = 'active' AND expires_at > ?
        ORDER BY created_at DESC
        LIMIT 1
        """,
        [phone, now],
    )
    if not result.rows:
        return None
    challenge_id, code_hmac = result.rows[0].values
    return ActiveChallenge(str(challenge_id), str(code_hmac))


def consume_if_matches(challenge_id: str, code_hmac: str, now: int) -> bool:
    result = db.execute_atomic(
        """
        UPDATE otp_challenges
        SET status = 'consumed'
        WHERE challenge_id = ? AND status = 'active'
          AND expires_at > ? AND failed_attempts < 5
          AND code_hmac = ?
        RETURNING challenge_id
        """,
        [challenge_id, now, code_hmac],
    )
    return bool(result.rows)


def record_failed_attempt(challenge_id: str, now: int) -> bool:
    result = db.execute_atomic(
        """
        UPDATE otp_challenges
        SET failed_attempts = failed_attempts + 1,
            status = CASE WHEN failed_attempts + 1 >= 5
                          THEN 'exhausted' ELSE status END
        WHERE challenge_id = ? AND status = 'active'
          AND expires_at > ? AND failed_attempts < 5
        RETURNING failed_attempts
        """,
        [challenge_id, now],
    )
    return bool(result.rows)
