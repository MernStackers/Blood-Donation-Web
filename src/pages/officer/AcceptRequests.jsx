import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Footer, Navigation } from '../../components';

const AcceptRequests = () => {
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [selectedDonorInfo, setSelectedDonorInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchAcceptedRequests = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const decoded = JSON.parse(atob(token.split('.')[1]));
      const staffId = decoded.id;

      try {
        const res = await fetch(`http://localhost:5000/api/requests?staffId=${staffId}`);
        const data = await res.json();
        const accepted = data.filter(request => request.status === 'Accepted');
        setAcceptedRequests(accepted);
      } catch (error) {
        console.error("Error fetching accepted requests:", error);
      }
    };

    fetchAcceptedRequests();
  }, []);

  const handleShowDonorInfo = async (requestId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/accepted-donors/${requestId}`);
      const donorData = await res.json();
      setSelectedDonorInfo(donorData);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching donor info:", error);
    }
  };

  return (
    <div className="bg-black text-light min-vh-100">
      <Navigation username="Mike Junior" acceptedRequestsColor="text-danger" />

      <div className="container py-5">
        <h2 className="text-danger fw-bold text-center mb-4">Accepted Requests</h2>
        <div className="row">
          {acceptedRequests.length > 0 ? (
            acceptedRequests.map((request, index) => (
              <article key={index} className="col-md-4 mb-4" onClick={() => handleShowDonorInfo(request._id)} style={{ cursor: 'pointer' }}>
                <div className="card bg-dark text-light border border-secondary rounded-4 shadow h-100">
                  <div className="card-body">
                    <h5 className="card-title text-center text-uppercase text-danger mb-4">
                      Blood Donation Accepted
                    </h5>
                    <ul className="list-unstyled">
                      <li><strong>Blood Group:</strong> {request.bloodGroup}</li>
                      <li><strong>Reason:</strong> {request.reason}</li>
                      <li><strong>Status:</strong> <span className="text-success fw-bold">{request.status}</span></li>
                    </ul>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <p className="text-center fs-5 mt-4">No accepted requests yet.</p>
          )}
        </div>
      </div>

      {/* Donor Info Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className="bg-dark text-white border-bottom border-secondary">
          <Modal.Title>Donor Information</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-light">
          {selectedDonorInfo ? (
            <div className="text-center">
              <h4 className="text-danger">{selectedDonorInfo.name}</h4>
              <p className="mb-2"><strong>Email:</strong> {selectedDonorInfo.email}</p>
              <p className="mb-2"><strong>Phone:</strong> {selectedDonorInfo.phone}</p>
              <p className="mb-0"><strong>Blood Group:</strong> {selectedDonorInfo.bloodGroup}</p>
            </div>
          ) : (
            <p>Loading donor info...</p>
          )}
        </Modal.Body>
        <Modal.Footer className="bg-dark border-top border-secondary">
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </div>
  );
};

export default AcceptRequests;
