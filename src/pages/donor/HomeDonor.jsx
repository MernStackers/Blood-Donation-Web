import React, { useState, useEffect } from 'react';
import { Navbar, Footer } from '../../components';
import { Modal, Button, Form } from 'react-bootstrap';
import WhatsAppAlert from '../WhatsappBlock';
const HomeDonor = ({ successMessage }) => {
  const [username, setUsername] = useState('');
  const [requests, setRequests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [donorDetails, setDonorDetails] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const decoded = JSON.parse(atob(token.split('.')[1]));
      const email = decoded.email;

      const res = await fetch(`http://localhost:5000/api/donors/by-email/${email}`);
      const userData = await res.json();
      setUsername(userData.username || userData.name);
    };

    const fetchRequests = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const decoded = JSON.parse(atob(token.split('.')[1]));
      const donorId = decoded.id;

      const res = await fetch(`http://localhost:5000/api/requests?donorId=${donorId}`);
      const data = await res.json();
      setRequests(data);
    };

    fetchUserInfo();
    fetchRequests();
  }, []);

  const acceptRequest = (request) => {
    setSelectedRequest(request);
    setDonorDetails({
      name: request.donor?.name || '',
      email: request.donor?.email || '',
      phone: request.donor?.phone || '',
    });
    setShowModal(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/accepted-donors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: donorDetails.name,
        email: donorDetails.email,
        phone: donorDetails.phone,
        bloodGroup: selectedRequest.bloodGroup,
        requestId: selectedRequest._id,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === data.updatedRequest._id
            ? { ...request, status: "Accepted" }
            : request
        )
      );
      setShowModal(false);
    } else {
      console.error("Error saving donor data");
    }
  };

  const rejectRequest = async (requestId) => {
    const res = await fetch(`http://localhost:5000/api/requests/reject/${requestId}`, {
      method: 'PATCH',
    });

    if (res.ok) {
      const updatedRequest = await res.json();
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === updatedRequest._id
            ? { ...request, status: 'Rejected' }
            : request
        )
      );
    }
  };

  return (
    <div className="bg-black text-light min-vh-100">
      <Navbar username={username} homeColor="text-danger" />

      {successMessage && (
        <div className="container mt-3">
          <p className="text-center alert alert-success bg-success bg-opacity-75 text-white border-0 rounded">
            <strong>{successMessage}</strong>
          </p>
        </div>
      )}

      <div className="container py-5">
        <div className="row">
          {requests.length === 0 ? (
            <p className="text-center">No requests found.</p>
          ) : (
            requests.map((request, index) => (
              <article key={index} className="col-md-4 mb-4">
                <div className="card bg-dark text-white border border-secondary rounded-4 shadow h-100">
                  <div className="card-body d-flex flex-column justify-content-between">
                    <h5 className="card-title text-center text-uppercase mb-4 text-danger">
                      Blood Donation Request
                    </h5>
                    <ul className="list-unstyled">
                      <li><strong>Blood Group:</strong> {request.bloodGroup}</li>
                      <li><strong>Reason:</strong> {request.reason}</li>
                      <li><strong>Status:</strong> {request.status}</li>
                    </ul>
                    {request.status !== 'Accepted' && request.status !== 'Rejected' && (
                      <div className="d-flex justify-content-between mt-3">
                        <button
                          className="btn btn-danger"
                          onClick={() => acceptRequest(request)}
                        >
                          Accept
                        </button>
                        <button
                          className="btn btn-outline-light"
                          onClick={() => rejectRequest(request._id)}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className="bg-dark text-white border-0">
          <Modal.Title>Donor Information</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={donorDetails.name}
                onChange={(e) => setDonorDetails({ ...donorDetails, name: e.target.value })}
                required
                className="bg-dark text-light border-secondary"
              />
            </Form.Group>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={donorDetails.email}
                onChange={(e) => setDonorDetails({ ...donorDetails, email: e.target.value })}
                required
                className="bg-dark text-light border-secondary"
              />
            </Form.Group>
            <Form.Group controlId="formPhone" className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                value={donorDetails.phone}
                onChange={(e) => setDonorDetails({ ...donorDetails, phone: e.target.value })}
                required
                className="bg-dark text-light border-secondary"
              />
            </Form.Group>
            <div className="text-end">
              <Button variant="danger" type="submit">
                Accept Request
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <WhatsAppAlert/>

      <Footer />
    </div>
  );
};

export default HomeDonor;
