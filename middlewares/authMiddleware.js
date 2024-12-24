  
  // import jwt from "jsonwebtoken";

  // export const authenticateToken = (req, res, next) => {
  //   const authHeader = req.headers.authorization;
  //   const token = authHeader && authHeader.split(" ")[1];
  //   console.log("Token Received:", token);
  
  //   if (!token) {
  //     return res.status(401).json({ message: "Access denied. No token provided." });
  //   }
  
  //   try {
  //     const decoded = jwt.verify(token, process.env.JWT_token); 
  //     console.log("Decoded Token:", decoded);
  //     req.user = decoded; 
  //     next(); 
  //   } catch (error) {
  //     console.error("Token Verification Error:", error.message);
  //     res.status(403).json({ message: "Invalid token." });
  //   }
  // };
  
  import jwt from "jsonwebtoken";

  export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
  
    if (!token) return res.status(401).json({ message: "Access token required" });
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Attach the decoded token payload to the request
      next();
    } catch (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
  };
  