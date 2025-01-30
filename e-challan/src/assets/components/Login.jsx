// src/components/Login.jsx
import React, { useState } from "react";
import "./../styles/Login.css";
import axios from 'axios';
import { Link } from "react-router-dom";

function loginUser() {
    if(localStorage.getItem('token')){window.location='/admindashboard';}
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
   
   

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:3000/api/users/login',{email:email,password:password});

            console.log(response.data.token);
            localStorage.setItem('token',response.data.token);
            window.location = '/admindashboard';

            
      
        
        }catch (err) {
            
            console.err("Error response:", error.response?.data);
        }

    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    
                />

                <button type="submit">Login</button>
            </form>
            
            
            <h2>Don’t have an account? Please <b></b>  < Link to="/register">sign up</Link></h2>
        </div>
    );
}

export default loginUser;



