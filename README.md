# Real-Time Chat App 💬

**Real-Time Chat App** is a full-stack messaging application that allows users to communicate instantly with each other through real-time messaging.

The system provides **secure authentication, real-time communication, and user presence detection** so that users can see who is online and exchange messages instantly.

The application is built using the **MERN Stack** and utilizes **WebSockets** for real-time communication.

This project demonstrates modern **full-stack development practices**, including **REST APIs, real-time sockets, state management, and modular architecture**.

---

# Project Demo

A **video demonstration of the project** is available on YouTube.

### Watch Project Demo Video  
https://youtu.be/WgkMqghYcdA

---

# 📌 Project Overview

The **Real-Time Chat App** allows users to sign up, log in, and communicate with other users in real time.

The system is built using:

- **MongoDB**
- **Express.js**
- **React**
- **Node.js**
- **Socket.IO**

It provides a **fast and interactive chat experience** where users can send and receive messages instantly without refreshing the page.

---

# 🚀 Features

## 🔐 Authentication System

- User Signup
- User Login
- Secure password handling
- Authentication middleware
- Protected routes for authenticated users

---

## 💬 Real-Time Messaging

The application supports **instant communication** between users.

Users can:

- Send messages instantly
- Receive messages in real time
- View conversation history
- Chat with multiple users
- Automatically update chat interface without refreshing

Real-time functionality is implemented using **Socket.IO**.

---

## 🟢 Online User Detection

Users can see which users are currently online.

Features include:

- Live user presence detection
- Dynamic online user list
- Real-time updates when users connect or disconnect

---

## 🔔 Real-Time Notifications

The system provides notifications when:

- A new message is received
- A message arrives from another user
- A user sends a message while another conversation is open

---

# 🎨 Responsive Frontend

The frontend is built using **React** with **Vite** for fast development and optimized builds.

Frontend features include:

- Modern UI components
- Responsive layout
- Dynamic chat interface
- State management using **Redux Toolkit**

---

# 🧠 Technology Stack

## Frontend

- React
- Tailwind CSS
- Daiusy UI 
- Redux Toolkit
- Axios
- Vite
- CSS

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO
- JWT Authentication
- Bcrypt Js

---

## Database

- MongoDB
- Mongoose

---

# ⚙️ Running the Project Locally

Follow the steps below to run the project on your local machine.

---

# 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/real-time-chat-app.git
```

Navigate into the project folder:

```bash
cd Real-Time-Chat-APP__MERN
```

---

# 2️⃣ Setup the Backend

Navigate to the **Server folder**:

```bash
cd Server
```

Install dependencies:

```bash
npm install
```

Rename the environment file:

```
env → .env
```

Start the backend server:

```bash
npm run dev
```

---

# 3️⃣ Setup the Frontend

Open another terminal and navigate to the **Client folder**:

```bash
cd Client
```

Install dependencies:

```bash
npm install
```

Rename the environment file:

```
env → .env
```

Start the frontend development server:

```bash
npm run dev
```

---

# 4️⃣ Access the Application

Once both servers are running, open the application in your browser:

```
http://localhost:5173
```

---

# 💬 Application Workflow

1. Users create an account using **Signup**.
2. Users log in to access the chat dashboard.
3. The application connects to the server using **Socket.IO**.
4. Online users are detected and displayed.
5. Users can select another user and start chatting.
6. Messages are sent and received **instantly in real time**.

---

# 🎯 Purpose of the Project

The main goal of this project is to:

- Learn **full-stack MERN development**
- Implement **real-time communication using WebSockets**
- Understand **REST APIs and authentication**
- Practice **state management with Redux**
- Build scalable **client-server architecture**

---



# ⭐ Support

If you find this project helpful, consider giving it a ⭐ on GitHub.

---

# 📁 Project Structure

```
Real-Time-Chat-APP__MERN/
    ├── Client/
    │   ├── public/
    │   │   ├── vite.svg
    │   ├── src/
    │   │   ├── Components/
    │   │   │   ├── ChatSidebar.jsx
    │   │   │   ├── Message.jsx
    │   │   │   ├── MessageContainer.jsx
    │   │   │   ├── ProtectedRoute.jsx
    │   │   │   ├── User.jsx
    │   │   ├── pages/
    │   │   │   ├── Auth/
    │   │   │   │   ├── Login.jsx
    │   │   │   │   ├── Signup.jsx
    │   │   │   ├── Home/
    │   │   │   │   ├── Chat.jsx
    │   │   ├── store/
    │   │   │   ├── features/
    │   │   │   │   ├── message/
    │   │   │   │   ├── socket/
    │   │   │   │   ├── user/
    │   │   │   ├── store.js
    │   │   ├── utilities/
    │   │   │   ├── axiosInstance.js
    │   │   ├── App.jsx
    │   │   ├── main.jsx
    │   │   ├── index.css
    │   ├── package.json
    │   ├── vite.config.js
    │
    └── Server/
        ├── config/
        │   ├── connect.db.js
        ├── controllers/
        │   ├── message.controller.js
        │   ├── user.controller.js
        ├── middlewares/
        │   ├── auth.middleware.js
        │   ├── error.middleware.js
        ├── models/
        │   ├── conversation.model.js
        │   ├── message.model.js
        │   ├── user.model.js
        ├── routes/
        │   ├── message.route.js
        │   ├── user.route.js
        ├── socket/
        │   ├── socket.js
        ├── utilities/
        │   ├── asyncHandler.utility.js
        │   ├── errorHandler.utility.js
        ├── index.js
        ├── package.json
```