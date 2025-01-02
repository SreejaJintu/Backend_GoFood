  
  import jwt from "jsonwebtoken";
  import { userModel } from "../models/User.js";

  export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    console.log("Token Received:", token);
  
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Invalid authorization header format" });
    }
    
    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_token); 
      console.log("Decoded Token:", decoded);
      req.user = decoded; 
      next(); 
    } catch (error) {
      console.error("Token Verification Error:", error.message);
      res.status(403).json({ message: "Invalid token." });
    }
  };


  export const verifyAdmin = async (req, res, next) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');
      if (!token) {
        return res.status(401).json({ error: 'No token provided.' });
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await userModel.findById(decoded.id);
  
      if (!user || user.role !== 'admin') {
        return res.status(403).json({ error: 'Access denied. Admins only.' });
      }
  
      req.user = user; // Add user information to the request object
      next();
    } catch (error) {
      console.error('Auth error:', error);
      res.status(401).json({ error: 'Unauthorized.' });
    }
  };
  
  