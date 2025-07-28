# 📰 Blog Platform API

A simple yet powerful blog platform built using **NestJS**, **TypeORM**, and **PostgreSQL**, supporting:

- ✅ User authentication with role-based access
- ✍️ Article creation and management
- 💬 Commenting system
- ❤️ Like functionality for articles and comments
- 🔐 JWT-based authentication
- 🔗 Clean RESTful API

---

## 🚀 Tech Stack

- **Backend:** [NestJS](https://nestjs.com/)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **ORM:** [TypeORM](https://typeorm.io/)
- **Authentication:** [Passport.js](http://www.passportjs.org/) with JWT
- **Authorization:** Role-based access control via decorators
- **Queue (Planned):** Kafka for asynchronous events (e.g., notifications on likes)

---

## 📁 Project Structure

<details>
<summary><strong>Click to expand project directory</strong></summary>

```txt
src/
├── auth/         # Authentication (login/register, JWT strategy)
├── user/         # User module (entity, service, controller)
├── article/      # Article CRUD operations
├── comment/      # Commenting on articles
├── like/         # Like/unlike functionality for articles and comments
├── common/       # Shared utilities (guards, decorators like @Roles)
└── main.ts       # Application entry point
```
</details>

---

## 🧪 Getting Started

### 1️⃣ Install Dependencies

```bash
npm install
```

### 2️⃣ Configure Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=postgres://user:password@localhost:5432/blogdb
JWT_SECRET=your_jwt_secret
```

### 3️⃣ Run the Application

```bash
npm run start:dev
```

> Ensure PostgreSQL is running and matches the credentials provided.

---

## ❤️ Like Feature

- `POST /likes/toggle?articleId=1` — Toggle like/unlike on an article
- `POST /likes/toggle?commentId=1` — Toggle like/unlike on a comment
- Enforces **one like per user per target** using a unique constraint

---

## 🔐 Authentication Flow

- **Register:** `POST /auth/register`
- **Login:** `POST /auth/login`
- **Token Usage:** Include JWT in header  
  `Authorization: Bearer <token>`
- **Access Control:** Use `@Roles()` decorator to protect routes based on user roles

---
