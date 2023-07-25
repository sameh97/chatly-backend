import express from "express";
import allowCors from "./middlewares/cors.js";

const app = express();

// Middleware to handle CORS headers
app.use(allowCors);
app.use(express.json());

//TODO: remove
app.get("/", (req, res) => {
  res.status(200).json({ msg: "hello world" });
});

export default app;
