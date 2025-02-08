# Anaximander - Open Indoor Maps Backend Service

## Overview

Anaximander is a robust backend service for Open Indoor Maps. Built with Node.js, Express, PostgreSQL/PostGIS, and Prisma.

## Features

TBD

## Tech Stack

*   **Node.js:**  JavaScript runtime environment
*   **Express:**  Web application framework
*   **PostgreSQL/PostGIS:**  Object-relational database with geographic extensions
*   **Prisma:**  ORM (Object-Relational Mapper)
*   **TypeScript:**  
*   **Docker:**  Containerization platform
*   **Swagger/OpenAPI:**  API documentation standard
*   **Jest:**  JavaScript testing framework
*   **ESLint/Prettier:**  Code linting and formatting tools

## Getting Started

### Prerequisites

*   Node.js (v22.13.1 LTS or later)
*   Docker and Docker Compose
*   `npm` or `yarn` package manager

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd anaximander
    ```

2.  **Install dependencies:**

    ```bash
    npm install  # or yarn install
    ```

3.  **Configure environment variables:**

    Create a `.env` file in the root directory based on the `.env.example` file.  Set the appropriate values for your PostgreSQL database connection. Example:

    ```
    POSTGRES_USER=postgres
    POSTGRES_PASSWORD=password
    POSTGRES_DB=indoor_nav
    DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/${POSTGRES_DB}?schema=public"
    ```

### Development Setup

1.  **Start the database using Docker Compose:**

    ```bash
    docker-compose up --build
    ```

    This will start a PostgreSQL database with the PostGIS extension enabled inside a Docker container.

2.  **Run Prisma Migrations:**

    ```bash
    npm run db:migrate
    npm run db:seed    # Seeds the audit_log_type table
    npm run generate
    ```

    This will create the database schema and seed the audit log types.

3.  **Start the development server:**

    ```bash
    npm run dev
    ```

    The server will start at `http://localhost:3000`.

### API Documentation

API documentation is automatically generated using Swagger/OpenAPI. Access it at: `http://localhost:3000/api/v1/docs`.


### Running Tests

```bash
npm test
```

This will execute the unit tests using Jest, providing feedback on code correctness and preventing regressions.

### Building for Production

TBD

### Running in Production

TBD

### API Endpoints

