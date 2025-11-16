# TaskFlow Project Structure

## 📂 Complete Directory Tree

```
taskflow/
├── README.md                      # Main project documentation
├── QUICKSTART.md                  # Quick start guide
├── PROJECT_STRUCTURE.md           # This file
├── docker-compose.yml             # Docker orchestration
│
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                # FastAPI app entry point
│   │   ├── config.py              # Configuration & settings
│   │   ├── database.py            # SQLAlchemy setup
│   │   ├── models.py              # Database models (User, Project, Task, Progress)
│   │   ├── schemas.py             # Pydantic schemas
│   │   ├── auth.py                # JWT authentication logic
│   │   ├── deps.py                # FastAPI dependencies
│   │   └── routers/
│   │       ├── __init__.py
│   │       ├── users.py           # User registration/login routes
│   │       ├── projects.py        # Project CRUD routes
│   │       ├── tasks.py           # Task CRUD routes
│   │       └── progress.py        # Progress tracking routes
│   ├── requirements.txt           # Python dependencies
│   ├── Dockerfile                 # Backend container definition
│   ├── .dockerignore
│   └── .gitignore
│
└── frontend/
    ├── src/
    │   ├── main.tsx               # React entry point
    │   ├── App.tsx                # Main app component with routing
    │   ├── index.css              # Global styles with Tailwind
    │   ├── pages/
    │   │   ├── Login.tsx          # Login/Register page
    │   │   ├── Dashboard.tsx      # Projects list view
    │   │   └── ProjectView.tsx    # Kanban board view
    │   ├── components/
    │   │   ├── Navbar.tsx         # Navigation bar
    │   │   ├── KanbanColumn.tsx   # Kanban column wrapper
    │   │   └── TaskItem.tsx       # Individual task card
    │   └── services/
    │       └── api.ts             # Axios API client
    ├── index.html                 # HTML entry point
    ├── package.json               # NPM dependencies
    ├── vite.config.ts             # Vite configuration
    ├── tsconfig.json              # TypeScript config
    ├── tsconfig.node.json         # TypeScript node config
    ├── tailwind.config.js         # Tailwind CSS config
    ├── postcss.config.js          # PostCSS config
    ├── Dockerfile                 # Frontend container definition
    ├── .dockerignore
    └── .gitignore
```

## 🔍 Key Files Explained

### Backend

#### `main.py`
- FastAPI application initialization
- CORS middleware setup
- Router registration
- Health check endpoint

#### `config.py`
- Environment variables management
- Settings using Pydantic Settings

#### `database.py`
- SQLAlchemy engine and session factory
- Database connection setup
- Dependency injection for DB sessions

#### `models.py`
- SQLAlchemy ORM models:
  - `User`: Authentication and user data
  - `Project`: Project information
  - `Task`: Individual tasks with status
  - `Progress`: Project completion tracking

#### `schemas.py`
- Pydantic schemas for request/response validation
- Type definitions for all data models

#### `auth.py`
- Password hashing (bcrypt)
- JWT token creation
- User authentication

#### Routers
- `users.py`: Registration, login, user info
- `projects.py`: Full CRUD for projects
- `tasks.py`: Full CRUD for tasks with progress updates
- `progress.py`: Project progress retrieval

### Frontend

#### `App.tsx`
- Main routing configuration
- Protected route logic
- Global layout setup

#### Pages
- `Login.tsx`: Authentication form with mode switching
- `Dashboard.tsx`: Project list with creation modal
- `ProjectView.tsx`: Kanban board interface

#### Components
- `Navbar.tsx`: Global navigation with logout
- `KanbanColumn.tsx`: Column wrapper with styling
- `TaskItem.tsx`: Task card with status actions

#### `services/api.ts`
- Centralized Axios instance
- All API endpoints
- Token management
- Request/response interceptors

## 🐳 Docker Setup

### Services
1. **PostgreSQL**: Database (port 5432)
2. **Redis**: Cache (port 6379)
3. **Backend**: FastAPI (port 8000)
4. **Frontend**: Vite dev server (port 5173)

### Volumes
- Persistent database storage
- Development hot-reload for both frontend and backend

## 🔑 Environment Variables

### Backend
- `DATABASE_URL`: PostgreSQL connection string
- `SECRET_KEY`: JWT signing key (⚠️ change in production)
- `ALGORITHM`: JWT algorithm (HS256)
- `ACCESS_TOKEN_EXPIRE_MINUTES`: Token lifetime
- `REDIS_URL`: Redis connection string

### Frontend
- `VITE_API_URL`: Backend API base URL

## 📦 Dependencies

### Backend
- **FastAPI**: Web framework
- **SQLAlchemy**: ORM
- **PostgreSQL**: Database
- **JWT**: Authentication
- **Pydantic**: Validation
- **Redis**: Caching

### Frontend
- **React**: UI framework
- **TypeScript**: Type safety
- **Vite**: Build tool
- **Tailwind CSS**: Styling
- **Framer Motion**: Animations
- **Axios**: HTTP client
- **React Router**: Routing

## 🚀 Getting Started

See [QUICKSTART.md](QUICKSTART.md) for immediate setup instructions.

See [README.md](README.md) for comprehensive documentation.

