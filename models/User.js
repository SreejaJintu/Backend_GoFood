import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    cartData: {
      type: Object,
      default: {},
    },
    shippingAddress: {
      addressLine1: { type: String},
      city: { type: String },
      zipCode: { type: String },
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user"
    },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

const userModel = mongoose.models.users || mongoose.model("users", userSchema);

export { userModel };
