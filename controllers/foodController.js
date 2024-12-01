
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
  
  


