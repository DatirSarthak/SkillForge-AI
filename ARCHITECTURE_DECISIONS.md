# ARCHITECTURE_DECISIONS

> Architecture Decision Record (ADR) for SkillForge AI.
> Approved decisions are preserved. New architectural changes must be added as new ADRs.

---

# Project

**Project:** SkillForge AI
**Version:** v1.5.0
**Status:** Production Deployment
**Current Module:** Module 21 — Deployment
**Last Completed:** Module 20 — Production Hardening

---

# ADR-001 — Backend Architecture

**Status:** Approved

## Decision

Use **Layered Architecture** for the Spring Boot backend.

### Layers

* Controller
* Service
* Repository
* Entity
* DTO
* Mapper
* Security
* Validation
* Exception
* Config
* Util
* Constants
* Logging

### Rules

* Controllers remain thin.
* Business logic belongs in services.
* Repositories handle persistence only.
* DTOs are used for API communication.
* MapStruct is used for entity/DTO mapping where applicable.
* Cross-cutting concerns are handled separately.

### Reason

* Clear separation of concerns
* Maintainability
* Scalability
* Testability
* Easier onboarding and debugging

---

# ADR-002 — Frontend Architecture

**Status:** Approved

## Decision

Use a **feature-oriented React architecture** with reusable shared components.

```text
src/
├── assets/
├── components/
├── pages/
├── layouts/
├── hooks/
├── services/
├── contexts/
├── routes/
├── utils/
├── constants/
└── types/
```

### Rules

* Pages coordinate UI and feature-level behaviour.
* Reusable UI belongs in `components/`.
* API communication belongs in `services/`.
* Server-state management uses TanStack Query.
* Form state and validation use React Hook Form + Zod.
* Routing remains centralized.
* Duplicate components should not be created.

### Reason

* Reusability
* Consistent UI
* Easier maintenance
* Feature scalability
* Clear separation of concerns

---

# ADR-003 — Authentication and Authorization

**Status:** Approved

## Decision

Use **JWT-based authentication** with Spring Security and role-based authorization.

### Security Components

* Spring Security
* JWT access token
* BCrypt password hashing
* Protected API endpoints
* Protected frontend routes
* Current-user ownership checks
* Role-based authorization

### Rules

* Credentials and secrets must never be hardcoded.
* JWT validation is performed by the backend security layer.
* Protected resources must verify the authenticated user.
* Users may access only resources they own unless their role explicitly permits otherwise.

### Reason

* Stateless API authentication
* Secure resource ownership
* Scalable deployment
* Clear authorization boundaries

---

# ADR-004 — Database Architecture

**Status:** Approved

## Decision

Use **PostgreSQL hosted on Neon** with JPA/Hibernate.

### Rules

* Relational data is normalized.
* Foreign keys enforce relationships.
* Unique constraints protect business invariants.
* Indexes are added for frequently queried fields.
* User-owned data must have an explicit ownership relationship.
* Database schema changes must preserve existing production data.

### Current Domain Areas

* Users
* User profiles
* User settings
* AI chats
* Notes
* Quizzes
* Quiz attempts
* Resume reviews
* Roadmaps
* Progress
* Notifications
* Search-related data/indexing
* File metadata where persistence is required

### Reason

* Strong relational integrity
* Mature SQL ecosystem
* Reliable JPA integration
* Scalable managed PostgreSQL infrastructure

---

# ADR-005 — DTO and Mapping Strategy

**Status:** Approved

## Decision

Use **DTOs for API boundaries** and **MapStruct for object mapping**.

### Rules

* Entities must not be exposed directly from controllers.
* Request DTOs represent client input.
* Response DTOs represent API output.
* MapStruct is preferred for repetitive entity/DTO mapping.
* Business logic must remain outside mapper classes.
* Mapper package naming and conventions must remain consistent with the existing backend.

### Reason

* API contract stability
* Reduced coupling
* Safer entity exposure
* Cleaner service layer
* Less repetitive mapping code

---

# ADR-006 — AI Provider Architecture

**Status:** Approved

## Decision

AI functionality must be isolated behind a provider abstraction.

```text
Business Service
       │
       ▼
   AiProvider
       │
       ▼
GeminiProviderImpl
       │
       ▼
Google Gemini API
```

### Rules

* Controllers never call Gemini directly.
* Business services depend on the provider abstraction.
* Gemini-specific request/response handling stays inside the Gemini implementation.
* Future providers can be added without rewriting business services.

### Current AI Features

