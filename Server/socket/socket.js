import express from "express";
import http from "http";
import { Server } from "socket.io";
import "dotenv/config";

export const app = express();

export const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: [process.env.CLIENT_URL],
    credentials: true,
  },
});

const userSocketMap = {
  // userId : socketId
};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (!userId || userId === "undefined") return;

  if(userSocketMap[userId]){
    userSocketMap[userId] = socket.id;
    console.log(userId, "user re-connected... With socket ID - ", socket.id);
  }else{
    userSocketMap[userId] = socket.id;
    console.log(userId, "user connected... With socket ID - ", socket.id);
  }

  io.emit("onlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log(socket.id, " is disconnected.");
    delete userSocketMap[userId];
    io.emit("onlineUsers", Object.keys(userSocketMap));
  });
});

export const getSocketID = (userId) => {
  return userSocketMap[userId];
};
