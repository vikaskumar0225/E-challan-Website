import React, { useState } from "react";
import "../styles/CreateChallan.css";
import axios from "axios";
import isUserAuthenticated from "../userAuthentication";

const CreateChallan = () => {
  isUserAuthenticated();
  const [formData, setFormData] = useState({
    vehicleNumber: "",
    fineAmount: "",
    vehicleType: "",
    fineDescription: "",
    ruleDescription: "",
    dueDate: "",
    additionalComments: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:3000/api/users/createchallan',{
            vehicleNumber:formData.vehicleNumber,
            fineAmount:formData.fineAmount,
            vehicleType:formData.vehicleType,
            fineDescription:formData.fineDescription,
            ruleDescription:formData.ruleDescription,
            dueDate:formData.dueDate,
            additionalComments:formData.additionalComments
        });
        alert("Challan Created Successfully!");
        console.log(response.data);
        window.location = '/create-challan';
    } catch (error) {
        console.log("error in creating challan ",error);
    }
    
   
  };

  return (
    <div className="create-challan">
      <h1>Create Vehicle Challan</h1>
      <form onSubmit={handleSubmit} className="challan-form">
        <div className="form-group">
          <label>Vehicle Number</label>
          <input
            type="text"
            name="vehicleNumber"
            value={formData.vehicleNumber}
            onChange={handleChange}
            placeholder="Enter Vehicle Number"
            required
          />
        </div>

        <div className="form-group">
          <label>Fine Amount</label>
          <input
            type="number"
            name="fineAmount"
            value={formData.fineAmount}
            onChange={handleChange}
            placeholder="Enter Fine Amount"
            required
          />
        </div>

        <div className="form-group">
          <label>Vehicle Type</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="vehicleType"
                value="Heavy Vehicle"
                onChange={handleChange}
                required
              />
              Heavy Vehicle
            </label>
            <label>
              <input
                type="radio"
                name="vehicleType"
                value="Light Vehicle"
                onChange={handleChange}
              />
              Light Vehicle
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Description of the Fine</label>
          <textarea
            name="fineDescription"
            value={formData.fineDescription}
            onChange={handleChange}
            placeholder="Enter Description of the Fine"
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label>Description of the Rule Break</label>
          <textarea
            name="ruleDescription"
            value={formData.ruleDescription}
            onChange={handleChange}
            placeholder="Enter Description of the Rule Break"
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label>Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Additional Comments</label>
          <textarea
            name="additionalComments"
            value={formData.additionalComments}
            onChange={handleChange}
            placeholder="Enter Additional Comments"
          ></textarea>
        </div>

        <button type="submit" className="submit-btn">
          Submit Challan
        </button>
      </form>
    </div>
  );
};

export default CreateChallan;
