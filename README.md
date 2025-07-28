

````markdown
# 📰 Blog Platform API

A simple blog platform built using **NestJS**, **TypeORM**, and **PostgreSQL**, supporting:

- User authentication with roles
- Article creation and management
- Commenting system
- Like functionality for articles and comments
- JWT-based authentication
- Clean RESTful API

---

## 🚀 Tech Stack

- **Backend:** NestJS
- **Database:** PostgreSQL
- **ORM:** TypeORM
- **Authentication:** Passport.js with JWT
- **Authorization:** Role-based access control
- **Queue (Planned):** Kafka for async events (e.g. likes/notifications)

---

## 📁 Project Structure

<details>
<summary>Directory Overview</summary>

```txt
src/
├── auth/         # Auth module (login/register)
├── user/         # User entity, service, controller
├── article/      # Article CRUD
├── comment/      # Commenting on articles
├── like/         # Like system for articles/comments
├── common/       # Guards, decorators (e.g., Roles)
└── main.ts       # Entry point
````

</details>

---

## 🧪 Getting Started

### 1️⃣ Install Dependencies

```bash
npm install
```

### 2️⃣ Configure Environment Variables

Create a `.env` file:

```env
DATABASE_URL=postgres://user:password@localhost:5432/blogdb
JWT_SECRET=your_jwt_secret
```

### 3️⃣ Run the Project

```bash
npm run start:dev
```

---

## 🔁 Like Feature

* `POST /likes/toggle?articleId=1` – Like or unlike an article
* `POST /likes/toggle?commentId=1` – Like or unlike a comment
* Only one like allowed per user per item (unique constraint)

---

## ✅ Auth Flow

* Users register and login via `/auth/register` and `/auth/login`
* JWT token must be included in `Authorization: Bearer <token>` for protected routes
* Role-based access control supported via `@Roles()` decorator

---

## 🧩 Future Plans

* Kafka for async like events (notifications)
* Soft delete support for articles/comments
* Admin dashboard (role-based access)
