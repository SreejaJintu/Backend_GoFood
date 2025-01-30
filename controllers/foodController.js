import mongoose from "mongoose";
import {foodModel} from "../models/Food.js";
import fs from 'fs'


const addFood=async(req,res)=>{

    console.log("Request body:", req.body);

    const newFood= new foodModel({
        name:req.body.name,
        description:req.body.description,
        image: req.file ? req.file.filename : null, 
        price:req.body.price,
        category:req.body.category
 
         })
      
    try {
       
      await  newFood.save()
      res.json({
        success: true,
        message: "Food added successfully",
        foodItem: newFood, 
      });
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"error in addind food"})

        
    }

}

const listFood=async(req,res)=>{
try {
    const foods= await foodModel.find({})
    res.json({success:true,data:foods})
    
} catch (error) {
    console.log(error)
res.json({success:false,message:error})
}

}

const removeFood = async (req, res) => {
  try {
    console.log("Delete request received for ID:", req.params.id); // Log the ID

    const { id } = req.params; 
    const deletedFood = await foodModel.findByIdAndDelete(id); 

    if (!deletedFood) {
      return res.status(404).json({ success: false, message: "Food item not found" });
    }

    res.json({ success: true, message: 'Food item deleted successfully', deletedFood });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error deleting food item" });
  }
};




export {addFood,listFood,removeFood}
const displayData = async (req, res) => {
    try {
      console.log(global.food_items)
      if (!global.food_items || global.food_items.length === 0) {
        console.log("Food items not loaded yet");
        return res.status(503).send("Food data is not yet loaded. Please try again later.");
      }
      console.log("Sending food items to client:", global.food_items);
      res.json(global.food_items); 
    } catch (error) {
      console.error("Error in displayData controller:", error);
      res.status(500).send("Server error");
    }
  };
  
  export { displayData };
  
  


