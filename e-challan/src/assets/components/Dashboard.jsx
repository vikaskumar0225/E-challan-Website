// src/components/Dashboard.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./../styles/Dashboard.css";

function Dashboard() {
    const navigate = useNavigate();
    const [hasActiveChallan, setHasActiveChallan] = useState(false);
    const [userCredentials, setUserCredentials] = useState({});

    const handleLogout = () => {
        
    };

    const checkActiveChallan = () => {
       
    };

    return (
        <div className="dashboard-container">
            <h1>Welcome to the Dashboard!</h1>
            <p>Manage your challans easily from here.</p>
            <div className="dashboard-options">
                <button onClick={checkActiveChallan} className="check-challan-button">
                    <Link to="/fill-active-challan" className="link-button">
                        Check and Pay My active challan
                        </Link>
                </button>
                <Link to="/challan-history" className="link-button">
                    View Challan History
                </Link>
                
            </div>
            
        </div>
    );
}

export default Dashboard;
