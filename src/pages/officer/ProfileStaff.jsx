import React, { useEffect, useState } from 'react';
import { Footer, Navigation } from '../../components';
import { splash1 } from '../../assets/img';
import { useNavigate } from 'react-router-dom';

const ProfileStaff = () => {
  const navigate = useNavigate();
  const [staff, setStaff] = useState(null);

  useEffect(() => {
    try {
      const staffData = localStorage.getItem("staff");
      if (staffData && staffData !== "undefined") {
        setStaff(JSON.parse(staffData));
      } else {
        throw new Error("Invalid or missing staff data");
      }
    } catch (err) {
      console.error("Error parsing staff data:", err);
      navigate("/login-staff");
    }
  }, [navigate]);

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This cannot be undone.")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/staff/${staff._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Account deleted successfully.");
        localStorage.clear();
        navigate("/register-staff");
      } else {
        const error = await response.json();
        alert(error.message || "Failed to delete account.");
      }
    } catch (err) {
      alert("Server error during account deletion.");
    }
  };

  if (!staff) return <p className="text-center text-light mt-5">Loading profile...</p>;

  return (
    <div className="bg-black text-light min-vh-100">
      <Navigation username={staff.fullName} profileColor="text-danger" />

      <section className="container py-5">
        <div className="row">
          {/* Profile Card */}
          <div className="col-lg-4 mb-4">
            <div className="card bg-dark text-light border-secondary shadow text-center">
              <div className="card-body">
                <img src={splash1} alt="avatar" className="rounded-circle img-fluid mb-3" style={{ width: '150px' }} />
                <h5 className="fw-bold">{staff.fullName}</h5>
                <p className="text-muted">{staff.address}</p>
                <button className="btn btn-danger mt-3" onClick={handleDeleteAccount}>
                  Delete My Account
                </button>
              </div>
            </div>
          </div>

          {/* Info Card */}
          <div className="col-lg-8 mb-4">
            <div className="card bg-dark text-light border-secondary shadow">
              <div className="card-body">
                {[
                  ['Full Name', staff.fullName],
                  ['Email', staff.email],
                  ['Phone', staff.phone],
                  ['Address', staff.address],
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

      <Footer />
    </div>
  );
};

export default ProfileStaff;
