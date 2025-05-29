import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

// Import components for donor
import Home from './pages/Home';
import { HomeDonor, ProfileDonor, LoginDonor, RegisterDonor, ContactUs, AboutUs } from './pages/donor';
import { Appointments } from './pages/donor'; // Assuming 'Appointments' exists in the donor folder

// Import components for staff (officer)
import { RequestDonor, AcceptRequests, LoginStaff, RegisterStaff, SentRequests, ProfileStaff } from './pages/officer';
import { AboutTeams, ContactTeam } from './pages/officer';

// Import DonorList component
import DonorList from './pages/officer/DonorList'; // Make sure to adjust the path
import VerifyOtp from './pages/donor/VerifyOtp';

const App = () => {
  const [requests, setRequests] = useState([]);

  // Function to handle submission of new request
  const handleRequestSubmit = (request) => {
    setRequests((prevRequests) => [...prevRequests, request]);
  };

  // Function to handle accepting or rejecting a request
  const handleRequestAction = (index, action) => {
    const updatedRequests = [...requests];
    if (action === 'accept') {
      updatedRequests[index].status = 'Accepted';
    } else if (action === 'reject') {
      updatedRequests[index].status = 'Rejected';
    }
    setRequests(updatedRequests);
  };

  return (
    <BrowserRouter basename='/'>
      <Routes>
        {/* Donor Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/home-donor" element={<HomeDonor requests={requests} onRequestAction={handleRequestAction} />} />
        <Route path="/profile-donor" element={<ProfileDonor />} />
        <Route path="/login-donor" element={<LoginDonor />} />
        <Route path="/register-donor" element={<RegisterDonor />} />
        <Route path="/appointments-donor" element={<Appointments />} />
        <Route  path='/contact-us'   element={<ContactUs/>}/>
        <Route   path='/About-us' element={<AboutUs/>} />
        <Route  path='/verify-otp' element={<VerifyOtp/>} />

        {/* Staff (Officer) Routes */}
        <Route path="/request-donor" element={<RequestDonor onRequestSubmit={handleRequestSubmit} />} />
        <Route path="/accepted-requests" element={<AcceptRequests allRequests={requests} />} />
        <Route path="/login-staff" element={<LoginStaff />} />
        <Route path="/register-staff" element={<RegisterStaff />} />
        <Route path="/sent-requests" element={<SentRequests />} />
        <Route path="/about-team" element={<AboutTeams />} />
        <Route path="/profile-staff" element={<ProfileStaff />} />
        <Route path="/contact-team" element={<ContactTeam />} />

        {/* Donor List Route for staff */}
        <Route path="/donor-list" element={<DonorList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
