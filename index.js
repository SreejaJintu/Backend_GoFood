import express from 'express';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';
import foodRoutes from './routes/foodRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import paymentRouter from './routes/paymentRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

import { WebSocketServer } from 'ws';
import { createServer } from 'http'; // Import for HTTP server

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Middleware
app.use(
  cors({
    origin: [
      'http://localhost:3000','https://gofoodapp-2.onrender.com',
      process.env.FRONTEND_URL,
    ],
    credentials: true,
    origin: '*',
    methods: ['GET', 'POST','PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json());
app.use((req, res, next) => {
  console.log('Incoming request:', req.method, req.url);
  next();
});

// Initialize HTTP server
const server = createServer(app); // Create a standalone HTTP server

// Initialize WebSocket server and attach it to the HTTP server
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('New client connected');
  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    ws.send('Hello from server');
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

const startServer = async () => {
  await connectDB();
  app.use('/food', foodRoutes);
  app.use('/user', userRoutes);
  app.use('/order', orderRouter);
  app.use('/payment', paymentRouter);
  app.use('/admin', adminRoutes);

  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
