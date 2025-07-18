# 🏆 Leaderboard App

This is a full-stack Leaderboard application built with **MERN stack** (MongoDB, Express.js, React, Node.js). Users can register with their name, claim random points, and view real-time rankings and point history.

---

## 🚀 Project Structure

project-root/
│
├── client/ # React frontend
│ └── ...
├── server/ # Express + MongoDB backend
│ ├── models/
│ ├── routes/
│ └── server.js
└── README.md

yaml
Copy
Edit

---

## 📦 Requirements

- Node.js v16 or above
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- Git

---

## 🔧 Setup Instructions

### 1️⃣ Clone the Repo

```bash
git clone https://github.com/your-username/leaderboard-app.git
cd leaderboard-app
📦 Backend Setup
📁 Navigate to Server
bash
Copy
Edit
cd server
📦 Install dependencies
bash
Copy
Edit
npm install
⚙️ Create .env File
Create a .env file inside the server/ folder:

env
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
▶️ Start Backend Server
bash
Copy
Edit
npm start
The backend will run at http://localhost:5000

🌐 Frontend Setup
📁 Navigate to Client
bash
Copy
Edit
cd ../client
📦 Install dependencies
bash
Copy
Edit
npm install
🔧 Vite Config (Optional if already done)
Ensure the following is present in vite.config.js:

js
Copy
Edit
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    }
  },
});
▶️ Start Frontend
bash
Copy
Edit
npm run dev
The frontend will run at http://localhost:5173

🧪 Features
👥 Add User by Name

🎲 Claim Random Points (1–10)

📊 Live Leaderboard Ranking

📜 Claim History (timestamped)

⚡ Fast frontend via Vite

📡 Connected via REST API

🌍 Deployment Guide
🚀 Deploy Backend on Render
Go to Render

Click "New Web Service" → Connect your GitHub repo.

Build Command: npm install

Start Command: npm start

Root Directory: server

Add the MONGO_URI in environment variables.

🚀 Deploy Frontend on GitHub Pages / Netlify / Vercel
For GitHub Pages:

From client folder:

bash
Copy
Edit
npm run build
Copy the dist/ folder contents to a gh-pages branch or deploy via Netlify/Vercel.

OR

Use Netlify/Vercel and deploy the client folder directly by connecting your GitHub repo.

🛠️ Tech Stack
Frontend: React, Vite, Tailwind CSS (optional)

Backend: Node.js, Express.js, MongoDB, Mongoose

Deployment: Render (Backend), Vercel/Netlify/GitHub Pages (Frontend)
