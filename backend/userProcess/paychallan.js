import Challan from "../models/vehiclechallan.js";

const payChallan = async (req, res) => {
  try {
    const { vehicleNumber } = req.body;

    if (!vehicleNumber) {
      return res.status(400).json({ message: "Vehicle number is required." });
    }

    const updatedChallans = await Challan.updateMany(
      { vehicleNumber, finePayed: false },
      { finePayed: true }
    );

    if (updatedChallans.matchedCount === 0) {
      return res.status(404).json({ message: "No unpaid challans found for this vehicle number." });
    }

    res.status(200).json({
      message: "Challans successfully paid.",
      updatedCount: updatedChallans.modifiedCount,
    });
  } catch (error) {
    console.error("Error updating challans:", error);
    res.status(500).json({ message: "Error paying the challan. Please try again." });
  }
};

export default payChallan;
