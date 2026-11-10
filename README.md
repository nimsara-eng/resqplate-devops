# resqplate-devops
Surplus food rescue and distribution web platform built with React, Node.js, MongoDB, Docker, and DevOps practices.

## Run with Docker

Requirements: **Git** and **Docker Desktop**. Node.js is not needed (dependencies are installed inside the Docker images).

### 1. Clone the repository

```powershell
git clone https://github.com/nimsara-eng/resqplate-devops.git
cd resqplate-devops
```

### 2. Create the environment files

```powershell
copy backend\.env.mongo.example backend\.env.mongo
copy backend\.env.container.example backend\.env.container
```

Open both files and set your own passwords:

- `MONGO_APP_PASSWORD` in `.env.mongo` must match the password inside `MONGO_URI` in `.env.container`.
- These files contain secrets and are ignored by Git. Never commit them.

### 3. Start the application

```powershell
docker compose up -d --build
```

On the first start, MongoDB creates the app user automatically (`mongo-init/01-create-app-user.js`).

| Service  | URL                    |
| -------- | ---------------------- |
| Frontend | http://localhost:8080  |
| Backend  | http://localhost:5000  |

### Useful commands

| Command                       | What it does                                        |
| ----------------------------- | --------------------------------------------------- |
| `docker compose ps`           | Show container status                               |
| `docker compose logs backend` | Show backend logs                                   |
| `docker compose stop`         | Stop the containers (data is kept)                  |
| `docker compose up -d`        | Start again                                         |

> Do not run `docker compose down -v`. The `-v` flag deletes the MongoDB data volume.
