from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    # Telegram
    bot_token: str
    webhook_url: str

    # JWT
    secret_key: str
    jwt_algorithm: str = "HS256"
    jwt_expire_minutes: int = 10080  # 7 days

    # Turso
    turso_url: str
    turso_auth_token: str

    # App
    app_name: str = "Subix"
    frontend_url: str
    debug: bool = False


settings = Settings()