* AI Chat
* AI Notes Generator
* AI Quiz Generator
* AI Resume Review
* AI Roadmap Generator

### Reason

* Provider independence
* Easier testing
* Future AI-provider migration
* Separation of AI infrastructure from business logic

---

# ADR-007 — File Storage Architecture

**Status:** Approved

## Decision

Use an abstraction-based file storage architecture with **Cloudinary** as the current storage provider.

```text
Application Service
       │
       ▼
FileStorageService
       │
       ▼
Cloudinary
```

### Rules

* Controllers must not communicate directly with Cloudinary.
* File validation occurs before storage.
* File type and file size must be validated.
* Secrets remain in environment variables.
* Storage implementation must remain replaceable.

### Current File-Related Features

* Resume upload
* Resume validation
* Resume text extraction
* Cloudinary storage
* File upload infrastructure

### Reason

* Provider independence
* Centralized validation
* Better security
* Easier future migration

---

# ADR-008 — API Design and Error Handling

**Status:** Approved

## Decision

Use REST-style APIs with a consistent response and error-handling strategy.

### Rules

* Controllers define HTTP contracts.
* Authentication requirements are explicit.
* Request validation is mandatory.
* Global exception handling is used.
* Validation failures return structured errors.
* Resources use appropriate HTTP status codes.
* Existing API contracts must not be changed without an approved architectural decision.

### Error Structure

The existing project response format is preserved and should be reused for new APIs.

### Reason

* Predictable frontend integration
* Easier API testing
* Consistent client-side error handling
* Better debugging

---

# ADR-009 — Frontend State Management

**Status:** Approved

## Decision

Separate **server state**, **application state**, and **form state**.

### Strategy

* **TanStack Query** → API/server state
* **React Context** → shared application state such as authentication/theme where appropriate
* **React Hook Form** → form state
* **Zod** → client-side schema validation

### Rules

* Do not duplicate server data unnecessarily in global context.
* Query caching should be used where appropriate.
* Mutations must invalidate or update related queries.
* Loading, empty, and error states are required for user-facing asynchronous features.

### Reason

* Predictable state flow
* Better caching
* Reduced unnecessary requests
* Cleaner component responsibilities

---

# ADR-010 — UI/UX and Design System

**Status:** Approved

## Decision

SkillForge AI uses a consistent responsive UI system based on **React + Tailwind CSS**.

### Design Principles

* Clean SaaS-style interface
* Consistent spacing and typography
* Reusable cards, buttons, inputs, dialogs, dropdowns and states
* Responsive desktop/tablet/mobile layouts
* Light and dark theme support
* Accessible interactive elements
* Clear loading, empty and error states
* Consistent visual hierarchy

### Current UX Direction

The dashboard account menu provides access to:

* Profile
* Settings
* Dark Mode
* Logout

Profile and Settings are separate pages rather than expanding the main dashboard content.

### Reason

* Consistent product experience
* Mobile compatibility
* Easier UI maintenance
* Better accessibility
* Professional SaaS presentation

---

# ADR-011 — Search Architecture

**Status:** Approved

## Decision

Search functionality is implemented as a dedicated application feature and must integrate with existing domain services rather than duplicating domain data.

### Rules

* Search endpoints are protected where user-owned data is involved.
* Search results respect current-user ownership.
* Search UI uses the existing shared search components and API service conventions.
* Search must remain extensible for additional searchable resources.

### Reason

* Centralized search behaviour
* Data ownership protection
* Easier future expansion
* Consistent user experience

---

# ADR-012 — Notifications Architecture

**Status:** Approved

## Decision

Notifications are persisted per user and exposed through protected APIs.

### Rules

* Notifications belong to a specific user.
* Unread state is persisted.
* Read/unread operations are user-scoped.
* Notification generation is triggered by relevant application events.
* Notification UI is reusable across dashboard and notification pages.

### Current Notification Events

* Learning progress updates
* Roadmap completion
* System/application notifications

### Reason

* Persistent notification history
* User-specific delivery
* Future extensibility for email/push notifications

---

# ADR-013 — User Settings Architecture

**Status:** Approved

## Decision

User settings are implemented as a dedicated domain module using:

```text
Controller
    ↓
UserSettingsService
    ↓
UserSettingsRepository
    ↓
UserSettings
```

with DTO and MapStruct mapping:

```text
UpdateUserSettingsRequestDto
        ↕
   SettingsMapper
        ↕
UserSettingsResponseDto
```

### Rules

