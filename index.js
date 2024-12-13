import express from 'express';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';
import foodRoutes from './routes/foodRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import paymentRouter from './routes/paymentRoutes.js';
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
      'http://localhost:3000',
      'https://gofood-gz2h1nq3t-sreeja-sreenivasans-projects.vercel.app',
    ],
    credentials: true,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json());

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

  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
