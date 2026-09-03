# Secure User Authentication System

A secure full-stack authentication web application developed as **Task 01** of the Prodigy InfoTech Full-Stack Web Development Internship.

The application provides user registration, secure login, authentication, protected routes, logout, and a responsive user dashboard.

## Features

- User registration
- User login
- Secure password hashing using bcrypt
- JWT-based authentication
- HTTP-only authentication cookies
- Protected user routes
- Persistent authentication after page refresh
- Secure logout
- Duplicate email validation
- Form validation
- Responsive and modern user interface
- MongoDB database integration

## Tech Stack

### Frontend

- React.js
- Vite
- HTML5
- CSS3
- JavaScript

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

### Authentication & Security

- bcrypt
- JSON Web Tokens (JWT)
- HTTP-only cookies
- CORS
- Environment variables

## Project Structure

```text
PRODIGY_WD_01/
├── client/
│   └── src/
│       ├── App.jsx
│       ├── App.css
│       └── index.css
│
├── server/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── authController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── authRoutes.js
│   └── server.js
│
├── .gitignore
└── README.md
```
