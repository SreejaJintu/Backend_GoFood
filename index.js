import express from 'express';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';
import foodRoutes from './routes/foodRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import paymentRouter from './routes/paymentRoutes.js';

const app = express();


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(
  cors({
    origin:  ['http://localhost:3000', 'https://gofood-gz2h1nq3t-sreeja-sreenivasans-projects.vercel.app'], 
    credentials: true,
    methods: ['GET', 'POST'], 
    allowedHeaders: ['Content-Type','Authorization'],
    allowedHeaders: '*',

  })
);
app.use(express.json());


const startServer = async () => {
  await connectDB(); 
  app.use('/food', foodRoutes);
  app.use('/user', userRoutes);
  app.use('/order', orderRouter);
  app.use('/payment',paymentRouter)

  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
  });
};

startServer();



