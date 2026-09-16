# SkillForge AI — Project State

## 1. Project Information

| Item                | Status                                    |
| ------------------- | ----------------------------------------- |
| Project Name        | SkillForge AI                             |
| Project Type        | AI-powered Learning & Career Platform     |
| Current Version     | v1.5.0                                    |
| Development Status  | Production Deployed                       |
| Current Phase       | Module 22 — Documentation & Final Release |
| Completed Modules   | 1–21                                      |
| Frontend            | React + Vite                              |
| Backend             | Java 21 + Spring Boot 3                   |
| Database            | PostgreSQL / Neon                         |
| AI Provider         | Google Gemini                             |
| File Storage        | Cloudinary                                |
| Frontend Deployment | Vercel                                    |
| Backend Deployment  | Render                                    |

---

## 2. Project Purpose

SkillForge AI is an AI-powered Learning & Career Platform designed for students, developers, and job seekers.

The platform provides AI-assisted learning, career planning, resume analysis, progress tracking, and other productivity features through a full-stack web application.

---

## 3. Technology Stack

### Frontend

* React 19
* Vite
* Tailwind CSS v4
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
* JWT Authentication
* Hibernate
* JPA
* Lombok
* MapStruct
* Maven

### Infrastructure

* PostgreSQL
* Neon PostgreSQL
* Cloudinary
* Google Gemini API
* Vercel
* Render
* Docker
* GitHub

---

## 4. Architecture

### Backend Architecture

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
Database
```

Supporting layers:

```text
Entity
DTO
Mapper
Security
Validation
Exception
Config
Util
Constants
Logging
```

Business logic is implemented in service layers rather than controllers.

### Frontend Architecture

```text
Pages
 ↓
Components
 ↓
Hooks
 ↓
Services
 ↓
Axios
 ↓
Backend REST API
```

The frontend uses feature-oriented organization with reusable shared components.

---

## 5. Authentication Architecture

SkillForge AI uses JWT-based authentication.

```text
User
 ↓
Login
 ↓
Authentication API
 ↓
Spring Security
 ↓
JWT Token
 ↓
Protected API Requests
```

Security features include:

* JWT authentication
* BCrypt password hashing
* Role-based authorization
* Protected endpoints
* Refresh-token-ready design
* Environment-based secrets
* CORS protection

---

## 6. AI Architecture

AI functionality is isolated from the core business logic.

```text
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

Current AI features:

* AI Chat
* AI Notes Generator
* AI Quiz Generator
* AI Resume Review
* AI Roadmap Generator

The provider abstraction allows additional AI providers to be introduced later.

---

## 7. File Storage Architecture

Resume and other supported files are handled through the application's file-storage layer.

```text
Frontend
   ↓
Backend
   ↓
File Storage Service
   ↓
Cloudinary
```

File validation and size restrictions are applied before storage and processing.

---

## 8. Completed Modules

### Module 1 — Authentication

Completed.

Includes:

* Registration
* Login
* JWT authentication
* Protected routes
* Logout
* Password security

### Module 2 — User APIs

Completed.

### Module 3 — User Profile

Completed.

### Module 4 — Dashboard

Completed.

Includes dashboard data and learning progress information.

### Module 5 — AI Chat

Completed.

Includes:

* Conversations
* Chat messages
* New conversation
* Conversation history
* Rename conversation
* Delete conversation
* AI responses
* Streaming architecture

### Module 6 — AI Notes Generator

Completed.

### Module 7 — AI Quiz Generator

Completed.

### Module 8 — AI Resume Review

Completed.

Includes:

* Resume upload
* PDF/DOCX/TXT validation
* Cloudinary storage
* Gemini-powered resume analysis
* ATS-oriented review
* Resume history
* Ownership protection
* Resume deletion

### Module 9 — AI Roadmap Generator

Completed.

Includes:

* Roadmap generation
* Roadmap details
* Roadmap history
* Roadmap deletion
* Roadmap steps

### Module 10 — Progress Tracking

Completed.

### Module 11 — Notifications

Completed.

Includes:

* Notification bell
* Notification dropdown
* Unread notifications
* Mark as read
* View all notifications

### Module 12 — Search

Completed.

Includes global application search and search navigation.

### Module 13 — File Upload

Completed.

### Module 14 — Settings

Completed.

Includes user settings APIs and frontend integration.

### Module 15 — UI/UX Polish

Completed.

