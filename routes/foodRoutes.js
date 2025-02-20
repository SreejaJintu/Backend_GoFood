
// import express from 'express';
// import { addFood, displayData, removeFood } from '../controllers/foodController.js';
// import upload from "../middlewares/multerMiddleware.js"; // Adjust path as needed


// const foodRouter = express.Router();

// foodRouter.get('/display', displayData);
// foodRouter.post("/add", (req, res, next) => {
//   console.log("Request received on /food/add");
//   next();
// }, upload.single("image"), addFood);
// foodRouter.delete('/remove/:id', removeFood);

// export default foodRouter;
import express from 'express';
import { addFood, displayData, removeFood } from '../controllers/foodController.js';
import upload from "../middlewares/multerMiddleware.js"; // Adjust path as needed

const foodRouter = express.Router();

foodRouter.get('/display', displayData);
foodRouter.post("/add", (req, res, next) => {
  console.log("Request received on /food/add");
  next();
}, upload.single("image"), addFood);
foodRouter.delete('/remove/:id', removeFood);

export default foodRouter;

