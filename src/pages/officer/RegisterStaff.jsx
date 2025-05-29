import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { lable, logo1 } from '../../assets/img';

const RegisterStaff = () => {
  const [enteredSecurityKey, setEnteredSecurityKey] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (enteredSecurityKey !== "SuperSecretKey123") {
      alert("Invalid security key");
      return;
    }

    const formData = new FormData(event.target);
    const password = formData.get("password");
    const confirmPassword = formData.get("password_confirmation");

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const data = {
      name: formData.get("name"),
      username: formData.get("username"),
      address: formData.get("address"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      gender: formData.get("gender"),
      password,
      securityKeyFromClient: enteredSecurityKey,
    };

    try {
      const response = await fetch("http://localhost:5000/api/staff/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.status === 201) {
        window.location.href = "/login-staff";
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Registration failed. Try again later.");
    }
  };

  return (
    <div className="bg-black text-light min-vh-100 d-flex align-items-center">
      <div className="container py-5">
        <div className="text-center mb-4">
       
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card bg-dark text-light border-secondary shadow rounded-4">
              <div className="card-body p-4 p-md-5">
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <h3 className="text-danger fw-bold mb-4 text-center">Register as Staff</h3>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label className="form-label text-danger">Security Key</label>
                        <input
                          type="text"
                          className="form-control bg-dark text-light border-secondary"
                          name="securityKey"
                          placeholder="Enter Security Key"
                          value={enteredSecurityKey}
                          onChange={(e) => setEnteredSecurityKey(e.target.value)}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" name="name" className="form-control bg-dark text-light border-secondary" placeholder="Your Name" required />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Phone</label>
                        <input type="number" name="phone" className="form-control bg-dark text-light border-secondary" placeholder="Your Phone Number" required />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Gender</label>
                        <select name="gender" className="form-control bg-dark text-light border-secondary" required>
                          <option value="" disabled selected>Your Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" name="email" className="form-control bg-dark text-light border-secondary" placeholder="Your Email" required />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" name="password" className="form-control bg-dark text-light border-secondary" placeholder="Password" required />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Confirm Password</label>
                        <input type="password" name="password_confirmation" className="form-control bg-dark text-light border-secondary" placeholder="Confirm Password" required />
                      </div>

                      <div className="d-grid mt-4">
                        <button type="submit" className="btn btn-danger btn-lg">Register</button>
                      </div>
                      <p className="text-center mt-3">
                        Already have an account? <Link to="/login-staff" className="text-danger">Login here</Link>
                      </p>
                    </form>
                  </div>

                  <div className="col-md-6 text-center">
                    <img src='bloo.png' alt="Visual" className="img-fluid rounded-4" style={{ maxHeight: '530px'  , width:'350px' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
};

export default RegisterStaff;
