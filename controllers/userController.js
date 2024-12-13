import { userModel } from "../models/User.js";
import jwt from "jsonwebtoken";
import bcryptjs from 'bcryptjs';



const loginUser = async (req, res) => {
  try {
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
        process.env.JWT_TOKEN,
        { expiresIn: "1d" }
      );
      
    
      return res.status(200).json({ success: true, message: "Login successful", token: authToken });
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Login error" });
  }
};


const registerUser = async (req, res) => {
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(req.body.password, salt);

  try {
    const user = await userModel.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    const authToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_token,
      { expiresIn: '1d' }
    );

    res.status(201).json({
      success: true,
      message: 'User registered successfully!',
      token: authToken,   
      userId: user._id, 

    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

    export { registerUser ,loginUser};