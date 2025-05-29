import React, { useState } from 'react';
import { Footer, Navigation } from '../../components';

const RequestDonor = ({ onRequestSubmit }) => {
  const [bloodGroup, setBloodGroup] = useState('');
  const [requestReason, setRequestReason] = useState('');

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (bloodGroup.trim() === '' || requestReason.trim() === '') return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in first.");
      return;
    }

    let staffId;
    try {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      staffId = decoded.id;
    } catch (err) {
      alert("Invalid token. Please log in again.");
      return;
    }

    const request = { bloodGroup, reason: requestReason, status: 'Pending', staffId };

    const response = await fetch('http://localhost:5000/api/requests/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });

    if (response.ok) {
      const newRequest = await response.json();
      if (onRequestSubmit) onRequestSubmit(newRequest);
    }

    setBloodGroup('');
    setRequestReason('');
  };

  return (
    <div className="bg-black text-light min-vh-100">
      <Navigation username="Mike Junior" homeColor="text-danger" />

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card bg-dark text-light border border-secondary rounded-4 shadow">
              <div className="card-body">
                <h4 className="text-center text-danger text-uppercase mb-4">Blood Donation Request</h4>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="bloodGroup" className="form-label fw-semibold">
                      Blood Group
                    </label>
                    <select
                      id="bloodGroup"
                      className="form-control bg-dark text-light border-secondary"
                      value={bloodGroup}
                      onChange={(e) => setBloodGroup(e.target.value)}
                      required
                    >
                      <option value="">Select Blood Group</option>
                      {bloodGroups.map((group) => (
                        <option key={group} value={group}>
                          {group}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="reason" className="form-label fw-semibold">
                      Reason for Request
                    </label>
                    <input
                      type="text"
                      id="reason"
                      className="form-control bg-dark text-light border-secondary"
                      value={requestReason}
                      onChange={(e) => setRequestReason(e.target.value)}
                      placeholder="Enter reason"
                      required
                    />
                  </div>
                  <div className="text-center mt-4">
                    <button type="submit" className="btn btn-danger px-4">
                      Send Request
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RequestDonor;
