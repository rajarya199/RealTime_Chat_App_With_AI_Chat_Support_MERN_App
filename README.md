# MERN Chat App with AI Gemini Integration, Real-Time Coding & Live Execution

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

