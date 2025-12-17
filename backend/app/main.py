import logging
from pathlib import Path

from alembic import command
from alembic.config import Config
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import settings
from .routers import users, projects, tasks, progress, admin


def run_migrations() -> None:
    """Run Alembic migrations on startup; safe to call repeatedly."""
    try:
        base_path = Path(__file__).resolve().parents[1]
        alembic_cfg = Config(str(base_path / "alembic.ini"))
        alembic_cfg.set_main_option("script_location", str(base_path / "migrations"))
        alembic_cfg.set_main_option("sqlalchemy.url", settings.DATABASE_URL)
        command.upgrade(alembic_cfg, "head")
    except Exception as exc:  # pragma: no cover - startup best-effort
        logging.warning("Alembic migration skipped due to error: %s", exc)


run_migrations()
app = FastAPI(title="TaskFlow API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    # Allow configured origins (comma-separated via env) so Render frontend URLs can be added without code changes
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(users.router, prefix="/api/v1/users", tags=["users"])
app.include_router(projects.router, prefix="/api/v1/projects", tags=["projects"])
app.include_router(tasks.router, prefix="/api/v1/tasks", tags=["tasks"])
app.include_router(progress.router, prefix="/api/v1/progress", tags=["progress"])
app.include_router(admin.router, prefix="/api/v1/admin", tags=["admin"])


@app.get("/")
def root():
    return {"message": "Welcome to TaskFlow API"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}
