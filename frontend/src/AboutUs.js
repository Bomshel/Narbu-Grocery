import React from 'react';
import logo from './img/logo.png';
import about from './img/about.png';

const AboutUsPage = () => {
  return (
    <div className="container" style={{ marginTop: '100px' }}> 
      <div className="row">
        <div className="col-md-6">
          <img src={logo} alt="Grocery Store" className="img-fluid mb-3 rounded" />
          <p>
            Welcome to Narbu Grocery Store, your one-stop destination for all your grocery needs.
          </p>
        </div>
        <div className="col-md-6">
          <h2>About Our Grocery Store</h2>
          <h3>Our Mission</h3>
          <p>
            Our mission is to provide high-quality, fresh, and affordable groceries to our customers while delivering exceptional customer service.
          </p>
          <h3>Our History</h3>
          <p>
            Narbu Grocery Store was founded in 2023 by Narbu Tammang. Since then, we have been committed to serving our local community with the best selection of groceries and household essentials.
          </p>
          <h3>Our Team</h3>
          <img src={about} alt="Team" className="img-fluid mb-3 rounded" />
          <p>
            At Narbu Grocery Store, we have a dedicated team of professionals who are passionate about delivering the best shopping experience to our customers. From our knowledgeable staff to our friendly customer service representatives, every member of our team plays a vital role in our success.
          </p>
          <h3>Visit Us</h3>
          <p>
            Come visit us at Naxal, Kathmandu and experience the difference at Narbu Grocery Store.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
