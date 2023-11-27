import { addUserSocketMapping } from "./cache-service.js";

import { Server as SocketIOServer } from "socket.io";

export const connectWebSocket = (server) => {
  const io = new SocketIOServer(server); // Use new keyword here

  io.on("connection", (socket) => {
    console.log("User connected");

    socket.on("send-client-data", (clientData) => {
      clientData = JSON.parse(clientData);

      console.log("hi !!!!!! " + clientData.content);

      addUserSocketMapping(clientData.content, socket.id);
    });

    // Handle disconnections
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};
