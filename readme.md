## WAPIx - WhatsApp API eXpress

WAPIx is a custom **WhatsApp API server** built on **Node.js, Express, and `whatsapp-web.js`**. It provides a set of **RESTful endpoints** to manage multiple WhatsApp sessions, send messages, and retrieve chats, abstracting the complexity of the underlying library.

### Why is WAPIx Useful?

The project's utility lies in its ability to **manage multiple, persistent WhatsApp sessions** through a robust and easy-to-use API.

- **Multi-Session Management**: It allows you to run and manage several independent WhatsApp accounts (sessions) simultaneously, each associated with a unique name. Sessions are stored in a **PostgreSQL database** using TypeORM.
- **Stateless API Interaction**: By exposing a REST API, WAPIx allows any external application to interact with WhatsApp without needing to directly manage the complexities of the `whatsapp-web.js` library, web sockets, or session files.
- **Authentication Flow**: It provides endpoints to initiate a new session and retrieve the required **QR code** for authentication, available as JSON or an HTML image.
- **Chat Retrieval**: It includes a dedicated endpoint to retrieve the list of chats for an active, connected session.
- **Robustness and Reliability**: It handles client connection lifecycle events (`qr`, `ready`, `disconnect`) and persists the connection state and QR code in the database, ensuring that sessions can be initialized and reconnected even after a server restart.
- **Developer-Friendly Setup**: The project uses **TypeScript** and **`tsconfig-paths`** for better code organization, **Pino** for structured logging, and includes a **`docker-compose.yml`** file for easy setup of the required PostgreSQL database. It also features **Swagger documentation** automatically generated from JSDoc comments on the routes.

---

## Getting Started

Refer to the **API Documentation** available at `/docs` once the server is running to see all available endpoints and how to use them.

### Prerequisites

- Node.js
- Docker (for easy database setup)

### Installation

1.  **Clone the repository.**
2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running the Project

You can use the provided `docker-compose.yml` to start the PostgreSQL database.

1.  **Start the database:**
    ```bash
    docker compose up -d db
    ```
2.  **Start the WAPIx server:**
    ```bash
    npm start
    ```
    The server will run on the port specified in `src/config/config.ts` (default is **3000**).

---

## Endpoints

For full details on request/response bodies and parameters, please consult the **Swagger documentation** at the `/docs` route.

| Feature                | Routes                                      |
| :--------------------- | :------------------------------------------ |
| **Session Management** | `POST /api/sessions` (Create)               |
|                        | `GET /api/sessions/{name}` (Get Details)    |
|                        | `GET /api/sessions/{name}/qr` (Get QR Code) |
| **Chat Retrieval**     | `GET /api/{name}/chats` (Get All Chats)     |

---

## Configuration

The application is configured via environment variables, loaded using `dotenv`.

| Variable     | Default Value                     | Description                                                              |
| :----------- | :-------------------------------- | :----------------------------------------------------------------------- |
| `PORT`       | `3000`                            | The port the Express server listens on.                                  |
| `LOG_LEVEL`  | `debug` (non-prod), `info` (prod) | The minimum logging level for pino.                                      |
| **Database** | (See `docker-compose.yml`)        | Uses PostgreSQL on `localhost:5432` with user/pass/db `test` by default. |
