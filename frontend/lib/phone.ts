const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
const arabicDigits = '٠١٢٣٤٥٦٧٨٩';

/** Convert Persian and Arabic-Indic numerals to the ASCII digits expected by the API. */
export function normalizeDigits(value: string): string {
  return value.replace(/[۰-۹]/g, (digit) => String(persianDigits.indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String(arabicDigits.indexOf(digit)));
}

/** Return the backend's canonical Iranian mobile format, or null for invalid input. */
export function normalizeIranianPhone(value: string): string | null {
  if (typeof value !== 'string' || !value.trim()) return null;

  const normalized = normalizeDigits(value.trim());
  if (!/^[+\d\s().-]+$/.test(normalized)) return null;
  const compact = normalized.replace(/[\s().-]/g, '');
  if (compact.includes('+') && (compact[0] !== '+' || compact.indexOf('+') !== compact.lastIndexOf('+'))) {
    return null;
  }

  let localNumber = compact;

  if (compact.startsWith('+98')) {
    localNumber = `0${compact.slice(3)}`;
  } else if (compact.startsWith('0098')) {
    localNumber = `0${compact.slice(4)}`;
  } else if (compact.startsWith('98') && compact.length === 12) {
    localNumber = `0${compact.slice(2)}`;
  } else if (compact.startsWith('9') && compact.length === 10) {
    localNumber = `0${compact}`;
  }

  return /^09\d{9}$/.test(localNumber) ? localNumber : null;
}

export function normalizeOtp(value: string): string {
  return normalizeDigits(value).replace(/\D/g, '').slice(0, 5);
}
