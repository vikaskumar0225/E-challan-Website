// src/components/ActiveChallanForm.jsx
import React, { useState } from "react";
import "./../styles/ActiveChallanForm.css";
import axios from "axios";

function ActiveChallanForm() {

    const [challansarry , setC] = useState([]);
    

    const [challanDetails, setChallanDetails] = useState({
        licenseNumber: "",
        vehicleNumber: "",
    });

    const [challanamount,setAmount] = useState();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setChallanDetails({ ...challanDetails, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/users/checkamount',{
            vehicleNumber:challanDetails.vehicleNumber
        })
        if(response.data.message==="Challan not found for this vehicle number."){
            alert('Challan not found for this vehicle number.');
            setAmount(0);
            return;
        }
        console.log(response.data);
        setAmount(response.data.fineAmount);

        } catch (error) {
            console.log('error in fetching amout of challan ',error);
        }
        
    };

    const payChallan = async ()=>{
            const response = await axios.post('http://localhost:3000/api/users/paychallan',{
                vehicleNumber:challanDetails.vehicleNumber
            });
            alert("fine successfully paid");
            window.location.reload();
    }

    const fetchchallandetails = async (e)=>{
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/users/fetchthechallandetails',{
            vehicleNumber:challanDetails.vehicleNumber
        })
        console.log(response.data);
        setC(response.data.challans);
        console.log(challansarry);

        } catch (error) {
            console.log('error in fetching amout of challan ',error);
        }
        
    }

    return (
        <>
        <div className="challan-form-container">
            <h2>Fill Active Challan</h2>
            <form onSubmit={handleSubmit}>
                <label>Your Name</label>
                <input
                    type="text"
                    name="licenseNumber"
                    value={challanDetails.licenseNumber}
                    onChange={handleInputChange}
                    required
                />
                <label>Vehicle Number</label>
                <input
                    type="text"
                    name="vehicleNumber"
                    value={challanDetails.vehicleNumber}
                    onChange={handleInputChange}
                    required
                />
                <label>Amount Due</label>
                <input type="text" name="amountDue" value={challanamount} readOnly />
                <button type="submit" className="submit-button">Submit</button>
            </form>
            <br/>
            <br/>
            {challanamount ? <button className="submit-button" onClick={payChallan}>Pay</button>: " "}
        </div>

        {challanamount ? <><h1>Challan found! check details of this challan </h1><br/>
        <button className="submit-button" onClick={fetchchallandetails}>check details now </button></>: " "}

        <div style={{margin:"20px",padding:"10px"}}>
        {challansarry.map((challan) => (
        <div key={challan._id} className="challan-card" style={{backgroundColor:"beige",padding:"20px"}}>
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

</>
    );
}

export default ActiveChallanForm;
