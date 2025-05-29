import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import { Navigation } from '../../components';

const DonorList = () => {
  const [donors, setDonors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState(null);

  useEffect(() => {
    const fetchDonors = async () => {
      const response = await fetch('http://localhost:5000/api/donors');
      const data = await response.json();
      setDonors(data);
    };

    fetchDonors();
  }, []);

  const handleDelete = async (donorId) => {
    const response = await fetch(`http://localhost:5000/api/donors/${donorId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setDonors(donors.filter((donor) => donor._id !== donorId));
    } else {
      console.error('Failed to delete donor');
    }
  };

  const handleView = (donor) => {
    setSelectedDonor(donor);
    setShowModal(true);
  };

  return (
    <div className="bg-black text-light min-vh-100 pb-5">
      <Navigation donorListColor="text-danger" />
      <div className="container mt-5">
        <h1 className="text-center text-danger fw-bold mb-4">Registered Donors</h1>
        <Table striped bordered hover variant="dark" responsive className="rounded shadow">
          <thead className="table-danger text-center">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Blood Group</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-center align-middle">
            {donors.map((donor) => (
              <tr key={donor._id}>
                <td>{donor.name}</td>
                <td>{donor.email}</td>
                <td>{donor.phone}</td>
                <td>{donor.blood_type}</td>
                <td>
                  <Button variant="outline-light" size="sm" onClick={() => handleView(donor)}>View</Button>{' '}
                  <Button variant="outline-danger" size="sm" onClick={() => handleDelete(donor._id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Donor Details Modal */}
      {selectedDonor && (
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          centered
          backdrop="static"
          className="text-light"
        >
          <Modal.Header closeButton className="bg-danger text-white">
            <Modal.Title>{selectedDonor.name}'s Details</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-dark">
            <Form>
              <Form.Group className="mb-3">
                <Form.Label className="text-white">Name</Form.Label>
                <Form.Control type="text" readOnly value={selectedDonor.name} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="text-white">Email</Form.Label>
                <Form.Control type="email" readOnly value={selectedDonor.email} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="text-white">Phone</Form.Label>
                <Form.Control type="text" readOnly value={selectedDonor.phone} />
              </Form.Group>
              <Form.Group>
                <Form.Label className="text-white">Blood Group</Form.Label>
                <Form.Control type="text" readOnly value={selectedDonor.blood_type} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer className="bg-dark">
            <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default DonorList;
