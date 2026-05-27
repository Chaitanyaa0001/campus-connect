# 🏫 Campus Connect

Campus Connect is a comprehensive MERN stack web application designed to foster a vibrant and resourceful university community. It empowers students with essential features like real-time chat, carpooling coordination, a lost & found system, and dedicated project collaboration spaces. By streamlining these interactions, Campus Connect aims to significantly reduce travel costs (estimated 70%) and boost item recovery rates (estimated 80%) for students. The platform ensures secure access and a seamless mobile experience through integrated JWT-based authentication, Google OAuth, Cloudinary for file uploads, and a fully responsive design.

## 🌐 Live Demo

Experience Campus Connect live: [https://campus-connect-ten-psi.vercel.app/](https://campus-connect-ten-psi.vercel.app/)

## ✨ Features

- 💬 Real-time Chat with Socket.IO for instant communication
- 🚗 Carpooling & Car Rental Management to save travel costs
- 🔍 Lost & Found System to improve item recovery rates
- 🤝 Project Collaboration Spaces for teamwork and knowledge sharing
- 🔒 Secure Authentication (JWT & Google OAuth) for user access
- ☁️ Cloudinary File Uploads for sharing images and documents
- 📱 Responsive Design for a seamless experience across all devices

## 💻 Tech Stack

**Frontend:** React.js, Redux Toolkit
**Backend:** Node.js, Express.js
**Database:** MongoDB
**Real-time Communication:** Socket.IO
**Authentication:** JWT, Google OAuth
**File Storage:** Cloudinary

## ⚙️ Installation

To get Campus Connect up and running on your local machine, follow these steps:

1. Clone the repository:
```bash
git clone https://github.com/your-username/campus-connect.git
cd campus-connect
```

2. Install backend dependencies (assuming a `server` directory):
```bash
cd server
npm install
# or yarn install
```

3. Install frontend dependencies (assuming a `client` directory):
```bash
cd ../client
npm install
# or yarn install
```

4. Set up environment variables:
_Create a `.env` file in both the `server` and `client` directories based on the `.env.example` files (if present), and populate them with your respective API keys and configurations._

## 📸 Screenshots

_Add screenshots here_

## 💡 Usage / How it Works

Campus Connect provides an intuitive interface for university students to engage with various features. Users can securely log in using their credentials or Google OAuth. Once authenticated, they can:

- 🚗 Browse and book carpooling rides or list their own for fellow students, efficiently managing campus transportation needs.
- 💬 Utilize the real-time chat functionality, powered by Socket.IO, to communicate with other users for carpool arrangements, project discussions, or lost & found queries.
- 🔍 Post lost items or report found items, improving the chances of recovery within the university community.
- 🤝 Create or join project collaboration groups, facilitating teamwork, resource sharing, and organized academic work.
- 🖼️ Upload relevant files and images, managed by Cloudinary, for lost & found listings or project resources, enhancing clarity and communication.

## 📂 Folder Structure

```
campus-connect/
├── client/                 # Frontend (React application)
│   ├── public/             # Static assets
│   ├── src/                # React source code
│   │   ├── assets/         # Images, icons, etc.
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Individual page components
│   │   ├── redux/          # Redux Toolkit store and slices
│   │   ├── services/       # API integration, utility functions
│   │   └── App.js          # Main application component
│   ├── .env.example        # Example environment variables for client
│   └── package.json
├── server/                 # Backend (Node.js/Express application)
│   ├── config/             # Database connection, JWT secrets
│   ├── controllers/        # Request handlers
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API routes
│   ├── utils/              # Utility functions
│   ├── .env.example        # Example environment variables for server
│   └── package.json
├── .gitignore
├── README.md
└── package.json            # Optional: for monorepo setup
```

## 🤝 Contributions

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

1. Fork the repository
2. Clone your fork:
```bash
git clone https://github.com/your-username/campus-connect.git
```
3. Create a new branch:
```bash
git checkout -b feature/AmazingFeature
```
4. Make your changes and commit them:
```bash
git commit -m 'feat: Add some AmazingFeature'
```
5. Push to the branch:
```bash
git push origin feature/AmazingFeature
```
6. Open a Pull Request

## 🚀 Upcoming Features

- 🗓️ Event Management & Academic Calendar Integration
- 📚 Study Group Matching for collaborative learning
- 🛒 Marketplace for textbooks and student essentials
- 🔔 Personalized Notification System for timely updates
- 📈 Analytics Dashboard for community engagement metrics

## ⚖️ License

Distributed under the MIT License. See `LICENSE` for more information.

## 📧 Contact

Chaitanya
chaitanyakhurana.workk@gmail.com

