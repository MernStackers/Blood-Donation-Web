// Navbar.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from '.';
import { logo1 } from '../assets/img';

const Navbar = ({ username,homeColor,appointmentsColor,aboutUsColor,contactUsColor,profileColor, }) => {


  
    const defaultTextColor = "white"; // default text color
    const handleSubmit = (event) => {
      event.preventDefault(); // Prevent the default form submission behavior
      // Optionally, you can add any other logic here, such as showing a message to the user
  };
  return (
    <div>
      <div className="text-center p-3 container-md">
     
      </div>
     <nav className="navbar navbar-expand-lg bg-dark">
  <div className="container-fluid">
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link
            className={`nav-link ps-3 pe-1 ${homeColor || "text-white"}`}
            aria-current="page"
            to="/home-donor"
          >
            <i className="fa-solid fa-house p-1 text-danger"></i>Home
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className={`nav-link ps-3 pe-1 ${aboutUsColor || "text-white"}`}
            to="/about-us"
          >
            <i className="fa-solid fa-info p-1 text-danger"></i>About Us
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className={`nav-link ps-3 pe-1 ${contactUsColor || "text-white"}`}
            to="/contact-us"
          >
            <i className="fa-solid fa-phone p-1 text-danger"></i>Contact Us
          </Link>
        </li>
      </ul>

      <ul className="navbar-nav ml-auto">
        <Dropdown
          username={username}
          defaultTextColor="white"
          profileColor={profileColor}
          profileRoute="/profile-donor"
        />
      </ul>
    </div>
  </div>
</nav>

    </div>
  );
};

export default Navbar;
