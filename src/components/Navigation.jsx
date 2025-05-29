import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from '.';
import { logo1 } from '../assets/img';

const Navigation = ({
  homeColor,
  sentRequestsColor,
  acceptedRequestsColor,
  aboutTeamColor,
  contactTeamColor,
  profileColor,
}) => {
  const defaultTextColor = 'text-white'; // Bootstrap class

  const username = localStorage.getItem('username') || 'Guest';

  return (
    <div>
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
                <Link className={`nav-link ps-3 pe-1 ${homeColor || defaultTextColor}`} to="/request-donor">
                  <i className="fa-solid fa-house p-1 text-danger"></i>Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ps-3 pe-1 ${sentRequestsColor || defaultTextColor}`} to="/sent-requests">
                  <i className="fa-solid fa-list p-1 text-danger"></i>Sent Requests
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ps-3 pe-1 ${acceptedRequestsColor || defaultTextColor}`} to="/accepted-requests">
                  <i className="fa-solid fa-calendar-check p-1 text-danger"></i>Accepted Requests
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ps-3 pe-1 ${aboutTeamColor || defaultTextColor}`} to="/about-team">
                  <i className="fa-solid fa-info p-1 text-danger"></i>About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ps-3 pe-1 ${contactTeamColor || defaultTextColor}`} to="/donor-list">
                  <i className="fa-solid fa-users p-1 text-danger"></i>Donor List
                </Link>
              </li>
            </ul>

            <ul className="navbar-nav ms-auto">
              <Dropdown
                username={username}
                defaultTextColor="white"
                profileColor={profileColor}
                profileRoute="/profile-staff"
              />
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
