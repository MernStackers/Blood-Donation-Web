import React, { useState } from 'react';
import { logo1, lable } from '../../assets/img';
import { Link, useNavigate } from 'react-router-dom';

const LoginDonor = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/donors/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Login successful!");
        localStorage.setItem("username", data.donor.fullName);
        localStorage.setItem('token', data.token);
        localStorage.setItem('donor', JSON.stringify(data.donor));
        navigate("/home-donor");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("❌ Login failed: " + error.message);
    }
  };

  return (
    <div className="bg-black text-light min-vh-100 d-flex align-items-center justify-content-center">
      <div className="container py-5">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-lg-10 col-xl-9">
            <div className="card bg-dark text-light shadow rounded-4">
              <div className="card-body p-md-5">
                <div className="row justify-content-center align-items-center">
                  <div className="col-md-6">
                    <p className="text-center h3 fw-bold mb-4 text-danger">Welcome Back, Blood Donor!</p>
                    {error && (
                      <p className="text-center alert alert-danger p-2">{error}</p>
                    )}
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label htmlFor="email" className="form-label">
                          <i className="fas fa-envelope text-danger me-2"></i>Your Email
                        </label>
                        <input
                          type="email"
                          className="form-control bg-dark text-light border-secondary"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="password" className="form-label">
                          <i className="fas fa-lock text-danger me-2"></i>Password
                        </label>
                        <input
                          type="password"
                          className="form-control bg-dark text-light border-secondary"
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <div className="d-grid gap-2">
                        <button className="btn btn-danger btn-lg" type="submit">Login</button>
                      </div>
                      <div className="text-center mt-3">
                        <p className="small">
                          Don't have an account? <Link to="/register-donor" className="text-danger">Create one</Link>
                        </p>
                      </div>
                    </form>
                  </div>

                  <div className="col-md-6 d-flex justify-content-center">
                    <Link to="/">
                      <img src='bloo.png' className="img-fluid rounded-3" alt="Login visual" style={{ maxHeight: "360px"  ,width:'300px' }} />
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
};

export default LoginDonor;
