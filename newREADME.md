# Symfony + React Boilerplate

This project is a boilerplate for building applications using Symfony as the backend and React with Vite as the frontend. It provides a minimal setup with essential configurations for both frameworks, including Docker support.

This structure is designed to separate the frontend (React + Vite) from the backend (Symfony), while also providing a clean setup for Docker, testing, and configuration. It is extensible for both small and large-scale applications.

## Features

- **Symfony Backend**: A robust backend built with Symfony, featuring **JWT authentication** and **CORS** support for secure API communication.
- **React Frontend**: A modern frontend built using **React** and **Vite** for fast development and **Hot Module Replacement (HMR)**.
- **Tailwind CSS**: A utility-first CSS framework for building custom designs quickly and easily.
- **ShadCN UI**: A set of composable UI components integrated with **Tailwind CSS** to speed up UI development.
- **Docker Support**: Easily run the application in isolated containers using Docker and Docker Compose.
- **ESLint and Prettier**: Integrated code quality tools to maintain coding standards.

## Docker Support - Included Containers

- **phpMyAdmin**: Web interface for managing MySQL.
- **MySQL 8**: Relational database.
- **PHP 8.3**: PHP version used for the backend.
- **Node 18**: Node.js version used for the frontend.

## Continuous Integration (CI) with GitHub Actions

The project includes a CI workflow that:
- Checks the Docker build **at the very start** of the pipeline (fail fast if Dockerfile or docker-compose errors).
- Installs backend and frontend dependencies.
- Runs code quality checks (PHPStan, PHPCS, ESLint).
- Runs Symfony unit and integration tests.
- Allows running tests inside Docker to guarantee reproducibility.

### Example CI workflow (excerpt)

```yaml
jobs:
  docker-build:
    name: 🐳 Build Docker Images
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build Docker images
        run: docker compose build

  setup-backend:
    needs: docker-build
    # ...
```

## Getting Started

### Prerequisites

- Docker
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/symfony-react-boilerplate.git
   cd symfony-react-boilerplate
   ```

2. Build and start the containers:

   ```bash
   make build
   make up
   ```

3. Install PHP dependencies:

   ```bash
   make install-php
   ```

4. Install Node.js dependencies:

   ```bash
   make install-node
   ```

5. Environnement Back & Front:

   - Create .env for back and front

6. Run the application:

   - Access the application at `http://localhost`

## Testing

- **Backend tests** are located in `app/back/tests/` and use PHPUnit. To run backend tests:
  ```bash
  make test
  # or inside the container:
  docker compose run --rm php make test
  ```
- **Frontend tests** (if present) are located in `app/front/tests/` and can be run with:
  ```bash
  make front-test
  # or inside the container:
  docker compose run --rm node npm test
  ```

## Development Workflow

- **Symfony Backend**: The Symfony application is accessible through the API and can be developed and tested via the container. Any changes to the backend code should be made in the `src/` directory.
- **React Frontend**: The frontend is served through Vite for fast reloading during development. Changes made in the `src/` directory of the React app will automatically trigger hot module replacement, allowing you to see updates immediately.
- **Docker**: Use the Docker containerized environment to run the application locally, ensuring a consistent development setup regardless of your local machine configuration.

## Explanation of the Project Structure

### Frontend (`app/front/`)

- **`public/`**: Public folder for React (includes `index.html`).
- **`src/`**: Source code for React.
  - **`assets/`**: Images, styles, and other assets.
  - **`components/`**: Reusable React components.
  - **`hooks/`**: Custom React hooks.
  - **`pages/`**: Application pages (e.g., Dashboard, Login, etc.).
  - **`services/`**: API calls and service functions.
  - **`stores/`**: State management (e.g., context providers, Redux stores).
  - **`utils/`**: Utility functions and helpers.
  - **`css/`**: CSS files for styling the application.
  - **`App.jsx`**: Main React component that wraps the application.
  - **`index.jsx`**: Entry point for React (rendering to the DOM).
- **`tests/`**: Frontend tests (if present, e.g., Jest, React Testing Library).
- **`package.json`**: Frontend dependencies (npm or yarn).
- **`vite.config.js`**: Vite configuration for the frontend.
- **`.eslint.config.js`**: ESLint configuration for code linting.
- **`.prettierrc`**: Prettier configuration for code formatting.
- **`.gitignore`**: Specifies files and directories ignored by Git (e.g., `node_modules`).

### Backend (`app/back/`)

- **`bin/`**: Console scripts for Symfony.
- **`config/`**: Configuration files for Symfony.
  - **`packages/`**: Bundle-specific configurations.
  - **`routes/`**: Routes for your Symfony application.
  - **`services.yaml`**: Configuration for Symfony services.
- **`public/`**: Public directory for Symfony (contains `index.php`).
- **`src/`**: Source code for Symfony.
  - **`Controller/`**: Symfony controllers to manage requests and responses.
  - **`Entity/`**: Symfony entities representing your application's data.
  - **`Repository/`**: Repositories for database interactions.
  - **`Security/`**: Security-related functionality (JWT authentication, roles, etc.).
  - **`Service/`**: Services for business logic and reusable functions.
  - **`EventListener/`**: Event listeners for Symfony events (optional).
- **`tests/`**: Backend tests (PHPUnit).
- **`.env`**: Environment variables for Symfony.
- **`.gitignore`**: Specifies files and directories ignored by Git (e.g., `vendor`, `var`).
- **`composer.json`**: PHP dependencies for the Symfony backend.
- **`phpunit.xml.dist`**: PHPUnit configuration for testing.
- **`phpcs.xml`**: Configuration file for PHP CodeSniffer.
- **`phpstan.dist`**: Configuration file for PHPStan.

### Miscellaneous

- **`docker-compose.yml`**: Docker Compose configuration to manage frontend and backend services.
- **`README.md`**: Main README file providing project instructions and documentation.

### Git

- **`.gitignore`**: Specifies which files should not be tracked by Git (e.g., `node_modules`, `vendor`, etc.).
