# Admin Panel with Authentication and Coupon Management

## Overview
This project is a full-stack web application that provides an admin panel for managing coupons. It includes user authentication using cookies, a database for storing coupons and claims, and a frontend built with React.

## Features
- Admin authentication with email, password, and private key
- Secure login using HTTP-only cookies
- CRUD operations for coupons
- Claim tracking using IP address and session ID
- User session management with cookie-based authentication

## Tech Stack
### Frontend:
- React.js
- React Router
- Axios

### Backend:
- Node.js
- Express.js
- PostgreSQL
- bcrypt (for password hashing)
- jsonwebtoken (JWT authentication)
- dotenv (for environment variables)

## Database Schema

### `admins` Table
```sql
CREATE TABLE admins (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);
```

### `coupons` Table
```sql
CREATE TABLE coupons (
  id SERIAL PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  claimed BOOLEAN DEFAULT FALSE
);
```

### `claims` Table
```sql
CREATE TABLE claims (
  id SERIAL PRIMARY KEY,
  coupon_id INT REFERENCES coupons(id) ON DELETE CASCADE,
  ip_address TEXT,
  session_id TEXT,
  claim_time TIMESTAMP DEFAULT NOW()
);
```

## Setup Instructions

### **Backend Setup**
1. Clone the repository:
   ```bash
   git clone https://github.com/rajeev2004/RoundRobin-backend.git
   cd RoundRobin-backend

2. Install dependencies:
   ```bash
   npm install

3. Create a .env file and add the following environment variables: 
    ```bash
    DATABASE_URL=your_database_url
    SECRET_KEY=your_jwt_secret
    ADMIN_KEY=your_admin_key

4. Start the backend server (ensure the database is set up):
    ```bash
    node server.js

### **Frontend Setup**
1. Clone the repository:
   ```bash
   git clone https://github.com/rajeev2004/RoundRobin-frontend.git
   cd RoundRobin-frontend

2. Install dependencies:
    ```bash
    npm install

3. Create a .env file and add the following:
    ```bash
    VITE_API_BACKEND=http://localhost:5000

4. Start the frontend development server:
    ```bash
    npm run dev

5. Access the application at http://localhost:5173

## Demo

You can check out the live website [here](https://rajeev2004.github.io/RoundRobin-frontend/)

![RoundRobin Screenshot](https://raw.githubusercontent.com/rajeev2004/RoundRobin-frontend/refs/heads/main/src/assets/screenshot.png?raw=true)