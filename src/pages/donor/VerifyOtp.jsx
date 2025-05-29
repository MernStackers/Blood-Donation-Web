import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WhatsAppAlert from '../WhatsappBlock';

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const donorData = JSON.parse(localStorage.getItem('donorData'));

  const handleVerifyOtp = async () => {
    if (!otp) {
      setError('Please enter OTP.');
      return;
    }

    const response = await fetch('http://localhost:5000/api/donors/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ donorData: { ...donorData, otp } })
    });

    const data = await response.json();

    if (response.ok) {
      alert('✅ Account successfully verified!');
      localStorage.removeItem('donorData');
      navigate('/login-donor');
    } else {
      setError(data.message || '❌ OTP verification failed.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-black text-light fade-in">
      <div className="card bg-dark text-light shadow-lg p-4 rounded" style={{ width: '100%', maxWidth: '420px' }}>
        <h2 className="text-center text-danger fw-bold mb-3">Verify OTP</h2>
        <p className="text-center mb-4">Enter the OTP sent to your email to activate your account.</p>

        <div className="form-group mb-3">
          <label htmlFor="otp" className="form-label">OTP</label>
          <input
            type="text"
            id="otp"
            className="form-control bg-dark text-light border-secondary"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          {error && <div className="text-danger mt-2">{error}</div>}
        </div>

        <button className="btn btn-danger w-100 mt-2" onClick={handleVerifyOtp}>
          Verify OTP
        </button>
      </div>

      <WhatsAppAlert />
    </div>
  );
};

export default VerifyOtp;
