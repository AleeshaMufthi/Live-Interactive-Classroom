import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";

import { connectDB } from "./config/db.js";
import { socketHandler } from "./sockets/socketHandler.js";

import uploadRoutes from './routes/uploadRoutes.js'
import sessionRoutes from "./routes/sessionRoutes.js";
import activityRoutes from './routes/activityRoutes.js'

import path from "path";

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

socketHandler(io);

app.use("/api", uploadRoutes);
app.use("/slides", express.static("slides"));
app.use("/uploads", express.static("uploads"));
app.use("/api", sessionRoutes);
app.use("/api", activityRoutes)

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
