import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true }, 
  items: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      size: { type: String }

    },
  ],
  address:{type:Object},
  payment:{type:Boolean},
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'Pending' }, 
  createdAt: { type: Date, default: Date.now },
});

const orderModel = mongoose.models.orders|| mongoose.model("orders", orderSchema);

export  {orderModel};
