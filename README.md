# Trello Clone API Documentation

## Table of Contents

1. [Authentication](#authentication)

   - [POST /auth/login](#post-authlogin)
   - [POST /auth/signup](#post-authsignup)

2. [Tasks](#tasks)
   - [GET /tasks](#get-tasks)
   - [GET /tasks/:id](#get-tasksid)
   - [POST /tasks](#post-tasks)
   - [PATCH /tasks/:id](#patch-tasksid)
   - [DELETE /tasks/:id](#delete-tasksid)

### Authentication

This section describes the endpoints related to user authentication. To access other endpoints, you must be authenticated and provide a JSON Web Token (JWT) in the request headers.

#### POST /auth/login

- **Description**: Log in a user by providing valid credentials (email and password).
- **Request Body**:
  - `email` (string, required): User's email.
  - `password` (string, required): User's password.
- **Response**:
  - 200 OK: Successfully logged in. Returns a JWT token.
  - 401 Unauthorized: Invalid credentials.

#### POST /auth/signup

- **Description**: Create a new user by providing user information.
- **Request Body**:
  - `email` (string, required): User's email.
  - `password` (string, required): User's password.
- **Response**:
  - 201 Created: User successfully created. Returns a JWT token.
  - 400 Bad Request: Invalid user data (e.g., duplicate email).

### Tasks

This section describes the endpoints for managing tasks within the Trello Clone application.

#### Authentication Requirements

To access task-related endpoints, you must include the JWT token in the request headers as follows:

```
Authorization: Bearer {your_jwt_token}
```

#### GET /tasks

- **Description**: Get a list of all tasks.
- **Response**:
  - 200 OK: Returns a list of tasks.

#### GET /tasks/:id

- **Description**: Get a specific task by its ID.
- **Parameters**:
  - `id` (string, required): Task ID.
- **Response**:
  - 200 OK: Returns the task with the specified ID.
  - 404 Not Found: Task not found.

#### POST /tasks

- **Description**: Create a new task.
- **Request Body**:
  - `title` (string, required): Task title.
  - `description` (string, optional): Task description.
  - `priority` (string, optional): Task priority.
  - `state` (enum, optional): Task state (TODO, IN_PROGRESS, DONE).
- **Response**:
  - 201 Created: Task successfully created. Returns the created task.
  - 400 Bad Request: Invalid task data.

#### PATCH /tasks/:id

- **Description**: Update an existing task by its ID.
- **Parameters**:
  - `id` (string, required): Task ID.
- **Request Body**:
  - `title` (string, optional): Task title.
  - `description` (string, optional): Task description.
  - `priority` (string, optional): Task priority.
  - `state` (enum, optional): Task state (TODO, IN_PROGRESS, DONE).
- **Response**:
  - 200 OK: Task successfully updated. Returns the updated task.
  - 404 Not Found: Task not found.

#### DELETE /tasks/:id

- **Description**: Delete an existing task by its ID.
- **Parameters**:
  - `id` (string, required): Task ID.
- **Response**:
  - 204 No Content: Task successfully deleted.
  - 404 Not Found: Task not found.

---
## How to run the Project : 
### Requirement : 
 - node
 - Docker / Docker-Compose
### environment variable: 
example value for .env
```
JWT_SECRET = "5568939403705189298125114758439478033139439"
# POSTGRES
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=postgres
POSTGRES_PORT=5442

DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:5442/postgres?schema=public"
```
### Dependencies
``npm i``
``npx prisma generate``

### Database
Database is a Postgresql DB initialised with docker-compose: 
 - ``docker-compose up``
 - ``npx prisma migrate dev``
### run : 
Run the project: 
``npm run start``
Run with hot reload : 
``npm run dev``




