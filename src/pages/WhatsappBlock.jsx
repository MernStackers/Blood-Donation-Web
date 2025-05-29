import React from 'react';

const WhatsAppAlert = ({ phone = "+923317398708", message = "Hi, I need help with blood donation." }) => {
  const whatsappLink = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        zIndex: 9999,
        backgroundColor: '#25D366',
        color: 'white',
        padding: '12px 18px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      <i className="fab fa-whatsapp fa-lg"></i>
      <span>Need help?</span>
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-sm btn-light text-success fw-bold"
        style={{ padding: '2px 10px', borderRadius: '5px' }}
      >
        Chat Now
      </a>
    </div>
  );
};

export default WhatsAppAlert;
