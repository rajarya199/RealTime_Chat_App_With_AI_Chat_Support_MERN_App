import 'dotenv/config.js'
import http from "http"
import app from "./app.js"
import { Server } from "socket.io";
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import Project from './models/project.model.js';
const port=process.env.PORT || 8000;

const server=http.createServer(app)
const io = new Server(server,{
  cors:{
    origin:'*'
  }
});

// Middleware to authenticate each socket connection

io.use(async(socket,next)=>{
  try{
    const authHeader = socket.handshake.headers.authorization;
const token = socket.handshake.auth?.token || (authHeader ? authHeader.split(' ')[1] : null);
    // Get the projectId from socket handshake query parameters

const projectId=socket.handshake.query.projectId;
    if (!token) {
            return next(new Error('Authentication error'))
        }
if(!mongoose.Types.ObjectId.isValid(projectId)){

}
// Find the project from MongoDB by projectId and attach it to socket
 const project = await Project.findById(projectId);
    if (!project) {
      return next(new Error('Project not found'));
    }

    socket.project = project; 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
 if (!decoded) {
            return next(new Error('Authentication error'))
        }

            // Attach the decoded user info to socket for later use

                socket.user = decoded;

        next();

  }
  catch(err){
    console.error('Socket.io middleware error:', err);
    next(new Error('Authentication error'));
  }
})


io.on('connection', socket => {
      socket.roomId = socket.project._id.toString()

    console.log('A user connected');
  // Join the room based on projectId
        socket.join(socket.roomId);


  // Listen for 'project-message' events from this socket

socket.on('project-message', data=>{
  console.log('Received project message:', data);
      // Broadcast the 'project-message' event to all other clients in the same room except sender
  socket.broadcast.to(socket.roomId).emit('project-message',data);
})

  socket.on('event', data => { /* … */ });
  socket.on('disconnect', () => { 
            console.log('user disconnected');

   });
});

server.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})