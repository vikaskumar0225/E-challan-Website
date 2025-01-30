import Challan from "../models/vehiclechallan.js";

const challanRecords = async (req, res) => {
    try {
        const challans = await Challan.find();
        res.status(200).json({ challans });
    } catch (error) {
        console.error("Error fetching challans:", error);
        res.status(500).json({ error: "Failed to fetch challan records" });
    }
};

export default challanRecords;
