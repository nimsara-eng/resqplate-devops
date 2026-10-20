# ResQPlate Frontend

The ResQPlate frontend is built with React and Vite.
It can run locally for development or as a Docker container
served by Nginx.

## Requirements

For Docker:
- Docker Desktop installed and running
- Linux containers enabled
- Git

For local development:
- Node.js 24
- npm

## Run Locally for Development

From the repository root:

```bash
cd frontend
npm ci
npm run dev
```

Open the local URL shown in the terminal.

## Build Locally

From the frontend directory:

```bash
npm run build
```

The production files are generated in `dist`.

To preview the build locally:

```bash
npm run preview
```

## Run with Docker

Run all Docker commands below from the repository root.

### 1. Build the Image

```bash
docker build -t resqplate-frontend:local ./frontend
```

The Docker build uses two stages:
1. Node.js installs dependencies and builds the frontend.
2. Nginx serves the generated production files.

### 2. Create and Start the Container

Run this command once to create the container:

```bash
docker run -d --name resqplate-frontend -p 127.0.0.1:8080:80 resqplate-frontend:local
```

Open:

http://localhost:8080

### 3. Check Container Status

```bash
docker ps -a --filter name=resqplate-frontend
```

### 4. View Logs

```bash
docker logs --tail 50 resqplate-frontend
```

### 5. Stop the Container

```bash
docker stop resqplate-frontend
```

### 6. Start the Existing Container

```bash
docker start resqplate-frontend
```

### 7. Rebuild After Code Changes

Build the updated image, then replace the existing container:

```bash
docker build -t resqplate-frontend:local ./frontend
docker stop resqplate-frontend
docker rm resqplate-frontend
docker run -d --name resqplate-frontend -p 127.0.0.1:8080:80 resqplate-frontend:local
```

## Docker Configuration Files

| File | Purpose |
| --- | --- |
| `Dockerfile` | Builds the frontend and serves it using Nginx |
| `.dockerignore` | Excludes local dependencies, builds, environment files and archives from the build context |
| `nginx.conf` | Configures static file serving and the SPA fallback |

The Nginx configuration falls back to `index.html` for application
paths that do not match an existing file.

## Continuous Integration

Workflow file:

`.github/workflows/frontend-ci.yml`

The Frontend Docker CI workflow runs on:
- Pushes to any branch that change frontend files or the workflow.
- Pull requests targeting `main` that change those files.
- Manual runs through GitHub Actions once the workflow is on the default branch.

The workflow checks out the repository and runs:

```bash
docker build -t resqplate-frontend:ci ./frontend
```

A successful run confirms that the Docker image builds.
It does not publish the image or deploy the website.

View results in the repository's **Actions** tab.

## Backend Integration

This container serves the frontend only.
Backend and database services must be configured separately
for features that require API access.

## Troubleshooting

### Container Name Already Exists

Start the existing container:

```bash
docker start resqplate-frontend
```

If you need to replace it with an updated image, follow the
rebuild instructions above.

### Port 8080 Is Already in Use

Use another available host port:

```bash
docker run -d --name resqplate-frontend-alt -p 127.0.0.1:8081:80 resqplate-frontend:local
```

Then open http://localhost:8081.

### Docker Cannot Connect to the Engine

Open Docker Desktop and wait until the engine is running.
Check its status with:

```bash
docker info
```