import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/AdminDashboard.css';
import isUserAuthenticated from "../userAuthentication";

const AdminDashboard = () => {
  isUserAuthenticated();
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const navigate = useNavigate();

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.body.classList.toggle("dark-theme", !isDarkTheme);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert("Logged out successfully!");
    navigate("/login"); 
  };

  return (
    <div className={`admin-dashboard ${isDarkTheme ? "dark" : ""}`}>
      <header>
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </header>
      <main>
        <button onClick={toggleTheme} className="theme-toggle-btn">
          🌙 Toggle Theme
        </button>
        <button
          onClick={() => navigate("/create-challan")}
          className="challan-btn"
        >
          Create Vehicle Challan
        </button>
        <Link to="/challanRecords"  style={{textDecoration:"none"}}><div className="feature-card">🚗 View Challan Records</div></Link>
        <Link to="/dashboardanalytics"  style={{textDecoration:"none"}}><div className="feature-card">📊 Dashboard Analytics</div></Link>
        <Link to="/system-setting"  style={{textDecoration:"none"}}><div className="feature-card">⚙️ System Settings</div></Link>
      </main>
    </div>
  );
};

export default AdminDashboard;
