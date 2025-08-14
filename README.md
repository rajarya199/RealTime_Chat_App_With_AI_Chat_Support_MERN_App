# MERN Chat App with AI Gemini Integration, Real-Time Coding & Live Execution
<div align="center">
  <!-- Backend -->
  <img src="https://img.shields.io/badge/-Node.js-black?style=for-the-badge&logo=node.js&logoColor=white&color=339933" alt="nodejs" />
  <img src="https://img.shields.io/badge/-Express.js-black?style=for-the-badge&logo=express&logoColor=white&color=000000" alt="expressjs" />
  <img src="https://img.shields.io/badge/-MongoDB-black?style=for-the-badge&logo=mongodb&logoColor=white&color=47A248" alt="mongodb" />
  <img src="https://img.shields.io/badge/-Redis-black?style=for-the-badge&logo=redis&logoColor=white&color=DC382D" alt="redis" />
  <img src="https://img.shields.io/badge/-Socket.IO-black?style=for-the-badge&logo=socket.io&logoColor=white&color=010101" alt="socketio" />
  <img src="https://img.shields.io/badge/-Google_Gemini_AI-black?style=for-the-badge&logo=google&logoColor=white&color=4285F4" alt="google gemini ai" />

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

## Features

- **Room/Project Creation:** Users can create multiple chat rooms or projects to organize discussions and collaborations.
- **Collaborator Management:** Users can add collaborators to each room/project to enable team communication.
- **Real-time Messaging:** Instant chat messaging between all collaborators within the room.
- **AI Integration:**
  - Prefix any message with `@ai` to query the AI.
  - For general questions, the AI responds with a text message shown in the chat.
  - For coding or MERN stack-related questions, the AI provides:
    - Text response message.
    - File structure (`filetree`) related to the query.
    - Start command (`startcmd`) if applicable.
- **File Viewer & Editor:** The right-hand section displays the AI-generated or collaboratively created file structure allowing users to view and edit code files directly.
- **Web Container Integration:** The project includes a web container environment to run the edited code live and view the results instantly within the app.

---

## Technologies Used

- **Frontend:** React, Tailwind.V4 CSS
- **Backend:** Node.js, Express.js,Redis
- **Database:** MongoDB with Mongoose ODM
- **Real-time Communication:** Socket.IO or WebSocket
- **AI Integration:** Gemini AI API for natural language & coding queries
- **WebContainer:** For running edited code live in-browser

### Backend
- **Node.js & Express.js** — Server framework for APIs and real-time communication
- **MongoDB & Mongoose** — Database and ODM for data persistence
- **Socket.IO** — Real-time messaging and collaboration
- **@google/genai** — Gemini AI integration for intelligent query responses
-  **Redis** — In-memory data store for caching and pub/sub messaging
- **jsonwebtoken** — JWT-based authentication


### Frontend
- **React** — UI library for building interactive interfaces
- **React Router DOM** — Client-side routing
- **Tailwind CSS** — Utility-first CSS framework for styling
- **socket.io-client** — Client-side real-time communication
- **@webcontainer/api** — Run and preview code live inside the browser
- **highlight.js** — Syntax highlighting for code snippets

## Installation & Setup

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
## AI Query Format

- **General Query:** `@ai What is React?`\
  Response: `{text: "React is a JavaScript library for building user interfaces."}`

- **Coding Query:** `@ai Create a simple MERN app structure`\
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


