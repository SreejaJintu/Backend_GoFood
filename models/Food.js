import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    category: { type: String}, 
    price: { type: Number }
});

// Fix model creation with mongoose.models
const foodModel = mongoose.models.foods || mongoose.model("foods", foodSchema);

export {foodModel};
