import http from "http";
import { PORT, MONGO_DB_URL } from "./common/consts.js";
import app from "./app.js";
import dbConnect from "./config/database.js";

const start = async () => {
  const server = http.createServer(app);
  const conn = await connectDB();

  server.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
  });
};

const connectDB = async () => {
  try {
    const conn = await dbConnect(MONGO_DB_URL);

    console.log("Connected to the database successfully");

    return conn;
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
};

start();
