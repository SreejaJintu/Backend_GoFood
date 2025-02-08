import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import { createServer } from "http";
import { WebSocketServer } from "ws";

import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import foodRoutes from "./routes/foodRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

// Serve static files for React frontend
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://gofoodapp-2.onrender.com",
      "https://go-food-app-oz1p.vercel.app",
      process.env.FRONTEND_URL,
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// Debug incoming requests
app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.url);
  next();
});

// API routes
app.use("/food", foodRoutes);
app.use("/user", userRoutes);
app.use("/order", orderRouter);
app.use("/payment", paymentRouter);
app.use("/admin", adminRoutes);

// WebSocket handling
wss.on("connection", (ws) => {
  console.log("New client connected");
  ws.on("message", (message) => {
    console.log(`Received: ${message}`);
    ws.send("Hello from server");
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

// Catch-all route for React frontend
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
});

// Start the server
const startServer = async () => {
  await connectDB();
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
