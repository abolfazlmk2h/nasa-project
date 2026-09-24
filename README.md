# NASA Mission Control System

A full-stack space mission control dashboard and exoplanet research platform built with React, Node.js, Express, MongoDB, and NASA/SpaceX data feeds.

---

## Architecture Overview

```
nasa-project/
├── client/          # React frontend (Arwes Sci-Fi UI library, audio cues, mission views)
├── server/          # Node.js & Express REST API, Kepler CSV ingestion, MongoDB storage
└── package.json     # Monorepo management scripts
```

### Key Components
- **Client**: Built with React and the Arwes futuristic UI framework. Provides visual interfaces for scheduling launches, monitoring past missions, and querying confirmed habitable planets.
- **Server**: Express backend exposing a versioned REST API (`/v1`). Ingests Kepler Space Telescope CSV data on startup via Node streams (`csv-parse`), filtering for confirmed habitable exoplanets based on planetary radius, stellar flux, and disposition.
- **Database**: MongoDB integration via Mongoose with automated pagination support and launch tracking.
- **External Integration**: Synchronizes historic and scheduled flight manifests with SpaceX API v4.

---

## REST API Reference

Base Path: `/v1`

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/v1/planets` | List all confirmed habitable Kepler exoplanets |
| `GET` | `/v1/launches` | Retrieve paginated launch history (`?page=1&limit=50`) |
| `POST` | `/v1/launches` | Schedule a new mission launch |
| `DELETE` | `/v1/launches/:id` | Abort a scheduled mission |

### Example Payload: Schedule Launch (`POST /v1/launches`)
```json
{
  "mission": "Kepler Exploration X",
  "rocket": "Explorer IS1",
  "target": "Kepler-442 b",
  "launchDate": "December 27, 2030"
}
```

---

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB connection URI (local instance or MongoDB Atlas)

### Installation
Install dependencies across both client and server:
```bash
npm run install
```

### Environment Configuration
Create a `.env` file inside the `server/` directory:
```env
PORT=8000
MONGO_URL=mongodb://localhost:27017/nasa
```

### Development
Start backend and frontend development servers concurrently:
```bash
npm run watch
```
- Client runs on `http://localhost:3000`
- API Server runs on `http://localhost:8000`

### Production & Clustering
Build the React production bundle and serve it via PM2 cluster:
```bash
npm run deploy-cluster
```

### Testing
Run Jest test suites for both client and server:
```bash
npm test
```
