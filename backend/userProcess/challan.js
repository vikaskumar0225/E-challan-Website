import Challan from '../models/vehiclechallan.js';
 
 const userChallan = async (req, res) => {
    const {
      vehicleNumber,
      fineAmount,
      vehicleType,
      fineDescription,
      ruleDescription,
      dueDate,
      additionalComments,
    } = req.body;
  
    try {
      const newChallan = new Challan({
        vehicleNumber,
        fineAmount,
        vehicleType,
        fineDescription,
        ruleDescription,
        dueDate,
        additionalComments,
      });

      await newChallan.save();
      console.log("saved");
  
      res.status(201).json({ message: "Challan created successfully", challan: newChallan });
    } catch (err) {
      console.error("Error creating challan:", err);
      res.status(500).json({ message: "Error creating challan", error: err });
    }
  };

  export default userChallan;