import React, { useEffect, useState } from "react";
import axios from "axios";
import '../styles/dashboardanalytics.css';
import isUserAuthenticated from "../userAuthentication";

const DashboardAnalytics = () => {
  isUserAuthenticated();
  const [challans, setChallans] = useState([]);
  const [analytics, setAnalytics] = useState({
    totalAmount: 0,
    notPaidAmount: 0,
    paidAmount: 0,
    totalChallans: 0,
    heavyVehicles: 0,
    lightVehicles: 0,
  });

  // Fetch challan data from backend
  const fetchChallanData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/users/challanrecords");
      if (response && response.data) {
        const data = response.data.challans;
        setChallans(data);
        calculateAnalytics(data);
      }
    } catch (error) {
      console.error("Error fetching challan data", error);
    }
  };

  // Calculate analytics
  const calculateAnalytics = (data) => {
    const totalAmount = data.reduce((sum, challan) => sum + challan.fineAmount, 0);
    const notPaidAmount = data
      .filter((challan) => !challan.finePayed)
      .reduce((sum, challan) => sum + challan.fineAmount, 0);
    const paidAmount = totalAmount - notPaidAmount;
    const totalChallans = data.length;
    const heavyVehicles = data.filter((challan) => challan.vehicleType === "Heavy Vehicle").length;
    const lightVehicles = data.filter((challan) => challan.vehicleType === "Light Vehicle").length;

    setAnalytics({
      totalAmount,
      notPaidAmount,
      paidAmount,
      totalChallans,
      heavyVehicles,
      lightVehicles,
    });
  };

  useEffect(() => {
    fetchChallanData();
  }, []);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Challan Analytics Dashboard</h1>
      </header>

      <div className="dashboard-content">
        {/* KPI Cards */}
        <div className="kpi-section">
          <div className="kpi-card">
            <h3>Total Fine Amount</h3>
            <p>₹{analytics.totalAmount}</p>
          </div>
          <div className="kpi-card">
            <h3>Amount Not Paid</h3>
            <p>₹{analytics.notPaidAmount}</p>
          </div>
          <div className="kpi-card">
            <h3>Amount Paid</h3>
            <p>₹{analytics.paidAmount}</p>
          </div>
          <div className="kpi-card">
            <h3>Total Challans</h3>
            <p>{analytics.totalChallans}</p>
          </div>
          <div className="kpi-card">
            <h3>Heavy Vehicles</h3>
            <p>{analytics.heavyVehicles}</p>
          </div>
          <div className="kpi-card">
            <h3>Light Vehicles</h3>
            <p>{analytics.lightVehicles}</p>
          </div>
        </div>

        {/* Table Section */}
        <div className="table-section">
          <h3>Recent Challans</h3>
          <table>
            <thead>
              <tr>
                <th>Vehicle No.</th>
                <th>Type</th>
                <th>Fine Amount</th>
                <th>Status</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>
              {challans.map((challan) => (
                <tr key={challan._id}>
                  <td>{challan.vehicleNumber}</td>
                  <td>{challan.vehicleType}</td>
                  <td>₹{challan.fineAmount}</td>
                  <td>{challan.finePayed ? "Paid" : "Not Paid"}</td>
                  <td>{new Date(challan.dueDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardAnalytics;
