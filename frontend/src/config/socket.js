import socket from "socket.io-client"

let socketInstance=null;
export const initializeSocket=()=>{
    socketInstance=socket(import.meta.env.VITE_API_URI,{
        auth:{
            token:localStorage.getItem('token')
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