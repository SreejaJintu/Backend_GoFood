import { userModel } from "../models/User.js";
import jwt from "jsonwebtoken";
import bcryptjs from 'bcryptjs';



const loginUser = async (req, res) => {
  try {
    console.log("Login attempt:", req.body);

    const { name, password } = req.body;

    const user = await userModel.findOne({ name });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const comparePwd = await bcryptjs.compare(password, user.password);
    if (!comparePwd) {
      return res.status(401).json({ success: false, message: "Invalid password" });
    }

    const authToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_token,
      { expiresIn: "1d" }
    );

    console.log("Logged-in User ID:", user._id);

    // Respond with all required user details, including the address
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token: authToken,
      userId: user._id,
      role: user.role,
      name: user.name,
      email: user.email,
      shippingAddress: user.shippingAddress || {}, // Include address details
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Login error" });
  }
};


const registerUser = async (req, res) => {
  console.log("Request body for registration:", req.body);

  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(req.body.password, salt);

  try {
    const user = await userModel.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      shippingAddress: req.body.shippingAddress, // Save the shipping address
    });

    console.log("Created user:", user);

    const authToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_token,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      token: authToken,
      userId: user._id,
      data:user
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export { registerUser ,loginUser};


const updateUserProfile = async (req, res) => {
  try {
    console.log("Request body:", req.body);

    const { name, email, shippingAddress } = req.body;

    if (!name || !email || !shippingAddress) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    const { addressLine1, city, zipCode } = shippingAddress;
    if (!addressLine1 || !city || !zipCode) {
      return res.status(400).json({ success: false, message: "Invalid address data" });
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id, // Assuming user ID comes from JWT middleware
      { name, email, shippingAddress },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { updateUserProfile };

