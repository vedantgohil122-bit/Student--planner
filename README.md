# Student Planner 📚

A secure full stack web application for students to manage assignments, deadlines and study tasks.

**Live Demo:** https://studpl.netlify.app

---

## Features

- User registration and login with secure authentication
- Create, read and delete study tasks
- Task fields — title, subject, status and notes
- Dashboard showing all your tasks
- Colour coded status badges — Pending, Completed, Urgent
- Protected routes — users only see their own tasks

---

## Technology Stack

**Frontend** — React, Vite, React Router, Tailwind CSS

**Backend** — Node.js, Express.js, MongoDB, Mongoose

**Auth** — JWT, bcryptjs

**Security** — Helmet, express-rate-limit, CORS, Input validation

**Deployment** — Netlify (frontend), Render (backend), MongoDB Atlas (database)

---

## Local Setup

### Backend

cd backend
npm install

Create a .env file in the backend folder with these values:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
FRONTEND_URL=http://localhost:5173

Start the backend:
node server.js

### Frontend

cd frontend
npm install
npm run dev

---

## API Endpoints

| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| POST | /api/auth/register | Register a new user | No |
| POST | /api/auth/login | Login and get JWT token | No |
| GET | /api/tasks | Get all tasks | Yes |
| POST | /api/tasks | Create a new task | Yes |
| DELETE | /api/tasks/:id | Delete a task | Yes |

---

## Security Controls

- Passwords hashed with bcrypt
- JWT tokens expire after 7 days
- Rate limiting on auth routes
- Helmet adds secure HTTP headers
- CORS restricted to frontend origin
- Users can only access their own tasks
- Environment variables for all secrets
- Input validation on all endpoints

---

## Architecture

React Frontend (Netlify)
        ↓
Express REST API (Render)
        ↓
MongoDB Atlas (Cloud Database)

---

## Known Limitations and Future Improvements

- Add task deadline and priority fields
- Add filtering and sorting on dashboard
- Add email verification on registration
- Add OAuth login with Google
- Add automated tests