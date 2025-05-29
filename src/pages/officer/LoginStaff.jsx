import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logo1, lable } from '../../assets/img';


function LoginStaff() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = { email, password };

    try {
      const response = await fetch("http://localhost:5000/api/staff/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.status === 200) {
        alert("Login successful!");
        localStorage.setItem("staff", JSON.stringify({
          _id: result.staff._id,
          fullName: result.staff.fullName,
          email: result.staff.email,
          phone: result.staff.phone,
          address: result.staff.address,
        }));
        localStorage.setItem("username", result.staff.fullName);
        localStorage.setItem("token", result.token);
        navigate('/request-donor');
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Login failed, please try again later.");
    }
  };

  return (
    <div className="bg-black text-light min-vh-100 d-flex align-items-center">
      <div className="container py-5">
        <div className="text-center mb-4">
         
        </div>
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-10 col-xl-9">
            <div className="card bg-dark text-light shadow rounded-4">
              <div className="card-body p-md-5">
                <div className="row justify-content-center align-items-center">
                  <div className="col-md-6">
                    <h3 className="text-center text-danger fw-bold mb-4">Welcome Back Staff!</h3>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          <i className="fas fa-envelope me-2 text-danger"></i>Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="form-control bg-dark text-light border-secondary"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                          <i className="fas fa-lock me-2 text-danger"></i>Password
                        </label>
                        <input
                          type="password"
                          id="password"
                          className="form-control bg-dark text-light border-secondary"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-check mb-4">
                        <input type="checkbox" className="form-check-input" id="terms" required />
                        <label className="form-check-label" htmlFor="terms">
                          I agree to the <a href="#" className="text-danger">Terms of Service</a>
                        </label>
                      </div>
                      <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-danger btn-lg">Login</button>
                      </div>
                      <p className="text-center mt-3">
                        Don't have an account? <Link to="/register-staff" className="text-danger">Create one</Link>
                      </p>
                    </form>
                  </div>
                  <div className="col-md-6 text-center">
                    <Link to="/request-donor">
                      <img src='bloo.png' className="img-fluid rounded-4" alt="Staff login visual" style={{ maxHeight: "380px"  , width : '300px' }} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
}

export default LoginStaff;
