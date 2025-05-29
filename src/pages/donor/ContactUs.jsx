import React from 'react';
import { ContactInfo, Footer, Navbar } from '../../components';
import WhatsAppAlert from '../WhatsappBlock';

function ContactTeam() {
  return (
    <div className="bg-black text-light">
      {/* Navbar with active highlight */}
      <Navbar contactUsColor="text-danger" />

      {/* Hero Section */}
      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          height: '280px',
          backgroundImage: 'url(/assets/img/contact-banner.jpg)', // Replace with your image
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <h1 className="text-white text-uppercase fw-bold bg-dark bg-opacity-75 px-4 py-2 rounded">
          Contact Our Team
        </h1>
      </div>

      {/* Contact Form Section */}
      <div className="py-5">
        <ContactInfo />
      </div>

      {/* Map & Location Section */}
      <div className="container py-5">
        <h2 className="text-danger text-center fw-bold mb-3">Need Blood Urgently?</h2>
        <p className="text-center fs-5 mb-4">
          Here’s our location — visit us for immediate assistance or consultation.
        </p>
        <div className="mx-auto" style={{ width: '100%', maxWidth: '900px', height: '400px' }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.3773156595803!2d74.28704200907882!3d31.458805274134747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919059fd1a3011b%3A0x6d90bd51bb107d9b!2sDr.%20Fahmina%20Ashfaq%20-%20Sugar%2C%20Medical%20%26%20Blood%20Pressure%20Specialist%20Lady%20Doctor!5e0!3m2!1sen!2s!4v1746530030918!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Our Location"
          ></iframe>
        </div>
      </div>

      {/* Call Prompt */}
      <div className="text-center py-4 bg-dark border-top border-danger">
        <h4 className="text-danger fw-bold mb-2">Prefer Calling?</h4>
        <p className="fs-5">📞 +92 300 1234567</p>
        <p className="mb-0">We’re available 24/7 to assist with blood donations and requests.</p>
      </div>
  <WhatsAppAlert/>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default ContactTeam;
