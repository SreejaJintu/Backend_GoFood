  
  import jwt from "jsonwebtoken";

  export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    console.log("Token Received:", token);
  
    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_TOKEN); // Use your JWT secret key
      console.log("Decoded Token:", decoded);
      req.user = decoded; // Attach decoded user info to `req`
      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      console.error("Token Verification Error:", error.message);
      res.status(403).json({ message: "Invalid token." });
    }
  };
  
