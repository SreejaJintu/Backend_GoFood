import express from 'express';
import { registerUser,loginUser, updateUserProfile} from '../controllers/userController.js'
import { authMiddleware } from '../middlewares/auth.js';
const userRouter = express.Router();

userRouter.post('/login',loginUser)
userRouter.post('/register',registerUser)
userRouter.put('/profile',authMiddleware, updateUserProfile);

  
  


export default userRouter;
