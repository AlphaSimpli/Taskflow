# TaskFlow

**TaskFlow** is a web-based project and task management application designed to simplify team collaboration. Inspired by Trello and Asana, it provides an intuitive Kanban-style interface that allows users to easily organize tasks, track project progress, and manage workflow in real time.

## 🎯 Features

- **User Authentication**: Secure JWT-based authentication
- **Project Management**: Create, view, update, and delete projects
- **Kanban Board**: Organize tasks in three columns (Todo, In Progress, Done)
- **Task Management**: Full CRUD operations for tasks
- **Progress Tracking**: Automatic progress calculation based on task completion
- **Modern UI**: Clean, minimalist design with smooth animations

## 🏗️ Tech Stack

### Backend
- **FastAPI**: Modern Python web framework
- **SQLAlchemy**: ORM for database operations
- **PostgreSQL**: Relational database
- **Redis**: Caching layer
- **JWT**: Authentication tokens
- **Alembic**: Database migrations

### Frontend
- **React**: UI framework
- **TypeScript**: Type safety
- **Vite**: Build tool
- **Tailwind CSS**: Styling
- **Framer Motion**: Animations
- **Axios**: HTTP client

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose installed
- Git

### Installation & Running

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd taskflow
   ```

2. **Build and start all services**:
   ```bash
   docker compose up --build
   ```

   This will start:
   - PostgreSQL database on port 5432
   - Redis on port 6379
   - Backend API on port 8000
   - Frontend app on port 5173

3. **Access the application**:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

### First Time Setup

1. Open http://localhost:5173 in your browser
2. Click "Sign up" to create a new account
3. Create your first project
4. Add tasks and organize them on the Kanban board

## 📁 Project Structure

```
taskflow/
├── backend/
│   ├── app/
│   │   ├── main.py           # FastAPI app initialization
│   │   ├── config.py          # Configuration settings
│   │   ├── database.py        # Database setup
│   │   ├── models.py          # SQLAlchemy models
│   │   ├── schemas.py         # Pydantic schemas
│   │   ├── auth.py            # Authentication logic
│   │   ├── deps.py            # Dependencies
│   │   └── routers/
│   │       ├── users.py       # User routes
│   │       ├── projects.py    # Project routes
│   │       ├── tasks.py       # Task routes
│   │       └── progress.py    # Progress routes
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .dockerignore
│
├── frontend/
│   ├── src/
│   │   ├── App.tsx            # Main app component
│   │   ├── main.tsx           # Entry point
│   │   ├── index.css          # Global styles
│   │   ├── pages/
│   │   │   ├── Login.tsx      # Login page
│   │   │   ├── Dashboard.tsx  # Projects dashboard
│   │   │   └── ProjectView.tsx # Kanban board
│   │   ├── components/
│   │   │   ├── Navbar.tsx
│   │   │   ├── TaskItem.tsx
│   │   │   └── KanbanColumn.tsx
│   │   └── services/
│   │       └── api.ts         # API client
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── Dockerfile
│   └── .dockerignore
│
├── docker-compose.yml
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/v1/users/register` - Register new user
- `POST /api/v1/users/login` - Login
- `GET /api/v1/users/me` - Get current user

### Projects
- `GET /api/v1/projects/` - List all projects
- `POST /api/v1/projects/` - Create project
- `GET /api/v1/projects/{id}` - Get project details
- `PUT /api/v1/projects/{id}` - Update project
- `DELETE /api/v1/projects/{id}` - Delete project

### Tasks
- `GET /api/v1/tasks/project/{project_id}` - List tasks in project
- `POST /api/v1/tasks/` - Create task
- `GET /api/v1/tasks/{id}` - Get task details
- `PUT /api/v1/tasks/{id}` - Update task
- `DELETE /api/v1/tasks/{id}` - Delete task

### Progress
- `GET /api/v1/progress/project/{project_id}` - Get project progress
- `GET /api/v1/progress/` - List all progress

## 🔒 Environment Variables

### Backend
- `DATABASE_URL`: PostgreSQL connection string
- `SECRET_KEY`: JWT secret key (change in production!)
- `ALGORITHM`: JWT algorithm (default: HS256)
- `ACCESS_TOKEN_EXPIRE_MINUTES`: Token expiration time
- `REDIS_URL`: Redis connection string

### Frontend
- `VITE_API_URL`: Backend API URL

## 🧪 Development

### Running Backend Only
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Running Frontend Only
```bash
cd frontend
npm install
npm run dev
```

## 📝 Database Migrations

The application uses SQLAlchemy with automatic table creation. For production, consider using Alembic for migrations:

```bash
# In backend directory
alembic init alembic
alembic revision --autogenerate -m "Initial migration"
alembic upgrade head
```

## 🐳 Docker Commands

```bash
# Build and start
docker compose up --build

# Start in background
docker compose up -d

# Stop services
docker compose down

# View logs
docker compose logs -f

# Clean up (including volumes)
docker compose down -v
```

## 🚧 Future Enhancements

- [ ] Drag-and-drop task reordering
- [ ] Real-time collaboration
- [ ] Task assignments and due dates
- [ ] File attachments
- [ ] Comments and activity feed
- [ ] Team workspace
- [ ] Advanced filtering and search
- [ ] Email notifications

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using FastAPI, React, and Docker

# Taskflow
