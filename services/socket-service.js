import { addUserSocketMapping } from "./cache-service.js";
import { Server as SocketIOServer } from "socket.io";

let io;

export const connectWebSocket = (server) => {
  // Initialize Socket.IO with CORS configuration
  io = new SocketIOServer(server, {
    cors: {
      origin: "*", // Allow all origins (you can replace "*" with a specific domain for production)
      methods: ["GET", "POST"], // Allowed methods
      allowedHeaders: ["Content-Type"], // Allowed headers
      credentials: true, // Enable credentials if needed
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected");

    socket.on("send-client-data", (clientData) => {
      if (!clientData || !clientData._id) {
        console.error("Invalid clientData received:", clientData);
        return; // Don't proceed if clientData is missing or invalid
      }
      addUserSocketMapping(clientData._id, socket.id);
    });

    // Handle disconnections
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

export const getIoInstance = () => {
  if (!io) {
    throw new Error("Socket.IO instance is not defined yet");
  }

  return io;
};
