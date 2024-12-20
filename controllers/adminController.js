const displayOrders = async (req, res) => {
    try {
      console.log(global.orders); // Log the global orders for debugging
  
      if (!global.orders || global.orders.length === 0) {
        console.log("Orders not loaded yet");
        return res.status(503).send("Orders data is not yet loaded. Please try again later.");
      }
  
      console.log("Sending orders to client:", global.orders);
      res.json(global.orders); // Send the orders data to the client
    } catch (error) {
      console.error("Error in displayOrders controller:", error);
      res.status(500).send("Server error");
    }
  };
  
  export { displayOrders };
  