import React from 'react';
import { Navbar, Footer, AboutTeam } from '../../components';
import WhatsAppAlert from '../WhatsappBlock';

const AboutUs = () => {
  return (
    <div className="bg-black text-white">
      {/* Themed Navbar */}
      <Navbar username="John Doe" aboutUsColor="text-danger" />

      {/* Optional: Hero Carousel or Banner */}
      <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                height: '300px',
                backgroundImage: 'url(/assets/img/blood-banner.jpg)', // update path accordingly
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <h1 className="text-white text-uppercase fw-bold bg-dark bg-opacity-50 p-3 rounded">
                About Us
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section with red headers */}
      <AboutTeam />

      <WhatsAppAlert/>

      {/* Themed Footer */}
      <Footer />
    </div>
  );
};

export default AboutUs;
