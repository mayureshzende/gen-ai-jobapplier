# Gen AI Job Applier

A Node.js/Express REST API backend for an AI-powered job application assistant. Provides user authentication as the foundation for personalized job application workflows.

## Tech Stack

- **Runtime**: Node.js (ESM)
- **Framework**: Express 5
- **Database**: MongoDB via Mongoose
- **Auth**: JWT + bcryptjs
- **Linting**: ESLint
- **Dev server**: Nodemon

## Project Structure

```
interview-gen-ai/
├── src/
│   ├── config/
│   │   └── database.js        # MongoDB connection
│   ├── controller/
│   │   └── user.controller.js # Auth controllers
│   ├── models/
│   │   └── user.model.js      # User schema
│   ├── routes/
│   │   └── users.routes.js    # Auth routes
│   └── app.js                 # Express app setup
├── server.js                  # Entry point
├── .env.example               # Environment variable template
└── package.json
```

## Getting Started

### Prerequisites

- Node.js >= 18
- MongoDB instance (local or Atlas)

### Installation

```bash
# Clone the repo
git clone https://github.com/mayureshzende/gen-ai-jobapplier.git
cd gen-ai-jobapplier

# Install dependencies
npm install

# Copy environment template and fill in values
cp .env.example .env
```

### Environment Variables

Create a `.env` file based on `.env.example`:

| Variable        | Description                     |
|-----------------|---------------------------------|
| `MONGO_URI`     | MongoDB connection string        |
| `MONGO_USER`    | MongoDB username                 |
| `MONGO_PASSWORD`| MongoDB password                 |
| `JWT_SECRET`    | Secret key for signing JWT tokens|
| `PORT`          | Server port (default: 3000)      |

### Running the Server

```bash
# Development (with hot reload)
npm run dev

# Lint
npm run lint

# Lint and auto-fix
npm run lint:fix
```

The server starts on `http://localhost:3000` by default.

## API Endpoints

### Auth

| Method | Endpoint             | Description       | Access |
|--------|----------------------|-------------------|--------|
| POST   | `/api/auth/register` | Register new user | Public |

#### POST `/api/auth/register`

**Request body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "yourpassword"
}
```

**Success response (201):**
```json
{
  "message": "User create successFully",
  "success": true
}
```

## License

ISC