* Settings are owned by the authenticated user.
* Settings APIs are JWT protected.
* Settings business logic remains inside `UserSettingsService`.
* `SettingsMapper` is responsible only for mapping.
* Settings must not duplicate profile data.
* UI preferences and notification preferences belong in settings where applicable.
* Password changes remain part of the security/account workflow and must not be treated as plain preference data.

### Current Settings Scope

* Appearance preferences
* Notification preferences
* User preference management
* Account-related settings UI

### Reason

* Separation between profile information and preferences
* Cleaner domain boundaries
* Easier future settings expansion
* Secure user-scoped configuration

---

# ADR-014 — UI/UX Polish

**Status:** Approved

## Decision

Module 15 focused on improving the existing product experience without rewriting completed modules.

### Scope

* Dashboard visual consistency
* Profile/account menu polish
* Settings page polish
* Responsive behaviour
* Mobile layout improvements
* Dark mode consistency
* Loading states
* Empty states
* Error states
* Accessibility improvements
* Shared component consistency
* Navigation and interaction polish

### Rules

* Existing backend architecture must not be changed for visual improvements.
* Existing APIs must remain compatible.
* Existing functionality must continue to work.
* UI improvements should use reusable components.
* No duplicate components should be introduced.
* Responsive behaviour must be verified at desktop, tablet and mobile widths.

### Reason

* Improve product quality without architectural regression
* Create a professional SaaS experience
* Prepare the application for Analytics, Admin, QA and production-hardening modules

---

# ADR-015 — Production and Deployment Architecture

**Status:** Approved

## Decision

Use the following deployment architecture:

```text
React + Vite
     │
     ▼
  Vercel
     │
     │ HTTPS / REST API
     ▼
Spring Boot
     │
     ▼
  Render
     │
     ▼
PostgreSQL
     │
     ▼
   Neon
```

Cloudinary is used for managed file storage and Google Gemini is used through the AI provider layer.

### Rules

* Production secrets use environment variables.
* Frontend must not contain backend or AI secrets.
* Backend CORS must allow only approved frontend origins.
* HTTPS is required in production.
* Production configuration must be separated from local development configuration.

### Reason

* Low-cost deployment
* Independent frontend/backend scaling
* Managed database
* Managed file storage
* Suitable foundation for future SaaS growth

---

# ADR-016 — Testing and Quality Strategy

**Status:** Approved

## Decision

Testing is treated as a separate production phase and covers backend, frontend and API integration.

### Backend

* Unit tests
* Service-layer tests
* Repository/integration tests where required
* Controller/API tests
* Security tests

### Frontend

* Component tests where valuable
* Hook/service tests
* Form validation tests
* Route/protected-route verification
* User-flow testing

### Integration

```text
Frontend
   ↓
API
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
PostgreSQL
```

### Manual Verification

Every module must also undergo manual verification for:

* Happy path
* Validation errors
* Unauthorized access
* Empty states
* Loading states
* Failure states
* Responsive behaviour

### Reason

* Prevent regressions
* Increase release confidence
* Validate security boundaries
* Support production deployment

---

# ADR-017 — Architectural Change Policy

**Status:** Approved

## Decision

Existing approved architecture must be preserved unless a new ADR is added and the change is explicitly approved.

### Rules

* Do not restart completed modules.
* Do not duplicate existing functionality.
* Do not silently change package names.
* Do not silently change API response formats.
* Do not replace the JWT architecture.
* Do not bypass the AI provider abstraction.
* Do not bypass service layers.
* Do not expose entities directly through APIs.
* New architectural decisions must be documented here.

### Reason

* Preserve project consistency
* Avoid technical debt
* Maintain a reliable single source of architectural truth
* Make future development decisions traceable

---

# ADR-018 — Analytics Architecture

**Status:** Approved

## Decision

Implement Analytics as a dedicated read-only application feature that aggregates existing user-owned domain data without introducing a separate Analytics table.

The Analytics module uses dedicated DTOs, a service layer, and a dedicated repository for multi-table activity aggregation.

### Architecture

```text
Frontend
   │
   ▼
useAnalytics()
   │
   ▼
analyticsService
   │
   ▼
GET /api/analytics
   │
   ▼
AnalyticsController
   │
   ▼
AnalyticsService
   │
   ├── Existing domain repositories
   │
   └── AnalyticsRepository
           │
           ▼
      PostgreSQL
```

### Analytics Domains

* AI Chat
* Notes
* Quiz
* Resume Review
* Roadmap / Progress
* 30-day Activity Trend

