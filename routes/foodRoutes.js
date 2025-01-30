import express from 'express';
import { addFood, displayData, removeFood } from '../controllers/foodController.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const foodRouter = express.Router();
foodRouter.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configure storage for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Save images in the 'uploads' folder
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  
  // File upload middleware
  const upload = multer({ storage });
  
foodRouter.get('/display',displayData)
foodRouter.post('/add', upload.single('image'),addFood)
foodRouter.delete('/remove/:id', removeFood);



export default foodRouter;
