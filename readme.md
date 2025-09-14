# 🚀 Osto Billing Platform

📘 **[API Documentation](https://docs.google.com/document/d/1D4-Njp8Bc7ippMIPInCmbIvYNbZfODwgKkBNsp1lpjc/edit?usp=sharing)**  

 **[Deployment link](https://osto2.onrender.com/)**  

A **subscription and billing management system** for Osto.one's modular cybersecurity services.  
Built with **Go (Gin + GORM)** on the backend and **React + TypeScript** on the frontend, this platform handles subscriptions, usage metering, invoices, payment processing, and billing automation.

---



## 📖 Challenge Overview
The platform provides:
- **Active Subscriptions Management**: Dashboard for Cloud Security, Endpoint Security, Network Security, Compliance, and VAPT modules  
- **Billing Administration**: Payment methods, billing contacts, tax info, backup payments, and notifications  
- **Invoices & Payments**: Invoice generation, PDF downloads, "Pay Now" flow, payment history, multi-currency support  
- **Edge Case Handling**: Failed payments, retries, card expiry, dunning automation, grace periods, service suspension/restoration  

---


## 🛠️ Tech Stack
**Backend**
- Go (Gin)  
- GORM (Postgres ORM)  
- PostgreSQL  
- Stripe (or pluggable payment provider)  
- JWT Auth  

**Frontend**
- React + Javascript 
- React Router  
- React Query  
- Tailwind CSS  

**Infrastructure**
- Docker + Docker Compose  
- GitLab CI/CD  
- Kubernetes (deployment target)  

---

## 📌 MVP Scope
1. Manage module subscriptions (Cloud, Endpoint, Network, Compliance, VAPT)  
2. Billing admin (contacts, payment methods, billing address)  
3. Invoices + “Pay Now” flow (PDF export + payments)  
4. Basic failed-payment recovery + grace period/dunning automation  
5. Multi-currency display  

---

## 🎯 Milestones
- **M0**: Repo skeleton, Docker, CI pipeline  
- **M1**: DB schema & JWT auth  
- **M2**: Subscriptions CRUD + usage meters  
- **M3**: Billing admin + payment methods  
- **M4**: Invoice lifecycle + payments  
- **M5**: Edge case handling & automation (retries, dunning, suspension)  
- **M6**: Hardening, observability, production deployment  

---

## 🗄️ Core Data Model
- `companies` — company details, tax ID, billing address  
- `users` — roles, emails, auth  
- `plans` — pricing, modules, limits  
- `modules` — Cloud, Endpoint, Network, Compliance, VAPT  
- `subscriptions` — company’s active plans + state machine  
- `usage_records` — track consumption metrics  
- `invoices` — amount, due date, currency, line items  
- `payments` — linked to invoices, provider status  
- `payment_methods` — tokenized cards, ACH, fallback hierarchy  

---

## 📡 Example API Endpoints
```http
POST /auth/login
POST /auth/refresh
GET  /companies/:id/subscriptions
POST /subscriptions/:id/upgrade
GET  /invoices?company_id=
POST /invoices/:id/pay
POST /usage
POST /webhooks/payments

## include env variable
DATABASE_URL=postgres://user:pass@localhost:5432/osto_billing?sslmode=disable
JWT_SECRET=your_secret_key




Run with Docker Compose
docker-compose up --build

4. Backend (local dev)
cd backend
go run main.go

5. Frontend (local dev)
cd frontend
npm install
npm run dev

🖥️ Frontend Pages

Dashboard (subscriptions, modules, usage)

Subscription Detail

Billing Admin (contacts, methods, address)

Invoices & Payments

Admin → Dunning