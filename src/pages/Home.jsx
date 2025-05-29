import React from 'react';
import { logo1 } from '../assets/img';
import { Link } from 'react-router-dom';
import WhatsAppAlert from './WhatsappBlock';

const Home = () => {
  return (
    <div className="text-center p-3 container-md">
      <div id="intro-example" className="text-center bg-image align-items-center">
        <section>
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-12 col-xl-11">
                <div
  className="card text-light background-image d-flex"
  style={{ borderRadius: '25px', minHeight: '600px' , boxShadow :'0 0 40px 10px grey' }}
>
  <div className="card-body w-100 d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
    <div className="text-center">
      <p className="h1 fw-bold mb-3 mx-1 mx-md-4 mt-3 text-uppercase">
        Welcome to the Blood donation platform.
      </p>
      <div className="col-md-10 col-lg-6 col-xl-5 mx-auto">
        <h5 className="mb-3">
          Join us to help others save lives and bring joy to families through your contribution of blood.
        </h5>
        <Link to="/login-donor" className="btn btn-outline-light btn-lg m-1" role="button" rel="nofollow">
          Login Donor
        </Link>
        <Link to="/login-staff" className="btn btn-outline-light btn-lg m-1" role="button">
          Login Staff
        </Link>
      </div>
    </div>
  </div>
</div>



              </div>
            </div>
          </div>
        </section>
      </div>
      <WhatsAppAlert/>
    </div>
  );
}

export default Home;
