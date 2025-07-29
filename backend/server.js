import 'dotenv/config.js'
import http from "http"
import app from "./app.js"
import { Server } from "socket.io";

const port=process.env.PORT || 8000;

const server=http.createServer(app)
const io = new Server(server);

io.on('connection', socket => {
    console.log('A user connected');
  socket.on('event', data => { /* … */ });
  socket.on('disconnect', () => { /* … */ });
});

server.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})