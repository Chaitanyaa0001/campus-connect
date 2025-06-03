>  **Note:** This project is currently a **Work in Progress (WIP)** and under active development.

# 🎓 Campus Connect

**Campus Connect** is a dynamic, full-stack MERN web application designed to enhance communication, collaboration, and everyday utility within a campus environment. It offers real-time chat, resource-sharing, lost & found functionality, car pooling/renting, and a student project collaboration space—all under one unified platform.
---

## 🛠️ Tech Stack

- **MongoDB** – NoSQL database for storing user data, messages, and posts
- **Express.js** – Backend framework for RESTful APIs
- **React.js** – Frontend library for building UI
- **Node.js** – Backend runtime environment
- **Socket.io** – Enables real-time communication for chatting
- **Framer Motion** – Smooth animations and transitions in UI
- **JWT (JSON Web Tokens)** – For secure authorization of users
- **Google OAuth 2.0** – For third-party login using Google
- **Cloudinary** – For uploading and storing images (converts them into URLs)



## 💡 Core Features

### 🔐 Authentication & Authorization
- **Email/Password Authentication** with passwords hashed using **bcrypt**
- **Google Sign-In** with **OAuth 2.0**
- **JWT-based route protection** and session handling
- **Role-based Access Control** (Student, Faculty, Admin)

### 💬 Real-Time Chat (Socket.io)
- Real-time one-on-one or group messaging
- Typing indicators and instant updates
- Chat messages stored in MongoDB

### 📸 Cloudinary Integration
- Users can upload photos (profile pictures, item images, project banners)
- Images are stored in **Cloudinary**
- Image URLs are stored in MongoDB as strings
- Supports image preview and rendering from URL

### 🚗 Car Rental & Car Pooling
- Rent or offer cars/rides for college-related travel
- Book based on location, time, and user availability
- Encourages eco-friendly and cost-effective commuting

### 📦 Lost & Found
- Report lost or found items
- Upload images and add descriptions
- Search, filter, and contact original owner or finder

### 💻 Project Collaboration Hub
- Students can **upload project ideas**
- Others can **contribute** or **join as team members**
- Projects include title, description, images (via Cloudinary), and collaborators

---
