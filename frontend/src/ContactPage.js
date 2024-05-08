import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhoneAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './css/Contact.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8081/contact', formData);
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="contact-container" style={{marginTop:'80px'}}>
      <div className="contact-form">
        <p className="form-heading">Contact Us</p> 
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="name" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange}required />
          </div>
          <button type="submit">Send</button>
        </form>
      </div>
      <div className="contact-info">
        <p>Have questions?</p>
        <p>Shoot us an <span className='highlight'>Email.</span></p>
        <h2 className='inf'>Our Contact Information</h2> 

        <div className="info-item">
          <FontAwesomeIcon icon={faEnvelope} className="icon" />
          <span>Email: narbugrocery@gmail.com</span>
        </div>
        <div className="info-item">
          <FontAwesomeIcon icon={faPhoneAlt} className="icon" />
          <span>Phone: +977 9804964820</span>
        </div>
        <div className="info-item">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
          <span>Address: Naxal, Kathmandu, Nepal</span>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
