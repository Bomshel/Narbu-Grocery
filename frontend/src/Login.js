import React, { useState, useEffect } from 'react';
import {  Link, useNavigate } from 'react-router-dom'; 
import './css/LoginForm.css';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import axios from 'axios';
import validation from './LoginValidation';

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  
  })

const navigate = useNavigate();
  const [errors, setErrors] = useState({})

axios.defaults.withCredentials = true;
useEffect(() =>{
  axios.get('http://localhost:8081/session')
  .then(res => {
      if(res.data.valid){
          navigate('/home')
      } else{
          navigate('/')
      }
  })
  .catch(err => console.log(err))
}, [])
  const handleInput = (event) => {
    setValues(prev => ({...prev, [event.target.name] : [event.target.value] }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validation(values));
    
    if (Object.keys(errors).length === 0) {
      axios.post('http://localhost:8081/login', values)
        .then((res) => {
          if (res.data.message === "Success") {
            if (res.data.role === "Admin") {
              navigate('/admin');
            } else {
              navigate('/home');
            }
          } else {
            alert("Invalid email or password. Please try again.");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="page">
      <div className='login-form-container'>
        <h2>Login</h2>
        <form action="" onSubmit={handleSubmit}>
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
            {errors.email && <span>{errors.email}</span>}
          </div>

          <div className="input-box">
            <input
              type="password"
              name="password"
              placeholder="   Password"
              value={values.password}
              onChange={handleInput} required/>
            <FaLock className="icon" />
            {errors.password && <span>{errors.password}</span>}

          </div>
          <button type="submit">Login</button>

          <div className="register-link">
            <p>Don't have an account? <Link to="/register"> Register </Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