### Rules

* Analytics APIs are authenticated.
* Analytics data is scoped to the current authenticated user.
* Analytics must reuse existing domain data.
* No duplicate Analytics persistence table is required.
* Controllers remain thin.
* Business aggregation logic belongs in the service/repository layers.
* Multi-table trend aggregation may use native PostgreSQL queries where appropriate.
* Response data is exposed through dedicated Analytics DTOs.
* Dashboard should use a lightweight Analytics Preview and link to the full Analytics page.
* Existing domain APIs and entities must remain unchanged unless explicitly approved.

### Current DTO Structure

```text
AnalyticsResponseDto
├── ChatAnalyticsDto
├── NotesAnalyticsDto
├── QuizAnalyticsDto
├── ResumeAnalyticsDto
├── RoadmapAnalyticsDto
└── ActivityTrendDto
```

### API

```text
GET /api/analytics
```

### Frontend

* Analytics page
* Analytics overview
* Activity trend
* Chat analytics
* Notes analytics
* Quiz analytics
* Resume analytics
* Roadmap analytics
* Dashboard Analytics Preview

### Verification

* Backend build/test passed.
* Analytics API returned successful response.
* Frontend production build passed.
* Dashboard Analytics Preview verified.
* Responsive and dark-mode UI verified.
* Git commit created.

### Reason

* Avoid unnecessary analytics data duplication
* Reuse existing normalized domain data
* Keep analytics read-only and maintainable
* Support future expansion of analytics without changing existing domain architecture

---

# ADR-019 — Production Hardening

**Status:** Approved

## Decision

SkillForge AI uses a dedicated production configuration and security hardening strategy before deployment.

### Production Configuration

The backend supports a dedicated Spring profile:

```text
SPRING_PROFILES_ACTIVE=prod
```

Production hardening includes:

* Production Spring configuration
* Production database validation
* Production error handling
* Production logging configuration
* Environment-based frontend URL
* Production CORS configuration
* Security headers
* HSTS
* Clickjacking protection
* MIME sniffing protection
* Referrer Policy
* Environment-based secrets
* Production `ddl-auto=validate`
* Production SQL logging disabled
* Production stack traces disabled
* Production binding errors disabled

---

# ADR-020 — Deployment Execution Strategy

**Status:** Approved

## Decision

Production deployment follows the approved Vercel + Render + Neon architecture.

```text
React + Vite
      ↓
   Vercel
      ↓
 HTTPS REST API
      ↓
 Spring Boot
      ↓
   Render
      ↓
 Neon PostgreSQL
```

Supporting infrastructure:

```text
Cloudinary → File Storage
Gemini     → AI Services
GitHub     → Source Control
```

Deployment changes must preserve the existing application architecture and security boundaries.

---

# ADR Status Summary

| ADR     | Decision                           | Status   |
| ------- | ---------------------------------- | -------- |
| ADR-001 | Backend Layered Architecture       | Approved |
| ADR-002 | Frontend Feature Architecture      | Approved |
| ADR-003 | JWT Authentication & Authorization | Approved |
| ADR-004 | PostgreSQL Database Architecture   | Approved |
| ADR-005 | DTO + MapStruct Strategy           | Approved |
| ADR-006 | AI Provider Architecture           | Approved |
| ADR-007 | File Storage Architecture          | Approved |
| ADR-008 | API & Error Handling               | Approved |
| ADR-009 | Frontend State Management          | Approved |
| ADR-010 | UI/UX & Design System              | Approved |
| ADR-011 | Search Architecture                | Approved |
| ADR-012 | Notifications Architecture         | Approved |
| ADR-013 | User Settings Architecture         | Approved |
| ADR-014 | UI/UX Polish Direction             | Approved |
| ADR-015 | Production Deployment Architecture | Approved |
| ADR-016 | Testing & Quality Strategy         | Approved |
| ADR-017 | Architectural Change Policy        | Approved |
| ADR-018 | Analytics Architecture             | Approved |
| ADR-019 | Production Hardening               | Approved |
| ADR-020 | Deployment Execution Strategy      | Approved |

---

# Final Architecture Principle

SkillForge AI follows this principle:

> **Extend the existing architecture; do not rebuild it.**

Every new feature must integrate with the existing Controller → Service → Repository flow, DTO/Mapper boundaries, JWT security, React feature architecture, shared UI system, and provider abstractions.

New architectural changes require a documented ADR and explicit approval before implementation.
