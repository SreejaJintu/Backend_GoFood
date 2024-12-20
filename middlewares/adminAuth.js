import jwt from 'jsonwebtoken';
import {userModel} from '../models/User.js';

export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access Denied' });

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;

    const user = await userModel.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    req.user.role = user.role; // Attach role to request object
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid Token' });
  }
};

export const checkAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access Denied: Admins only' });
  }
  next();
};
