import { Server } from 'socket.io';

export const socketServer = (httpServer: any) => {
  const io = new Server(httpServer, {
    cors: {
      origin: ["https://chatmake.onrender.com", "http://localhost:3000"]
    }
  })
  
  io.on("connection", (socket) => {
  
    socket.on('join', ({username, room}) => {
      socket.join(room);
      // socket.emit('message', {username: 'admin', message: `${username}, Welcome to the chat`});
      // socket.broadcast.to(room).emit('message', {username: 'admin', message: `${username} has joined the chat`})
    })
  
    socket.on('sendMessage', ({id, username, room, message}) => {
      io.to(room).emit('message', {id, username, message});
    })
    
    // socket.on('left', (username, room) => {
    //   socket.broadcast.to(room).emit('message', {username: 'admin', message: `${username} has left the chat`});
    // })
  });
} 