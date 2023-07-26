import express from "express";
import allowCors from "./middlewares/cors.js";
import usersApi from "./api/routes/users-routes.js";

const app = express();

// Middleware to handle CORS headers
app.use(allowCors);
app.use(express.json());
app.use("/api", usersApi);

//TODO: remove
app.get("/", (req, res) => {
  res.status(200).json({ msg: "hello world" });
});

export default app;
