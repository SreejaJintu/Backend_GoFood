import express from 'express';
import { displayData } from '../controllers/foodController.js';


const foodRouter = express.Router();

foodRouter.get('/display',displayData)


export default foodRouter;
