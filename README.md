# Incident Tracker System

A full-stack Incident Management System built using **Spring Boot + React**.

Users can:
- Create incidents
- View incidents
- Edit severity/status/assignedTo/summary
- Filter incidents (service, status, severity, date range)
- Paginate results

---

## Tech Stack

Backend:
- Java 17
- Spring Boot
- Spring Data JPA
- PostgreSQL
- Maven

Frontend:
- React
- Axios
- Bootstrap

---

## Setup Instructions

### 1️⃣ Clone Repo

git clone https://github.com/manojs12/incident-tracker.git 
cd incident-tracker

---

## Backend Setup

### Requirements
- Java 17
- PostgreSQL

### Create DB

CREATE DATABASE incident_tracker;

Update `backend/src/main/resources/application.properties`:

spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/incident_tracker
    username: postgres
    password: postgres

---

### Run Backend

cd backend  
mvn clean install  
mvn spring-boot:run  

Backend runs at:
http://localhost:8080

---

## Frontend Setup

### Requirements
- Node 18+

cd frontend  
npm install  
npm start  

Frontend runs at:
http://localhost:3000

---

## API Overview

Base URL: `/api/incidents`

### Create Incident
POST /api/incidents

Body:
{
  "title": "Network Down",
  "service": "Billing",
  "severity": "SEV1",
  "status": "OPEN",
  "assignedTo": "Manoj",
  "summary": "Payment gateway failure"
}

---

### Get Incidents
GET /api/incidents?page=0&size=10&service=Billing&status=OPEN

Filters Supported:
- search
- service
- severity
- status

---

### Get Incident by ID
GET /api/incidents/{id}

---

### Update Incident
PATCH /api/incidents/{id}

Body:
{
  "status": "RESOLVED",
  "severity": "SEV2",
  "assignedTo": "Admin",
  "summary": "Issue fixed"
}

---

## Design Decisions

1. Used **Spring Boot + JPA**
   → Faster development, production-ready architecture.

2. Pagination implemented
   → Handles large data efficiently.

3. Filtering done using JPA Specifications
   → Flexible query building.

4. React used for UI
   → Clean component-based structure.

5. Separate backend & frontend folders
   → Industry-standard microservice structure.

other info:

1. Added UI colors to differentiate severities and extra added Service filter for user
2. During the springboot application start up the default random 200 records will be inserted into the postgres db.
3. Deployed the postgres DB with sample data in render. Shared the details over reply mail.

---

## Tradeoffs

- Used Bootstrap for quick UI instead of custom CSS.
- Used single DB instance (no sharding/replication).
- Authentication not implemented due to time.

---

## Improvements With More Time

- Add JWT authentication
- Add user roles
- Add incident timeline history
- Add email/SMS alerts
- Add caching (Redis)
- Add Docker + Kubernetes deployment
- Add unit & integration tests
- Improve UI UX with Material UI
- Filter based on the time window

---

## Author

Manoj S  
Java Backend Developer @ Tejas Networks | Ex-Zoho  

