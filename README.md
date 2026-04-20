# AI Meal Planner

A production-ready full-stack web application that uses AI (Groq + Llama 3) to generate custom meal plans and grocery lists based on your budget, calorie goals, and dietary preferences.

## Tech Stack
- **Frontend**: React (Vite) + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **AI**: Groq API (`llama-3.3-70b-versatile`)
- **Infrastructure**: Docker & Docker Compose

## Quick Setup

1. Rename `server/.env.example` to `server/.env` and add your Groq API Key:
   ```
   GROQ_API_KEY=gsk_your_api_key_here
   ```

2. Run with Docker Compose:
   ```bash
   docker-compose up --build
   ```

3. Open the app:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
