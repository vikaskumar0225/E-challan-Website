import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './assets/components/HomePage';
import Login from './assets/components/Login';
import Register from './assets/components/Register';
import Dashboard from './assets/components/Dashboard';
import ChallanHistory from './assets/components/ChallanHistory';
import ActiveChallanForm from './assets/components/ActiveChallanForm';
import AdminDashboard from './assets/components/AdminDashboard';
import CreateChallan from './assets/components/CreateChallan';
import ChallanRecords from './assets/components/ChallanRecords';
import DashBoardAnalytics from './assets/components/DashBoardAnalytics';
import SystemSetting from './assets/components/SystemSettings';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/challan-history" element={<ChallanHistory />} />
                <Route path="/fill-active-challan" element={<ActiveChallanForm />} />
                <Route path="/admindashboard" element={<AdminDashboard />} />
                <Route path="/create-challan" element={<CreateChallan />} />
                <Route path="/challanRecords" element={<ChallanRecords />} />
                <Route path="/system-setting" element={<SystemSetting />} />
                <Route path="/dashboardAnalytics" element={<DashBoardAnalytics />} />
            </Routes>
        </Router>
    );
}

export default App;
