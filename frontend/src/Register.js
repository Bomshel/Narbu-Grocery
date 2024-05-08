import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import axios from 'axios';
import './css/RegisterForm.css'
import validation from './SignupValidation';

function Register() {
  const [values, setValues] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formErrors = validation(values);

    // Check if there are any errors
    if (Object.keys(formErrors).length === 0) {
      // If no errors, submit the form
      axios.post('http://localhost:8081/users', values)
        .then((_res) => {
          navigate('/');
        })
        .catch((err) => console.log(err));
    } else {
      // If there are errors, display alerts
      let alertMessage = '';
      Object.values(formErrors).forEach((error) => {
        alertMessage += error + '\n';
      });
      alert(alertMessage);
    }
  };

  return (
    <div className="page">
      <div className="register-form-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              type="name"
              name="full_name"
              placeholder="Full Name"
              value={values.full_name}
              onChange={handleInput}
              required
            />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={values.email}
              onChange={handleInput}
              required
            />
            <FaEnvelope className="icon" />
          </div>
          <div className="input-box">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={values.password}
              onChange={handleInput}
              required
            />
            <FaLock className="icon" />
          </div>
          <div className="input-box">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={values.confirmPassword}
              onChange={handleInput}
              required
            />
            <FaLock className="icon" />
          </div>
          <button type="submit">Register</button>

          <div className="login-link">
            <p>Already have an account? <Link to="/">Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
