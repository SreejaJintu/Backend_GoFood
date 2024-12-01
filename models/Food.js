import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    category: { type: String, required: true }, 
    price: { type: Number, required: true }
});

// Fix model creation with mongoose.models
const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);

export default foodModel;
