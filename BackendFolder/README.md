# 👥 User Management API

A simple RESTful API built with **Node.js**, **Express**, and **MySQL** for managing users. Supports user registration, login, listing, searching, filtering, and role-based access control using JWT authentication.

---

## 🚀 Features

- ✅ User Registration (Admin / Staff)
- ✅ Login with JWT
- ✅ List all users (Admin-only)
- ✅ Search by name or email
- ✅ Filter by country
- ✅ Role-based access control
- ✅ Password hashing (bcrypt)
- ✅ Input validation (Joi)
- ✅ MySQL table auto-creation
- ✅ Clean, modular structure

---

## 🏗️ Project Structure

```
src/
├── app.js                 # Express app setup
├── server.js              # Entry point
├── config/
│   └── db.js              # MySQL connection and table creation
├── controllers/
│   ├── authController.js
│   └── userController.js
├── middlewares/
│   └── authWware.js # Auth and role-checking middleware
│   └── validationWare.js
├── models/
│   └── UserModel.js      # DB queries for users
├── routes/
│   ├── authRoutes.js
│   └── userRoutes.js
└── validations/
    └── authValidation.js  # Joi validators
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd BackendFolder
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Environment Variables

Create a `.env` file in the root with the following:

```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=user_management
JWT_SECRET=your_jwt_secret
```

### 4. Create MySQL Database

Log into MySQL and run:

```sql
CREATE DATABASE IF NOT EXISTS user_management;
```

✅ Tables will be created automatically when the app starts.

### 5. Start the Server

```bash
# Development mode
npm run dev

```

---

## 🔐 Authentication

All protected routes require a valid **JWT token** in the `Authorization` header:

```
Authorization: Bearer <your_token_here>
```

Tokens are received via `/api/auth/login`.

---

## 📬 API Endpoints

### 🔐 Auth Routes

| Method | Endpoint            | Description              | Access |
|--------|---------------------|--------------------------|--------|
| POST   | `/api/auth/register`| Register new user        | Public |
| POST   | `/api/auth/login`   | Login and receive token  | Public |

### 👥 User Routes (Protected)

| Method | Endpoint              | Description                                | Role Required |
|--------|-----------------------|--------------------------------------------|----------------|
| GET    | `/api/users`          | List all users                             | Admin only     |
| GET    | `/api/users/:id`      | Get user by ID (Admin or self)             | Protected      |
| GET    | `/api/users?search=`  | Search users by name/email                 | Admin only     |
| GET    | `/api/users?country=` | Filter users by country                    | Admin only     |

---

## 🧪 Sample Test Users

You can register these users via Postman using `/api/auth/register`.

### 🔐 Admin Users

```json
{
  "name": "Alice Admin",
  "email": "alice.admin@test.com",
  "password": "Admin123!",
  "role": "Admin",
  "phone": "111-222-3333",
  "city": "New York",
  "country": "USA"
}
```

```json
{
  "name": "Carol Admin",
  "email": "carol.admin@test.com",
  "password": "Admin456!",
  "role": "Admin",
  "phone": "333-444-5555",
  "city": "Toronto",
  "country": "Canada"
}
```

### 👤 Staff Users

```json
{
  "name": "Bob Staff",
  "email": "bob.staff@test.com",
  "password": "Staff123!",
  "role": "Staff",
  "phone": "222-333-4444",
  "city": "Los Angeles",
  "country": "USA"
}
```

```json
{
  "name": "Dave Staff",
  "email": "dave.staff@test.com",
  "password": "Staff456!",
  "role": "Staff",
  "phone": "444-555-6666",
  "city": "Vancouver",
  "country": "Canada"
}
```

```json
{
  "name": "Eve Staff",
  "email": "eve.staff@test.com",
  "password": "Staff789!",
  "role": "Staff",
  "phone": "555-666-7777",
  "city": "Mumbai",
  "country": "India"
}
```

---

## 🔍 Example Queries for Admin

### 1. List All Users

```
GET /api/users
```

### 2. Search Users by Name or Email

```
GET /api/users?search=staff
```

### 3. Filter Users by Country

```
GET /api/users?country=Canada
```

### 4. Combine Search + Filter

```
GET /api/users?search=bob&country=USA
```

All of these require an **Admin JWT token** in the header.

---

## ❌ Error Handling

| Status | Message                                | Cause                             |
|--------|----------------------------------------|-----------------------------------|
| 400    | Validation error                       | Invalid request body              |
| 401    | Authorization token is missing/invalid | Missing or bad JWT token          |
| 403    | Access denied                          | Insufficient role (e.g., Staff)   |
| 404    | User not found                         | Invalid user ID                   |

---

## 📦 Scripts

```bash
npm run dev     # Start with nodemon (auto-reload)
npm start       # Start normally
```

---

## 🛡️ Security Notes

- Passwords are hashed using **bcrypt**
- JWT tokens are signed using a secret key
- Only Admins can access user list and filtering
- Staff users can only access their own data

---

## 🙌 Authored

Developed with ❤️ as part of a Node.js technical assessment.

