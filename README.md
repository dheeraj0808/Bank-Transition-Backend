# Bank-Transition 🏦

A RESTful API backend application for banking operations built with Node.js, Express, and MySQL. This project provides user authentication, account management, and transaction handling capabilities.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Development](#development)
- [Contributing](#contributing)

## ✨ Features

- **User Authentication**: Secure user registration and login with JWT tokens
- **Password Security**: Bcrypt password hashing for enhanced security
- **Account Management**: Create and manage bank accounts
- **Database Integration**: MySQL database with connection pooling
- **RESTful API**: Clean and organized API endpoints
- **Cookie-based Sessions**: Secure session management using cookies
- **Environment Configuration**: Flexible configuration using environment variables

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js v5.2.1
- **Database**: MySQL 2
- **Authentication**: JSON Web Tokens (JWT)
- **Password Hashing**: bcrypt & bcryptjs
- **Environment Management**: dotenv
- **Development**: nodemon (for auto-restart)

## 📁 Project Structure

```
Bank-Transition/
├── src/
│   ├── app.js                    # Express app configuration
│   ├── config/
│   │   └── db.js                 # Database connection pool
│   ├── controllers/
│   │   └── auth.controller.js    # Authentication logic
│   ├── models/
│   │   └── user.model.js         # User model & database queries
│   └── routes/
│       └── auth.routes.js        # Authentication routes
├── server.js                     # Server entry point
├── setup-db.js                   # Database setup script
├── setup-users.js                # Users table setup script
├── create-table.sql              # SQL schema file
├── .env.example                  # Environment variables template
├── .gitignore                    # Git ignore rules
└── package.json                  # Project dependencies
```

## 📦 Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **MySQL** (v5.7 or higher)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dheeraj0808/Bank-Transition.git
   cd Bank-Transition
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## ⚙️ Configuration

1. **Create environment file**
   ```bash
   cp .env.example .env
   ```

2. **Update `.env` file with your configuration**
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_DATABASE=Bank-Transition
   DB_PORT=3306

   # Server Configuration
   PORT=3000
   NODE_ENV=development

   # JWT Secret (change this to a secure random string)
   JWT_SECRET=your_secure_jwt_secret_key_here
   ```

## 🗄️ Database Setup

### Option 1: Using Node.js Scripts (Recommended)

1. **Create the database in MySQL**
   ```bash
   mysql -u root -p
   ```
   ```sql
   CREATE DATABASE `Bank-Transition`;
   EXIT;
   ```

2. **Run the accounts table setup script**
   ```bash
   node setup-db.js
   ```

3. **Run the users table setup script**
   ```bash
   node setup-users.js
   ```

### Option 2: Using SQL File

1. **Create the database and run SQL script**
   ```bash
   mysql -u root -p < create-table.sql
   ```

### Database Schema

**Users Table:**
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Accounts Table:**
```sql
CREATE TABLE accounts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    balance DECIMAL(10, 2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🏃 Running the Application

### Development Mode (with auto-restart)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3000` (or the PORT specified in your `.env` file).

You should see:
```
✓ Database connected successfully!
✓ Server is running on http://localhost:3000
```

## 🔌 API Endpoints

### Authentication

#### Register User
- **Endpoint**: `POST /api/auth/register`
- **Description**: Create a new user account
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securePassword123"
  }
  ```
- **Success Response** (201):
  ```json
  {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "createdAt": "2026-02-14T12:00:00.000Z",
      "updatedAt": "2026-02-14T12:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```
- **Error Response** (422):
  ```json
  {
    "message": "User already exists",
    "status": "Failed"
  }
  ```

#### Login User
- **Endpoint**: `POST /api/auth/login`
- **Description**: Authenticate user and receive JWT token
- **Status**: 🚧 *Under Development*

## 🔧 Development

### Available Scripts

- `npm start` - Start the server in production mode
- `npm run dev` - Start the server in development mode with nodemon
- `npm test` - Run tests (not yet implemented)

### Code Features

- **Password Hashing**: All passwords are hashed using bcrypt with a salt round of 10
- **Email Validation**: Email addresses are validated and normalized (lowercase, trimmed)
- **Connection Pooling**: MySQL connection pool with 10 concurrent connections
- **JWT Authentication**: Tokens expire after 1 day
- **Cookie-based Sessions**: JWT tokens are stored in HTTP-only cookies

## 🔒 Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT token-based authentication
- ✅ Environment variable protection
- ✅ SQL injection prevention (parameterized queries)
- ✅ Unique email constraint
- ✅ Cookie-based session management

## 🐛 Known Issues

1. **Login Controller**: The login functionality is not yet implemented (empty function)
2. **React Import**: There's an incorrect import statement in `auth.controller.js` (line 1: `react-icons/fa`) that should be removed
3. **Password Storage**: The `setup-users.js` script stores plain-text passwords - these should be hashed

## 📝 TODO

- [ ] Implement login controller functionality
- [ ] Add password validation rules
- [ ] Implement transaction endpoints
- [ ] Add account balance transfer functionality
- [ ] Add middleware for authentication verification
- [ ] Add input validation middleware
- [ ] Implement error handling middleware
- [ ] Add API rate limiting
- [ ] Add unit and integration tests
- [ ] Add API documentation (Swagger/OpenAPI)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👥 Authors

- **Dheeraj Singh** - [dheeraj0808](https://github.com/dheeraj0808)

## 🔗 Links

- **Repository**: [https://github.com/dheeraj0808/Bank-Transition](https://github.com/dheeraj0808/Bank-Transition)
- **Issues**: [https://github.com/dheeraj0808/Bank-Transition/issues](https://github.com/dheeraj0808/Bank-Transition/issues)

---

**Note**: This is a learning/demonstration project. For production use, additional security measures, error handling, and testing should be implemented.
