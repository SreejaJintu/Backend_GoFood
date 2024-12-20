import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');

    // Fetch food data
    const fetchedFoodData = await mongoose.connection.db.collection("foods");
    const foodData = await fetchedFoodData.find({}).toArray(); 
    global.food_items = foodData; 

    // Fetch orders data
    const fetchedOrdersData = await mongoose.connection.db.collection("orders");
    const ordersData = await fetchedOrdersData.find({}).toArray();
    global.orders = ordersData; // Store orders globally

    console.log('Food items and Orders data loaded successfully');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); 
  }
};

export default connectDB;
