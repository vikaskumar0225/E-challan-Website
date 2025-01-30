

import Challan from "../models/vehiclechallan.js";


const challanHistory = async(req,res)=>{
    try {
        const {vehicleNumber} = req.body;
        const challans = await Challan.find({vehicleNumber});

        res.status(200).json({ challans });
      } catch (error) {
        console.error("Error fetching all challans:", error);
        res.status(500).json({ message: "Error fetching challans. Please try again." });
      }
}

export default challanHistory;