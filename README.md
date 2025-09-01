# MERN Chat App with AI Gemini Integration, Real-Time Coding & Live Execution
<div align="center">
  <!-- Backend -->
  <img src="https://img.shields.io/badge/-Node.js-black?style=for-the-badge&logo=node.js&logoColor=white&color=339933" alt="nodejs" />
  <img src="https://img.shields.io/badge/-Express.js-black?style=for-the-badge&logo=express&logoColor=white&color=000000" alt="expressjs" />
    <img src="https://img.shields.io/badge/-Socket.IO-black?style=for-the-badge&logo=socket.io&logoColor=white&color=010101" alt="socketio" />
  <img src="https://img.shields.io/badge/-Google_Gemini_AI-black?style=for-the-badge&logo=google&logoColor=white&color=4285F4" alt="google gemini ai" />
  <img src="https://img.shields.io/badge/-MongoDB-black?style=for-the-badge&logo=mongodb&logoColor=white&color=47A248" alt="mongodb" />
  <img src="https://img.shields.io/badge/-Redis-black?style=for-the-badge&logo=redis&logoColor=white&color=DC382D" alt="redis" />


  <!-- Frontend -->
  <img src="https://img.shields.io/badge/-React-black?style=for-the-badge&logo=react&logoColor=white&color=61DAFB" alt="react" />
  <img src="https://img.shields.io/badge/-React_Router-black?style=for-the-badge&logo=reactrouter&logoColor=white&color=CA4245" alt="react router" />
  <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logo=tailwindcss&logoColor=white&color=06B6D4" alt="tailwindcss" />
  <img src="https://img.shields.io/badge/-Vite-black?style=for-the-badge&logo=vite&logoColor=white&color=646CFF" alt="vite" />
  <img src="https://img.shields.io/badge/-WebContainer_API-black?style=for-the-badge&logo=webassembly&logoColor=white&color=654FF0" alt="webcontainer api" />
  <img src="https://img.shields.io/badge/-Axios-black?style=for-the-badge&logo=axios&logoColor=white&color=5A29E4" alt="axios" />
  <img src="https://img.shields.io/badge/-Highlight.js-black?style=for-the-badge&logo=highlight.js&logoColor=white&color=F0E68C" alt="highlightjs" />

</div>


## 🌟 Overview
This project is a real-time collaborative chat application built with the MERN stack (MongoDB, Express, React, Node.js) and integrated with an AI assistant powered by Gemini. It allows users to create rooms or projects where multiple collaborators can chat, collaborate on code, and query the AI for general or coding-related questions.View the AI's response files for code query like app.js,package.json,command etc,edit the file as you want and setup Webcontainer and run the files to test the code.

Users can:
- Create **rooms/projects**.
- Add **collaborators**.
- Chat in **real-time**.
- Get **AI assistance** for **general** or **coding** queries.
- View, edit, and run AI-generated code **directly in the browser** using **WebContainer**.
- run code,view preview , view console ,terminal
- user can edit and save the uodated code files. 
---

## 🚀 Features

- 🏗 **Create Rooms/Projects** – Start new chat rooms or projects for collaboration.
- 👥 **Collaborator Management** – Invite, add, or remove collaborators from rooms.
- 💬 **Real-time Messaging** – Chat instantly with collaborators using Socket.IO.
- 🤖 **AI-Powered Responses** – Mention `@ai` for quick answers using Google Gemini AI.
  - 📝**General questions** → AI replies with plain text.
  - 💻**Coding/MERN queries** → AI replies with:
    - 📝 Text answer
    - 📂 File structure (`filetree`)
    - ▶ Start command (`startcmd`) 
- 🖥 **WebContainer Integration** – Run and preview code directly in the browser.
- ⚡ **Redis Caching** – Faster responses and better scalability.
- 🎨 **Modern UI** – Built with React, Tailwind CSS, and a responsive design.


***

## 🛠 Tech Stack

### Backend

- 🌐 **Node.js + Express.js** — Robust server and API framework
- 🍃 **MongoDB + Mongoose** — NoSQL database with schema ODM
- 🔴 **Redis** — High-performance in-memory store for cache & pub/sub
- 🔄 **Socket.IO** — Real-time bidirectional communication
- 🧠 **Google Gemini AI** — Natural language understanding and code generation AI
- 🔐 **jsonwebtoken** — Secure JWT authentication tokens

### Frontend

- ⚛️ **React** — Component-based UI framework
- 🛣️ **React Router DOM** — Declarative routing for SPA
- 🎨 **Tailwind CSS v4** — Utility-first responsive styling
- 🌐 **Socket.io-client** — Real-time client communication
- 🕸️ **@webcontainer/api** — In-browser code execution environment
- 🎯 **Highlight.js** — Syntax highlighting for code snippets
- ⚡ **Axios** — HTTP requests client

***
## 🏗 Installation & setup

Follow these steps to run the project locally.

---

### 1. Clone the Repository
```bash
git clone https://github.com/rajarya199/RealTime_Chat_App_With_AI_Chat_Support_MERN_App.git
cd RealTime_Chat_App_With_AI_Chat_Support_MERN_App
```
### 2. Backend Setup
### Install dependencies
```
cd backend
npm install
 or
 yarn install
```
### Create a .env file in the server directory and add the following environment variables:
```
PORT=
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
REDIS_URL=your_redis_connection_string
JWT_SECRET=your_jwt_secret
```
### Start the backend server:
```
npm run dev
```
### 3.Frontend Setup
### Install dependencies
```
cd frontend
npm install
 or
 yarn install
```
### Start the frontend development server:
```
npm run dev
```
---

## 💡AI Query Format

- **❓ General Query** `@ai What is React?`\
  Response: `{text: "React is a JavaScript library for building user interfaces."}`

- ** 💻 Coding Query** `@ai Create a simple MERN app structure`\
  Response example:
 ```
 {
   "text": "Here is a basic MERN app structure.",
   "filetree": {
     "app.js": { /* file content */ },
     "package.json": { /* file content */ }
   },
   "startcmd": "npm start"
 }
 ```
💬 **Interact with the AI in your chats by prefixing messages with `@ai`. Code files can be viewed, edited, and run live through WebContainer integration for instant feedback.**

***

## 📧 Contact
For inquiries, reach out to 📩 `aryalrajan078@gmail.com` or open an **issue** in the repository.


