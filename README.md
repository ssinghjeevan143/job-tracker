# Job Application Tracker

A full-stack web app to track job applications through the pipeline:
**Applied → Interviewing → Offer / Rejected**, with live stats, filtering,
notes, and one-click status advancement.

## Tech Stack

| Layer    | Technology |
|----------|------------|
| Backend  | Java 17, Spring Boot 3 (Web, Data JPA, Validation), H2 (dev) |
| Frontend | React 18, Vite, plain CSS |
| Build    | Maven, npm |

## Project Structure

```
job-tracker/
├── backend/
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/jeevan/jobtracker/
│       │   ├── JobTrackerApplication.java      # entry point
│       │   ├── controller/                     # REST endpoints (API layer)
│       │   │   └── JobApplicationController.java
│       │   ├── service/                        # business logic
│       │   │   └── JobApplicationService.java
│       │   ├── repository/                     # Spring Data JPA
│       │   │   └── JobApplicationRepository.java
│       │   ├── model/                          # JPA entities + enums
│       │   │   ├── JobApplication.java
│       │   │   └── ApplicationStatus.java
│       │   ├── dto/                            # response objects
│       │   │   └── StatsResponse.java
│       │   └── exception/                      # global error handling
│       │       ├── ResourceNotFoundException.java
│       │       └── GlobalExceptionHandler.java
│       └── resources/
│           └── application.properties
└── frontend/
    ├── package.json
    ├── vite.config.js                          # dev proxy to :8080
    ├── index.html
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── api/applications.js                 # fetch layer
        ├── components/
        │   ├── StatsBar.jsx
        │   ├── ApplicationForm.jsx
        │   └── ApplicationList.jsx
        └── styles.css
```

## Run Locally

**Backend** (needs Java 17+ and Maven):
```bash
cd backend
./mvnw spring-boot:run        # or: mvn spring-boot:run
# API: http://localhost:8080/api/applications
# H2 console: http://localhost:8080/h2-console
```

**Frontend** (needs Node 18+):
```bash
cd frontend
npm install
npm run dev                   # http://localhost:5173
```

Vite proxies `/api/*` to the Spring Boot server on port 8080.

## REST API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /api/applications?status=APPLIED | List all / filter by status |
| GET    | /api/applications/{id} | Get one |
| GET    | /api/applications/stats | Counts grouped by status |
| POST   | /api/applications | Create (validated) |
| PUT    | /api/applications/{id} | Update |
| DELETE | /api/applications/{id} | Delete |

## Resume Bullets (adapt to your voice)

- Built a full-stack job application tracker using **Spring Boot 3 and React 18**,
  implementing a layered architecture (Controller → Service → Repository) with
  **Spring Data JPA** and an H2 database.
- Designed a **REST API** (6 endpoints) with bean validation, a global
  `@RestControllerAdvice` exception handler, and DTO-based stats aggregation
  using Java Streams.
- Developed a responsive **React** UI with status filtering, inline editing,
  and optimistic pipeline advancement, consuming the API via a dedicated fetch layer
  and Vite dev proxy.

## Possible Extensions

- Swap H2 for PostgreSQL/MySQL and deploy (Render/Railway + Vercel)
- Add Spring Security + JWT login so each user sees their own applications
- Email reminders for follow-ups using Spring's `@Scheduled`
- Docker Compose for one-command startup
