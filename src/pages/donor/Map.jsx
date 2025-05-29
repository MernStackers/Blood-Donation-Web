import React from 'react';

const Map = () => {
  return (
    <div>
      <h2>Our Location</h2>
      <iframe
        title="Google Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.3773156595803!2d74.28704200907882!3d31.458805274134747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919059fd1a3011b%3A0x6d90bd51bb107d9b!2sDr.%20Fahmina%20Ashfaq%20-%20Sugar%2C%20Medical%20%26%20Blood%20Pressure%20Specialist%20Lady"
        width="600"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default Map;
