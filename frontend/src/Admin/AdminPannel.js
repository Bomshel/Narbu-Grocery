import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import Home from './Home';

function Admin() {
  const [userRole, setUserRole] = useState(null);
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.get('http://localhost:8081/profile', { withCredentials: true });
        setUserRole(response.data.role);
      } catch (error) {
        console.error('Error fetching user role:', error);
        // Redirect to login page if there's an error or user is not authenticated
        navigate('/');
      }
    };

    fetchUserRole();
  }, [navigate]);

  // If userRole is not "Admin", render a message indicating unauthorized access
  if (userRole !== 'Admin') {
    return (
      <div className="container mt-5">
        <h2 className="text-center">Unauthorized Access</h2>
        <p className="text-center">You are not authorized to access this page.</p>
      </div>
    );
  }

  const Toggle = () => {
    setToggle(!toggle);
  };

  return (
    <div className='container-fluid bg-secondary min-vh-100'>
      <div className='row'>
        {toggle && (
          <div className='col-4 col-md-2 bg-white vh-100 position-fixed'>
            <Sidebar />
          </div>
        )}
        {toggle && <div className='col-4 col-md-2'></div>}
        <div className='col'>
          <Home Toggle={Toggle} />
        </div>
      </div>
    </div>
  );
}

export default Admin;
