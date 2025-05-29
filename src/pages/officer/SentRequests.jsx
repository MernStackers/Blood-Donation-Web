import React, { useState, useEffect } from 'react';
import { Footer, Navigation } from '../../components';

const SentRequests = () => {
  const [sentRequests, setSentRequests] = useState([]);

  useEffect(() => {
    const fetchSentRequests = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const decoded = JSON.parse(atob(token.split('.')[1]));
      const staffId = decoded.id;

      const res = await fetch(`http://localhost:5000/api/requests?staffId=${staffId}`);
      const data = await res.json();
      setSentRequests(data);
    };

    fetchSentRequests();
  }, []);

  return (
    <div className="bg-black text-light min-vh-100">
      <Navigation username="Mike Junior" sentRequestsColor="text-danger" />

      <div className="container py-5">
        <h2 className="text-center text-danger fw-bold mb-5">Your Sent Blood Requests</h2>
        <div className="row">
          {sentRequests.length > 0 ? (
            sentRequests.map((request, index) => (
              <article key={index} className="col-md-4 mb-4">
                <div className="card bg-dark text-light border border-secondary rounded-4 shadow h-100">
                  <div className="card-body d-flex flex-column justify-content-between">
                    <h5 className="card-title text-center text-uppercase text-danger mb-3">Blood Request</h5>
                    <ul className="list-unstyled">
                      <li><strong>Blood Group:</strong> {request.bloodGroup}</li>
                      <li><strong>Reason:</strong> {request.reason}</li>
                      <li><strong>Status:</strong> <span className={`fw-bold ${request.status === 'Accepted' ? 'text-success' : request.status === 'Rejected' ? 'text-danger' : 'text-warning'}`}>{request.status}</span></li>
                    </ul>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <p className="text-center fs-5 mt-5">No requests sent yet.</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SentRequests;
