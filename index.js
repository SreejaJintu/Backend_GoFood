import express from 'express';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';
import foodRoutes from './routes/foodRoutes.js';

const app = express();
app.use(
  cors({
    origin: 'http://localhost:3000', 
    credentials: true,
  })
);
app.get('/', (req, res) => {
  res.send('Hello World!');
});


const startServer = async () => {
  await connectDB(); // Wait for database connection and data loading
  app.use('/food', foodRoutes);
  app.use(express.json());
  app.use('/user', userRoutes);
  
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
  });
};

startServer();




