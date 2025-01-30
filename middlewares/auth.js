// // middleware/auth.js
// import jwt from 'jsonwebtoken'

// const verifyToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       return res.status(401).json({ success: false, message: 'No token provided' });
//   }
//   const token = authHeader.split(' ')[1];
  
//   if (!token) {
//     return res.status(401).json({ message: 'Access Denied' });
//   }

//   try {
//     jwt.verify(token, process.env.JWT_token, (err, decoded) => {
//       if (err) {
//         return res.status(403).json({ success: false, message: 'Invalid token' });
//       }
//       req.user = decoded;  
//       next();  
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
  
// };

// export {verifyToken}
import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Extract the token
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify the token and extract the payload
    const decoded = jwt.verify(token, process.env.JWT_token);

    console.log('Decoded JWT:', decoded); // Logs: { userId: '12345', role: 'user', iat: ..., exp: ... }
    
    req.user = { _id: decoded.userId, role: decoded.role }; // Attach user info to the request object
    next(); // Proceed to the next middleware or route
  } catch (error) {
    console.error('JWT Error:', error.message);
    res.status(403).json({ message: 'Unauthorized: Invalid token' });
  }
};
