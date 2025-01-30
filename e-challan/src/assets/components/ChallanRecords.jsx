import { useEffect, useState } from "react";
import axios from "axios";
import '../styles/challanrecords.css';
import isUserAuthenticated from '../userAuthentication';

const ChallanRecords = () => {
    isUserAuthenticated();
    const [challans, setChallans] = useState([]);
    const [stats, setStats] = useState({
        totalAmount: 0,
        paidAmount: 0,
        unpaidAmount: 0,
        totalChallans: 0,
        heavyVehicles: 0,
        lightVehicles: 0,
    });

    const fetchAllChallans = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/users/challanrecords');
            if (response && response.data) {
                const challanData = response.data.challans || response.data;
                setChallans(challanData);

                // Calculate stats
                const totalAmount = challanData.reduce((sum, challan) => sum + challan.fineAmount, 0);
                const paidAmount = challanData
                    .filter((challan) => challan.finePayed)
                    .reduce((sum, challan) => sum + challan.fineAmount, 0);
                const unpaidAmount = challanData
                    .filter((challan) => !challan.finePayed)
                    .reduce((sum, challan) => sum + challan.fineAmount, 0);
                const heavyVehicles = challanData.filter((challan) => challan.vehicleType === "Heavy Vehicle").length;
                const lightVehicles = challanData.filter((challan) => challan.vehicleType === "Light Vehicle").length;

                setStats({
                    totalAmount,
                    paidAmount,
                    unpaidAmount,
                    totalChallans: challanData.length,
                    heavyVehicles,
                    lightVehicles,
                });
            }
        } catch (error) {
            console.log("Error in fetching details of all challans", error);
        }
    };

    useEffect(() => {
        fetchAllChallans();
    }, []);

    // Graph calculations
    const paidPercentage = (stats.paidAmount / stats.totalAmount) * 100;
    const unpaidPercentage = (stats.unpaidAmount / stats.totalAmount) * 100;
    const heavyVehiclePercentage = (stats.heavyVehicles / stats.totalChallans) * 100;
    const lightVehiclePercentage = (stats.lightVehicles / stats.totalChallans) * 100;

    return (
        <>
            <center><h1>All Challan Records</h1></center>
            <div style={{ margin: "20px", fontSize: "18px" }}>
                <p><strong>Total Challans Issued:</strong> {stats.totalChallans}</p>
                <p><strong>Total Fine Amount:</strong> ₹{stats.totalAmount}</p>
                <p><strong>Total Fine Paid:</strong> ₹{stats.paidAmount}</p>
                <p><strong>Total Fine Not Paid:</strong> ₹{stats.unpaidAmount}</p>
                <p><strong>Number of Heavy Vehicles:</strong> {stats.heavyVehicles}</p>
                <p><strong>Number of Light Vehicles:</strong> {stats.lightVehicles}</p>
            </div>

            {/* Visual Representations */}
            <div className="charts-container" style={{ margin: "20px" }}>
                {/* Bar Chart for Paid vs Unpaid Fine Amount */}
                <div className="chart">
                    <div className="bar paid" style={{ height: `${paidPercentage}%` }} />
                    <div className="bar unpaid" style={{ height: `${unpaidPercentage}%` }} />
                    <p>Paid Fine Amount: ₹{stats.paidAmount}</p>
                    <p>Unpaid Fine Amount: ₹{stats.unpaidAmount}</p>
                </div>

                {/* Pie Chart-like Representation for Vehicle Types */}
                <div className="pie-chart-container">
                    <div className="pie-chart heavy-vehicle" style={{ transform: `rotate(${heavyVehiclePercentage * 1.8}deg)` }} />
                    <div className="pie-chart light-vehicle" style={{ transform: `rotate(${lightVehiclePercentage * 1.8}deg)` }} />
                    <p>Heavy Vehicles: {stats.heavyVehicles}</p>
                    <p>Light Vehicles: {stats.lightVehicles}</p>
                </div>
            </div>

            {challans.length > 0 ? (
                <table border="1" style={{ width: "100%", textAlign: "left", margin: "20px 0" }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Vehicle Number</th>
                            <th>Vehicle Type</th>
                            <th>Fine Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {challans.map((challan) => (
                            <tr key={challan._id}>
                                <td>{challan._id}</td>
                                <td>{challan.vehicleNumber}</td>
                                <td>{challan.vehicleType}</td>
                                <td>₹{challan.fineAmount}</td>
                                <td>{challan.finePayed ? "Paid" : "Not Paid"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <h2>No challan data to show</h2>
            )}
        </>
    );
};

export default ChallanRecords;