### Module 16 — Responsive & UI Refinements

Completed.

### Module 17 — Admin Panel

Completed.

Includes administrative user-management functionality and responsive admin UI.

### Module 18 — Testing & Quality

Completed.

Includes backend testing and application validation.

### Module 19 — Production Configuration

Completed.

### Module 20 — Production Hardening

Completed.

Implemented:

* Production Spring configuration
* Production database validation
* Secure error responses
* Production logging configuration
* CORS configuration
* Security headers
* HSTS
* Clickjacking protection
* MIME sniffing protection
* Referrer policy
* Environment-based frontend URL
* Environment-based secrets
* Disabled SQL logging in production
* Disabled stack traces in production
* `ddl-auto=validate`

### Module 21 — Production Deployment

Completed.

Deployment architecture:

```text
React + Vite
     ↓
Vercel
     ↓ HTTPS
Spring Boot
     ↓
Render
     ↓
Neon PostgreSQL
```

Supporting services:

```text
Cloudinary → File Storage
Gemini     → AI Services
GitHub     → Source Control
```

Production functionality was verified after deployment.

---

## 9. Production URLs

### Frontend

```text
https://skill-forge-ai-rho.vercel.app/login
```

### Backend

```text
https://skillforge-ai-backend-xhem.onrender.com
```

---

## 10. Production Verification

The following production functionality has been tested:

* Login
* Authentication
* Dashboard
* Dashboard data loading
* AI functionality
* Frontend → Backend communication
* Backend deployment
* Production configuration
* CORS configuration

Production testing was completed successfully.

---

## 11. Environment Configuration

### Frontend

```env
VITE_API_BASE_URL=
VITE_APP_NAME=SkillForge AI
```

### Backend

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

Real credentials must never be committed to Git.

---

## 12. Docker

The backend includes a multi-stage Docker build.

```text
Maven Build Image
       ↓
Spring Boot JAR
       ↓
Java 21 Runtime Image
       ↓
Render
```

The Docker image was successfully built and tested before deployment.

---

## 13. Security State

Production security hardening has been completed.

Current principles:

* Secrets are environment-based.
* JWT secrets are not hardcoded.
* AI API keys are not exposed to the frontend.
* Cloudinary credentials are backend-only.
* Production error responses do not expose stack traces.
* CORS is restricted to approved frontend origins.
* Security headers are configured.
* Production database schema validation is enabled.
* SQL logging is disabled in production.

---

## 14. Git State

The project is maintained using Git and GitHub.

The main branch is:

```text
main
```

The repository is kept synchronized with the remote GitHub repository.

---

## 15. Current Development Phase

### Module 22 — Documentation & Final Release

Current focus:

* Final README
* Project state documentation
* Architecture documentation
* Changelog maintenance
* Final project review
* GitHub presentation
* Final release preparation

---

## 16. Next Planned Work

After documentation is completed:

1. Review repository structure
2. Verify documentation
3. Verify production configuration
4. Verify Git status
5. Run final frontend build
6. Run final backend tests/build
7. Review deployment URLs
8. Final Git commit
9. Push final release
10. Prepare final project summary

---

## 17. Project Principles

SkillForge AI follows these development principles:

* Production-first development
* Clean architecture
* SOLID principles
* DRY
* KISS
* Separation of concerns
* Reusable components
* Secure coding
* Centralized exception handling
* DTO-based API contracts
* Environment-based configuration
* Maintainable code
* Scalable architecture

---

## 18. Important Development Rule

SkillForge AI is an existing project.

Future development must:

* Continue the existing project.
* Preserve completed modules.
* Preserve existing architecture.
* Preserve API contracts unless explicitly approved.
* Preserve JWT implementation.
* Preserve AI provider architecture.
* Preserve existing UI/UX unless explicitly approved.
* Avoid unnecessary rewrites.
* Avoid duplicate components.
* Avoid temporary or demo implementations.

Architectural changes must be discussed before implementation.

---

## 19. Final Project Goal

The final goal is a production-ready AI SaaS platform that:

* Works on desktop and mobile.
* Uses secure authentication.
* Provides AI-powered learning features.
* Uses scalable backend architecture.
* Uses PostgreSQL for persistent data.
* Uses Cloudinary for file storage.
* Uses provider-independent AI architecture.
* Can be deployed using free-tier infrastructure.
* Demonstrates professional full-stack engineering.
* Can be extended into a commercial SaaS product.
