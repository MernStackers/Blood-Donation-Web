import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { lable } from '../../assets/img';
// import {blood}  from  '../../../public/bloo.png'
import WhatsAppAlert from '../WhatsappBlock';

const RegisterDonor = () => {
  const navigate = useNavigate();
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    const donorData = {
      name: form.name.value,
      username: form.username.value,
      address: form.address.value,
      phone: form.phone.value,
      blood_type: form.blood_type.value,
      birthdate: form.birthdate.value,
      gender: form.gender.value,
      email: form.email.value,
      password: form.password.value,
    };

    try {
      const response = await fetch("http://localhost:5000/api/donors/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donorData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ OTP has been sent to your email!");
        setIsOtpSent(true);
        localStorage.setItem("donorData", JSON.stringify(data.donorData));
        navigate("/verify-otp");
      } else {
        alert("❌ " + data.message);
      }
    } catch (error) {
      alert("❌ Registration failed: " + error.message);
    }
  };

  return (
    <div className="bg-black text-light min-vh-100 d-flex align-items-center">
      <div className="container py-5">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-10 col-xl-9">
            <div className="card bg-dark text-light shadow rounded-4">
              <div className="card-body p-md-5">
                <div className="row justify-content-center align-items-center">
                  <div className="col-md-6">
                    <p className="text-center h3 fw-bold mb-4 text-danger">Register as Blood Donor</p>
                    <form onSubmit={handleSubmit}>
                      {[
                        ['text', 'name', 'Your Name', 'fa-user'],
                        ['text', 'username', 'Your Username', 'fa-user'],
                        ['text', 'address', 'Your Address', 'fa-location-dot'],
                        ['number', 'phone', 'Your Phone Number', 'fa-phone'],
                        ['text', 'blood_type', 'Your Blood Type', 'fa-tint'],
                        ['date', 'birthdate', 'Your Birthdate', 'fa-calendar'],
                      ].map(([type, name, placeholder, icon]) => (
                        <div className="mb-3" key={name}>
                          <label htmlFor={name} className="form-label">
                            <i className={`fas ${icon} text-danger me-2`}></i>{placeholder}
                          </label>
                          <input type={type} name={name} id={name} className="form-control bg-dark text-light border-secondary" placeholder={placeholder} required />
                        </div>
                      ))}

                      <div className="mb-3">
                        <label htmlFor="gender" className="form-label">
                          <i className="fas fa-venus-mars text-danger me-2"></i>Your Gender
                        </label>
                        <select name="gender" id="gender" className="form-control bg-dark text-light border-secondary" required>
                          <option value="" disabled hidden>Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          <i className="fas fa-envelope text-danger me-2"></i>Your Email
                        </label>
                        <input type="email" name="email" id="email" className="form-control bg-dark text-light border-secondary" placeholder="Your Email" required />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                          <i className="fas fa-lock text-danger me-2"></i>Password
                        </label>
                        <input type="password" name="password" id="password" className="form-control bg-dark text-light border-secondary" placeholder="Password" required />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="password_confirmation" className="form-label">
                          <i className="fas fa-key text-danger me-2"></i>Confirm Password
                        </label>
                        <input type="password" name="password_confirmation" id="password_confirmation" className="form-control bg-dark text-light border-secondary" placeholder="Confirm Password" required />
                      </div>

                      <div className="form-check mb-4">
                        <input className="form-check-input" type="checkbox" id="terms" required />
                        <label className="form-check-label" htmlFor="terms">
                          I agree to the <a href="#" className="text-danger">Terms of Service</a>
                        </label>
                      </div>

                      <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-danger btn-lg">Register</button>
                      </div>

                      <p className="text-center mt-3">
                        Already have an account? <Link to="/login-donor" className="text-danger">Login here</Link>
                      </p>
                    </form>
                  </div>

                  <div className="col-md-6 d-flex justify-content-center">
                    <img src='bloo.png' className="img-fluid rounded-3" alt="Registration visual" style={{ maxHeight: "535px", width : '350px' }} />
                  </div>
                </div>
              </div>
            </div>
            {/* Optional Logo if needed */}
            {/* <div className="text-center mt-4">
              <img src={logo1} alt="Logo" width={80} />
            </div> */}
          </div>
        </div>
      </div>
      <WhatsAppAlert/>
    </div>
  );
};

export default RegisterDonor;
