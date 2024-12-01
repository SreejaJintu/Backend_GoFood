import express from 'express';
import { registerUser,loginUser} from '../controllers/userController.js'

const userRouter = express.Router();

userRouter.post('/login',loginUser)
userRouter.post('/register',registerUser)

  
  


export default userRouter;
