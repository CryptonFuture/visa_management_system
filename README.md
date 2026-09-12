# Visa Management System

Complete **Visa Application Management** system.

## Tech Stack

| Layer              | Technology                          |
|--------------------|-------------------------------------|
| **Backend**        | Node.js + Express.js + MongoDB      |
| **Python Service** | FastAPI (Analytics & Reports)       |
| **Frontend**       | React 18 + Vite + Tailwind CSS      |

## Features

- Applicant management (CRUD)
- Visa Types (Tourist, Business, Student, Work)
- Visa Applications with status workflow
- Document tracking per application
- Appointment scheduling (Biometrics, Interview, etc.)
- Dashboard with live stats
- Python analytics (approval rate, processing time, revenue)
- Role-based access (Admin / Agent)

## Setup

### 1. Backend
```bash
cd backend
npm install
npm run seed
npm run dev          # http://localhost:5002
```

**Login:**
- Admin → `admin@visa.com` / `admin123`
- Agent → `agent@visa.com` / `agent123`

### 2. Python Service
```bash
cd python-service
pip install -r requirements.txt
uvicorn main:app --reload --port 8002
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev          # http://localhost:3002
```

Open → http://localhost:3002

## Ports

| Service  | Port |
|----------|------|
| Backend  | 5002 |
| Frontend | 3002 |
| Python   | 8002 |

---

Built with Node.js, Express, MongoDB, Python FastAPI & React Vite
# visa_management_system
