import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Footer } from '../../components';
import { splash1 } from '../../assets/img';
import WhatsAppAlert from '../WhatsappBlock';

const ProfileDonor = () => {
  const [donor, setDonor] = useState(null);
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/donors/${donor._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Account deleted successfully.");
        localStorage.clear();
        navigate("/register-donor");
      } else {
        const error = await response.json();
        alert(error.message || "Failed to delete account.");
      }
    } catch (err) {
      alert("Server error. Please try again.");
    }
  };

  useEffect(() => {
    const donorData = localStorage.getItem("donor");
    if (donorData) {
      setDonor(JSON.parse(donorData));
    } else {
      navigate("/login-donor");
    }
  }, [navigate]);

  if (!donor) return <p className="text-center mt-5 text-light">Loading profile...</p>;

  return (
    <div className="bg-black text-light min-vh-100">
      <Navbar username={donor.fullName} profileColor="text-danger" />

      {sessionStorage.getItem('success') && (
        <div className="container mt-3">
          <p className="text-center alert alert-success bg-success bg-opacity-75 text-white border-0 rounded">
            <strong>{sessionStorage.getItem('success')}</strong>
          </p>
        </div>
      )}

      <section className="container py-5">
        <div className="row">
          <div className="col-lg-4 mb-4">
            <div className="card bg-dark text-light border-secondary shadow text-center">
              <div className="card-body">
                <img src={splash1} alt="avatar" className="rounded-circle img-fluid mb-3" style={{ width: "150px" }} />
                <h5 className="fw-bold">{donor.fullName}</h5>
                <p className="text-muted">{donor.birthdate}</p>
                <p className="text-muted">{donor.address}</p>
                <button onClick={handleDeleteAccount} className="btn btn-danger mt-3">
                  Delete My Account
                </button>
              </div>
            </div>
          </div>

          <div className="col-lg-8 mb-4">
            <div className="card bg-dark text-light border-secondary shadow">
              <div className="card-body">
                {[
                  ['Full Name', donor.fullName],
                  ['Email', donor.email],
                  ['Phone', donor.phone],
                  ['Gender', donor.gender],
                  ['Blood Type', donor.blood_type],
                ].map(([label, value]) => (
                  <React.Fragment key={label}>
                    <div className="row py-2">
                      <div className="col-sm-3">
                        <p className="mb-0 fw-semibold">{label}</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-light mb-0">{value}</p>
                      </div>
                    </div>
                    <hr className="border-secondary" />
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
   <WhatsAppAlert/>
      <Footer />
    </div>
  );
};

export default ProfileDonor;
