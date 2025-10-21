# WAPIx - WhatsApp API eXpress

A custom **WhatsApp API server** built on Node.js, Express, and `whatsapp-web.js`. It provides a RESTful API to manage **multiple, persistent WhatsApp sessions** for messaging automation and system integration.

![WhatsApp API](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)

---

## ✨ Features

* **Multi-Session Management**: Run and manage several independent WhatsApp accounts simultaneously.
* **Persistent Sessions**: Sessions, connection status, and QR codes are persisted in a **PostgreSQL database** using TypeORM.
* **RESTful API**: Stateless endpoints for session lifecycle management and retrieving chats.
* **QR Code Authentication**: Dedicated endpoint to retrieve the QR code for authentication as JSON or an HTML image.
* **Chat Retrieval**: Get the list of all current chats for an active session.
* **API Documentation**: Fully documented REST API with **Swagger UI** available at `/docs`.
* **TypeScript**: Built with TypeScript and `tsyringe` (DI container) for robust, type-safe code.
* **Structured Logging**: Uses **Pino** for efficient and structured logging.

---

## 🚀 Getting Started

### Prerequisites

* **Docker** and **Docker Compose** (for easy database setup)
* **Node.js** (for running the server directly)

### Quick Start with Docker Compose

This setup runs the WAPIx server and the required PostgreSQL database.

1.  **Clone the repository:**
    ```bash
    git clone [your-repo-link]
    cd wapix
    ```

2.  **Start the database and build the server (PostgreSQL is required):**
    ```bash
    # This uses the docker-compose.yml file to start the PostgreSQL DB
    docker compose up -d db
    ```

3.  **Install dependencies and build the TypeScript code:**
    ```bash
    npm install
    npm run build
    ```

4.  **Start the server:**
    ```bash
    npm start
    ```
    The server will be running on **port 3000**.

### Access the API documentation

Open your browser and navigate to `http://localhost:3000/docs` to explore the API.

---

## 📚 Documentation

### API Reference

Detailed API documentation is available via **Swagger UI** at `/docs` when the server is running. The documentation includes:

* Available endpoints
* Required parameters and data structures
* Status codes and descriptions

### Key Endpoints

| Feature | Method | Path | Description |
| :--- | :--- | :--- | :--- |
| **Create Session** | `POST` | `/api/sessions` | Creates and starts a new WhatsApp session. |
| **Get Session Details**| `GET` | `/api/sessions/{name}` | Retrieves details for a specific session. |
| **Get QR Code** | `GET` | `/api/sessions/{name}/qr` | Returns the QR code for a new session (JSON or HTML). |
| **Get Session Chats** | `GET` | `/api/{name}/chats` | Retrieves the list of chats for a connected session. |

### Configuration

The application uses environment variables for configuration.

| Variable | Default Value | Description | Source |
| :--- | :--- | :--- | :--- |
| `PORT` | `3000` | The port the Express server listens on. | `src/config/config.ts` |
| `LOG_LEVEL` | `debug` (non-prod), `info` (prod) | The minimum logging level for pino. | `src/logger.ts` |
| **Database** | *See `docker-compose.yml`* | The PostgreSQL connection details (host: `localhost`, user/pass/db: `test`). | `src/data-source.ts`, `docker-compose.yml` |

---

## 🔧 Development

### Setup

1.  Clone the repository and install dependencies:
    ```bash
    git clone [your-repo-link]
    cd wapix
    npm install
    ```

2.  **Ensure PostgreSQL is running** (e.g., via `docker compose up -d db`).

3.  Start the development server with file watching:
    ```bash
    npm run start
    ```
    *(Note: Your project uses `npm run start` for build + run, and relies on `tsc` and `tsc-alias` for the build process).*

### Code Quality

This project uses **Prettier** for code formatting and **Husky** to enforce formatting on commit.

```bash
npm run format
```