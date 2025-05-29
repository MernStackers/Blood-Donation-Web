import React from 'react';
import { ContactInfo, Footer, Navigation } from '../../components';

function ContactTeam() {
  return (
    <div>
      {/* Navbar */}
      <Navigation username={'Mike Junior'} contactTeamColor={'primary'} />

      {/* Carousel Section */}
      <div id="carouselExample" className="carousel">
        <div className="carousel-inner"></div>
      </div>

     

      {/* Contact Info */}
      <ContactInfo />


       {/* Map Section */}
      <center>
   <h1>Avail blood for your need and save your close peoples:</h1>
   <h3>Heres Our Location:</h3>
      <div style={{ width: '50%', height: '400px' , }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.3773156595803!2d74.28704200907882!3d31.458805274134747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919059fd1a3011b%3A0x6d90bd51bb107d9b!2sDr.%20Fahmina%20Ashfaq%20-%20Sugar%2C%20Medical%20%26%20Blood%20Pressure%20Specialist%20Lady%20Doctor!5e0!3m2!1sen!2s!4v1746530030918!5m2!1sen!2s"
          width="100%"
          height="100%"
          style={{ border: "0" }}
          loading="lazy"
          title="Google Map Location"
        ></iframe>
      </div>
      </center>
<center>
<h1>Or Contact Us from the phone number given below:</h1></center>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default ContactTeam;
