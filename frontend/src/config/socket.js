import socket from "socket.io-client"

let socketInstance=null;
export const initializeSocket=(projectId)=>{
    socketInstance=socket(import.meta.env.VITE_API_URI,{
        auth:{
            token:localStorage.getItem('token')
        },
        query:{
            projectId
        }
    })
     socketInstance.on("connect", () => {
    console.log("Socket is connected:", socketInstance.id);
  });

  socketInstance.on("connect_error", (error) => {
    console.error("Socket connection error:", error.message);
  });
    return socketInstance
}


export const receiveMessage = (eventName, cb) => {
    socketInstance.on(eventName, cb);
}

export const sendMessage = (eventName, data) => {
    socketInstance.emit(eventName, data);
}