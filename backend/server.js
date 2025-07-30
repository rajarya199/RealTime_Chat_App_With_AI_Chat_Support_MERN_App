import 'dotenv/config.js'
import http from "http"
import app from "./app.js"
import { Server } from "socket.io";
import jwt from 'jsonwebtoken';

const port=process.env.PORT || 8000;

const server=http.createServer(app)
const io = new Server(server,{
  cors:{
    origin:'*'
  }
});

io.use((socket,next)=>{
  try{
    const authHeader = socket.handshake.headers.authorization;
const token = socket.handshake.auth?.token || (authHeader ? authHeader.split(' ')[1] : null);

    if (!token) {
            return next(new Error('Authentication error'))
        }

        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
 if (!decoded) {
            return next(new Error('Authentication error'))
        }
                socket.user = decoded;

        next();

  }
  catch(err){
    console.error('Socket.io middleware error:', err);
    next(new Error('Authentication error'));
  }
})


io.on('connection', socket => {
    console.log('A user connected');
  socket.on('event', data => { /* … */ });
  socket.on('disconnect', () => { 
            console.log('user disconnected');

   });
});

server.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})