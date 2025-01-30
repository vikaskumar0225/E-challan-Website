import React, { useState } from "react";
import axios from "axios";
import "./../styles/ChallanHistory.css";

function ChallanHistory() {
    const [challans, setChallan] = useState([]);
    const [vehicleNumber, setvchl] = useState("");

    const submitform = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:3000/api/users/fetchthechallandetails",
                { vehicleNumber }
            );
            console.log(response.data);
            setChallan(response.data.challans);
        } catch (error) {
            console.error("Error in fetching challan details:", error);
        }
    };

    return (
        <>
            <div style={{ margin: "20px", fontSize: "20px" }}>
                <center>
                    <form onSubmit={submitform}>
                        Vehicle Number: &nbsp;
                        <input
                            type="text"
                            required
                            value={vehicleNumber}
                            onChange={(e) => setvchl(e.currentTarget.value)}
                        />
                        <br />
                        <br />
                        <input type="submit" value="Search" />
                    </form>
                </center>
            </div>
            <div className="challan-history-container">
                <h2>Challan History</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Vehicle Number</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {challans.map((challan) => (
                            <tr key={challan._id}>
                                <td>{challan.vehicleNumber}</td>
                                <td>{challan.dueDate}</td>
                                <td>{challan.fineAmount}</td>
                                <td>{challan.finePayed ? "Paid":"Unpaid"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {challans.length > 0 && (
                <div style={{ margin: "20px", padding: "10px" }}>
                    {challans.map((challan) => (
                        <div
                            key={challan._id}
                            className="challan-card"
                            style={{ backgroundColor: "beige", padding: "20px" }}
                        >
                            <h3>Challan for Vehicle: {challan.vehicleNumber}</h3>
                            <p><strong>Vehicle Type:</strong> {challan.vehicleType}</p>
                            <p><strong>Fine Amount:</strong> ₹{challan.fineAmount}</p>
                            <p><strong>Fine Description:</strong> {challan.fineDescription}</p>
                            <p><strong>Rule Description:</strong> {challan.ruleDescription}</p>
                            <p><strong>Due Date:</strong> {new Date(challan.dueDate).toLocaleDateString()}</p>
                            <p><strong>Additional Comments:</strong> {challan.additionalComments}</p>
                            <p><strong>Fine Paid:</strong> {challan.finePayed ? "Yes" : "No"}</p>
                            <p><strong>Created At:</strong> {new Date(challan.createdAt).toLocaleString()}</p>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default ChallanHistory;
