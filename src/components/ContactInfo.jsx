import React, { useState } from 'react';

const ContactInfo = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const { name, email, subject, message } = formData;

    // Send form data to backend to trigger the email
    try {
      const response = await fetch('http://localhost:5000/api/contact/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, subject, message })
      });

      const result = await response.json();
      if (response.ok) {
        alert('Message sent successfully');
      } else {
        alert(result.message || 'Something went wrong!');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('There was an error sending the message');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card bg-dark text-light border-danger rounded-3 shadow">
            <div className="card-header bg-danger text-white fw-bold text-uppercase">
              Contact Us
            </div>
            <div className="card-body">
              <h5 className="card-title">Feel free to reach out to us. Our team is ready to assist you.</h5>
              <form id="contact-form" onSubmit={handleSubmit}>
                <div className="row mb-4">
                  <div className="col-md-6">
                    <div className="md-form">
                      <label htmlFor="name" className="form-label">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control bg-dark text-light border-secondary"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="md-form">
                      <label htmlFor="email" className="form-label">Your Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control bg-dark text-light border-secondary"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col-md-12">
                    <div className="md-form">
                      <label htmlFor="subject" className="form-label">Subject</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        className="form-control bg-dark text-light border-secondary"
                        value={formData.subject}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col-md-12">
                    <div className="md-form">
                      <label htmlFor="message" className="form-label">Your Message</label>
                      <textarea
                        id="message"
                        name="message"
                        rows="4"
                        className="form-control bg-dark text-light border-secondary"
                        value={formData.message}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="text-center text-md-left">
                  <button className="btn btn-danger px-4">Send Message</button>
                </div>
              </form>
            </div>

            <div className="card-footer text-center border-top border-danger">
              <ul className="list-inline mb-0">
                <li className="list-inline-item me-4">
                  <i className="fas fa-map-marker-alt fa-2x text-danger"></i>
                  <p className="text-light">San Francisco, CA 94126, USA</p>
                </li>
                <li className="list-inline-item me-4">
                  <i className="fas fa-phone fa-2x text-danger"></i>
                  <p className="text-light">+01 234 567 89</p>
                </li>
                <li className="list-inline-item">
                  <i className="fas fa-envelope fa-2x text-danger"></i>
                  <p className="text-light">contact@yourwebsite.com</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
