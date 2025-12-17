from pydantic import field_validator
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # Database
    DATABASE_URL: str
    
    # JWT
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Redis
    REDIS_URL: str = "redis://redis:6379"
    
    # CORS
    CORS_ORIGINS: list[str] = ["http://localhost:5173"]
    # Admin - designate an admin email for admin-only endpoints (optional)
    ADMIN_EMAIL: str | None = None
    
    @field_validator("CORS_ORIGINS", mode="before")
    def split_cors_origins(cls, value):
        if isinstance(value, str):
            return [origin.strip() for origin in value.split(",") if origin.strip()]
        return value

    class Config:
        env_file = ".env"


settings = Settings()
