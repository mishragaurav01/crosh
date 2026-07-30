# Crosh

> Enterprise-grade E-Commerce Platform built with Domain-Driven Design, Modular Monolith Architecture, and Production Engineering Practices.

![Architecture](https://img.shields.io/badge/Architecture-Modular%20Monolith-blue)
![Backend](https://img.shields.io/badge/Backend-Node.js-success)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6)
![Database](https://img.shields.io/badge/Database-MongoDB-green)
![Status](https://img.shields.io/badge/Status-Under%20Development-orange)

---

## 📖 Overview

Crosh is a production-grade e-commerce platform designed for handmade crochet products.

The objective of this project is not just to build another shopping website, but to engineer an enterprise-level backend using modern software architecture principles such as:

- Domain-Driven Design (DDD)
- Modular Monolith Architecture
- Clean Architecture
- Repository Pattern
- SOLID Principles
- RESTful API Design
- Secure Authentication & Authorization
- Scalable Database Design

The project is being developed module-by-module following a structured engineering process similar to real software companies.

---

# Architecture

```
                 Client Applications
        ┌──────────────────────────────┐
        │                              │
        │   Customer Web (Next.js)     │
        │   Admin Dashboard (Next.js)  │
        │                              │
        └──────────────┬───────────────┘
                       │
                REST API (Express)
                       │
        ┌──────────────────────────────┐
        │      Modular Monolith         │
        ├──────────────────────────────┤
        │ Identity                     │
        │ Catalog                      │
        │ Shopping                     │
        │ Ordering                     │
        │ Platform                     │
        └──────────────────────────────┘
                       │
                    MongoDB
```

---

# Tech Stack

### Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- Zod
- JWT
- bcrypt

### Frontend (Planned)

- Next.js
- React
- Tailwind CSS

### Tooling

- pnpm
- ESLint
- Prettier
- Husky
- lint-staged
- GitHub

---

# Project Structure

```
src/

modules/
    identity/
    catalog/
    shopping/
    ordering/
    platform/

shared/
config/
middlewares/
utils/
```

Each module is developed independently and contains its own:

- Domain
- Repository
- Services
- Validation
- Routes
- Types

---

# Engineering Principles

This project follows:

- Domain-Driven Design
- Modular Monolith
- SOLID Principles
- Repository Pattern
- Layered Architecture
- Strict TypeScript
- Separation of Concerns
- Dependency Inversion
- Production-first development

---

# Development Roadmap

## ✅ Sprint 1 — Infrastructure

- Express Setup
- MongoDB
- Logging
- Configuration
- Error Handling
- Graceful Shutdown

---

## ✅ Sprint 2 — Identity & Access Management

- Authentication
- Authorization
- Roles
- Permissions
- JWT
- Refresh Tokens
- Session Management
- Password Reset
- User Profile

---

## 🚧 Sprint 3 — Product Management

- Categories
- Collections
- Products
- Variants
- Inventory
- Product Images
- Pricing

---

## 📅 Upcoming

- Shopping Cart
- Wishlist
- Checkout
- Razorpay Integration
- Orders
- Shipping
- Admin Dashboard
- Production Hardening

---

# Security

Implemented:

- JWT Authentication
- Password Hashing
- Role-Based Access Control (RBAC)
- Permission-Based Authorization
- Session Management
- Refresh Tokens
- Password Reset Flow
- Request Validation

---

# Design Goals

- Maintainable
- Scalable
- Secure
- Testable
- Production Ready
- Enterprise Grade

---

# Current Status

The project is actively under development.

Current Progress:

- Architecture Complete
- Sprint 1 Complete
- Sprint 2 Complete
- Sprint 3 In Progress

---

# License

This project is intended for educational and portfolio purposes.

All rights reserved.
