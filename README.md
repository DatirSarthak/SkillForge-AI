# SkillForge AI 🚀

AI-powered Learning & Career Platform for students, developers, and job seekers.

SkillForge AI helps users learn skills, interact with AI, generate learning resources, review resumes, create career roadmaps, track progress, and manage their learning journey from one platform.

---

## 🌐 Live Application

**Live Demo:** https://skill-forge-ai-rho.vercel.app/login

---

## ✨ Features

* 🔐 JWT Authentication
* 👤 User Profile & Settings
* 📊 Personalized Dashboard
* 🤖 AI Chat
* 📝 AI Notes Generator
* 🧠 AI Quiz Generator
* 📄 AI Resume Review
* 🗺️ AI Roadmap Generator
* 📈 Progress Tracking
* 🔔 Notifications
* 🔎 Global Search
* 👨‍💼 Admin Panel
* 📁 Resume/File Upload
* 🌙 Dark Mode
* 📱 Responsive UI
* 🔒 Production Security & Error Handling

---

## 🏗️ Architecture

SkillForge AI follows a layered backend architecture and feature-based frontend architecture.

### Frontend

```text
React
   ↓
React Router
   ↓
Pages / Components
   ↓
Hooks
   ↓
Services
   ↓
Axios
   ↓
Spring Boot REST API
```

### Backend

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
PostgreSQL
```

Supporting layers include:

```text
Entity
DTO
Mapper
Security
Validation
Exception Handling
Configuration
Utilities
Logging
```

---

## 🤖 AI Architecture

AI functionality is isolated behind an AI provider abstraction.

```text
Frontend
   ↓
AI Controller
   ↓
AI Service
   ↓
AiProvider
   ↓
GeminiProviderImpl
   ↓
Google Gemini API
```

This architecture allows future AI providers to be integrated without changing the core business logic.

---

## 🛠️ Technology Stack

### Frontend

* React 19
* Vite
* Tailwind CSS
* React Router
* Axios
* React Hook Form
* Zod
* TanStack Query
* Framer Motion
* React Hot Toast
* Lucide React

### Backend

* Java 21
* Spring Boot 3
* Spring Security
* JWT
* Hibernate / JPA
* Lombok
* MapStruct
* Maven

### Database & Storage

* PostgreSQL
* Neon PostgreSQL
* Cloudinary

### AI

* Google Gemini API

### Deployment

* Vercel — Frontend
* Render — Backend
* Neon — Database
* Cloudinary — File Storage

---

## 🔐 Security

SkillForge AI implements production-oriented security practices including:

* JWT-based authentication
* BCrypt password hashing
* Role-based authorization
* Protected API endpoints
* Input validation
* CORS configuration
* Security headers
* HTTPS in production
* Environment-based secrets
* No hardcoded API credentials
* Production error-response protection
* Database schema validation
* SQL logging disabled in production

Sensitive environment variables are never committed to the repository.

---

## 📁 Project Structure

```text
SkillForge-AI/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── contexts/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── constants/
│   │   └── types/
│   │
│   └── package.json
│
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       └── resources/
│   │
│   ├── Dockerfile
│   ├── .dockerignore
│   └── pom.xml
│
├── README.md
├── PROJECT_STATE.md
├── ARCHITECTURE_DECISIONS.md
└── CHANGELOG.md
```

---

## 🚀 Local Development

### Prerequisites

Make sure the following are installed:

* Node.js
* npm
* Java 21
* Maven
* PostgreSQL / Neon database
* Git

---

## ▶️ Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend will run using the Vite development server.

---

## ▶️ Run Backend

```bash
cd backend
mvn spring-boot:run
```

The backend runs on the configured Spring Boot port.

---

## ⚙️ Environment Variables

### Frontend

Create:

```text
frontend/.env
```

Example:

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_NAME=SkillForge AI
```

### Backend

Backend environment variables include:

```env
DB_URL=
DB_USERNAME=
DB_PASSWORD=

JWT_SECRET=

GEMINI_API_KEY=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

FRONTEND_URL=
```

Never commit real credentials or secrets.

Use the project's environment configuration and `.env.example` as the reference for required variables.

---

## 🧪 Testing

Backend tests can be executed with:

```bash
mvn test
```

Production build:

```bash
mvn clean package
```

Frontend production build:

```bash
npm run build
```

The project uses unit/integration testing for backend functionality and build validation for frontend production readiness.

---

## 🐳 Docker

The backend includes a production Docker configuration.

Build the backend image:

```bash
docker build -t skillforge-ai-backend .
```

Run the container:

```bash
docker run -p 10000:10000 skillforge-ai-backend
```

The production container uses Java 21 and runs the packaged Spring Boot application.

---

## ☁️ Deployment Architecture

```text
                    ┌──────────────────┐
                    │      Users       │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Vercel Frontend  │
                    │ React + Vite     │
                    └────────┬─────────┘
                             │ HTTPS
                             ▼
                    ┌──────────────────┐
                    │ Render Backend   │
                    │ Spring Boot      │
                    └──────┬─────┬─────┘
                           │     │
             ┌─────────────┘     └──────────────┐
             ▼                                  ▼
    ┌─────────────────┐                ┌─────────────────┐
    │ Neon PostgreSQL │                │ Google Gemini   │
    │ Database        │                │ AI API          │
    └─────────────────┘                └─────────────────┘
                           │
                           ▼
                    ┌─────────────────┐
                    │   Cloudinary    │
                    │ File Storage    │
                    └─────────────────┘
```

---

## 📚 Development Principles

The project follows:

* Clean Architecture principles
* SOLID principles
* DRY
* KISS
* Separation of Concerns
* Reusable Components
* Secure Coding Practices
* DTO-based API contracts
* Centralized Exception Handling
* Environment-based configuration

Business logic is kept outside controllers.

---

## 📌 Project Status

**Current Version:** `v1.5.0`

**Completed:** Modules 1–21

**Current Module:** Module 22 — Documentation & Final Release

The application has been deployed and production functionality has been verified, including authentication, dashboard functionality, and AI features.

---

## 🎯 Project Goals

SkillForge AI is designed to demonstrate production-oriented software engineering across:

* Full-stack development
* REST API development
* Authentication & authorization
* Database design
* AI integration
* File storage
* Security
* Testing
* Docker
* Cloud deployment
* Software architecture

---

## 👨‍💻 Development

Built as a production-oriented full-stack AI SaaS project using modern frontend, backend, database, AI, and cloud technologies.

---

## 📄 License

This project is intended for educational, portfolio, and software engineering demonstration purposes.
