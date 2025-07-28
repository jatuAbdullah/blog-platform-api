
---

```markdown
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
- **Caching/Queue (Planned):** Kafka (upcoming)




---

## 📁 Project Structure


src/
├── auth/         # Auth module (login)
├── user/         # User entity, service, controller
├── article/      # Article CRUD
├── comment/      # Commenting on articles
├── like/         # Like system for articles/comments
├── common/       # Guards, decorators (e.g. Roles)
└── main.ts       # Entry point

---

---

## 🧪 Getting Started

### 📦 Install dependencies

```bash
npm install
````

### 🔧 Configure `.env`

```
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=yourpassword
DB_DATABASE=blog
JWT_SECRET=supersecret
JWT_EXPIRES_IN=3600s
```

### ⚙️ Run the server

```bash
npm run start:dev
```

---

## 📌 API Overview

### 🔐 AUTH

| Method | Endpoint      | Description |
| ------ | ------------- | ----------- |
| POST   | `/auth/login` | User login  |

---

### 👤 USER

| Method | Endpoint     | Description     |
| ------ | ------------ | --------------- |
| GET    | `/users/`    | Get all users   |
| POST   | `/users/`    | Create new user |
| DELETE | `/users/:id` | Delete a user   |

---

### 📝 ARTICLE

| Method | Endpoint        | Description       |
| ------ | --------------- | ----------------- |
| GET    | `/article`      | Get all articles  |
| POST   | `/articles`     | Create an article |
| PATCH  | `/articles`     | Update an article |
| DELETE | `/articles/:id` | Delete an article |

---

### 💬 COMMENT

| Method | Endpoint              | Description                     |
| ------ | --------------------- | ------------------------------- |
| POST   | `/comment/`           | Create a comment for an article |
| GET    | `/comment/:articleId` | Get comments for an article     |

---

### ❤️ LIKE

#### ✅ For Comments

| Method | Endpoint                       | Description              |
| ------ | ------------------------------ | ------------------------ |
| POST   | `/likes/toggle?commentId={id}` | Like/unlike a comment    |
| GET    | `/likes/comment?id={id}`       | Get liked comments by ID |

#### ✅ For Articles

| Method | Endpoint                       | Description              |
| ------ | ------------------------------ | ------------------------ |
| POST   | `/likes/toggle?articleId={id}` | Like/unlike an article   |
| GET    | `/likes/article?id={id}`       | Get liked articles by ID |

---

## 🧑‍💻 Authentication & Roles

* JWT-based authentication using `@UseGuards(AuthGuard('jwt'))`
* Role protection using `@Roles('admin')` and custom `RolesGuard`

---

