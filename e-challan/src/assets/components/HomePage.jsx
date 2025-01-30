import React from 'react';
import '../styles/HomePage.css';
import { Link } from 'react-router-dom';

export default function HomePage() {
    return (
        <div className="home-container">
            <header className="header">
                <h1 className="title">Welcome to the E-Challan System</h1>
                <p className="subtitle">Manage your traffic violations and payments easily.</p>
            </header>
            <div className="main-content">
                <div className="info-section">
                    <h2>About E-Challan</h2>
                    <p>The E-Challan system is an automated traffic enforcement solution. It allows you to view and pay your traffic fines online, saving you time and effort.</p>
                </div>
                <div className="actions">
                    <Link to="/login" className="btn primary">Admin Login</Link>
                    <Link to="/dashboard" className="btn secondary">Go to e-Challan public dashboard</Link>
                </div>
            </div>
            <footer className="footer">
                <p>&copy; 2024 E-Challan System. All Rights Reserved.</p>
            </footer>
        </div>
    );
}
