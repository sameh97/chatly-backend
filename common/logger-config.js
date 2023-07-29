import winston from "winston";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url"; // Import the 'fileURLToPath' function

const __filename = fileURLToPath(import.meta.url); // Convert 'import.meta.url' to '__filename'
const logsDirectory = path.join(path.dirname(__filename), "..", "logs");

export const createLogDirectory = () => {
  if (!fs.existsSync(logsDirectory)) {
    try {
      fs.mkdirSync(logsDirectory, { recursive: true });
    } catch (error) {
      console.error("Error creating log directory:", error);
    }
  }
};

createLogDirectory();

const loggerConfig = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(logsDirectory, "error.log"),
      level: "error",
    }),
    new winston.transports.File({
      filename: path.join(logsDirectory, "combined.log"),
    }),
  ],
});

export default loggerConfig;
