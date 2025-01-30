import Challan from "../models/vehiclechallan.js";

const checkAmount = async (req, res) => {
  const { vehicleNumber } = req.body;

  try {
    const challans = await Challan.find({ vehicleNumber });

    // If no challans are found
    if (!challans || challans.length === 0) {
      return res.status(200).json({ message: "Challan not found for this vehicle number." });
    }

    // Filter unpaid challans and calculate the total unpaid amount
    const unpaidChallans = challans.filter((challan) => !challan.finePayed);
    const totalUnpaidAmount = unpaidChallans.reduce((total, challan) => total + challan.fineAmount, 0);

    res.status(200).json({
      vehicleNumber,
      fineAmount:totalUnpaidAmount
    });
  } catch (error) {
    console.error("Error checking fine:", error);
    res.status(500).json({ message: "Error checking fine. Please try again." });
  }
};

export default checkAmount;
