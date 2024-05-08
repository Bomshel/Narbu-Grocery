import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import Nav from './Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './style.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Report = () => {
  const [userRole, setUserRole] = useState(null);
  const [salesData, setSalesData] = useState([]);
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate(); // Initialize navigate function

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

  useEffect(() => {
    if (userRole === 'Admin') {
      fetchSalesData();
      fetchUserData();
    }
  }, [userRole]);

  const fetchSalesData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/sales');
      setSalesData(response.data);
    } catch (error) {
      console.error('Error fetching sales data:', error);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/users');
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  if (userRole !== 'Admin') {
    return (
      <div className="container mt-5">
        <h2 className="text-center">Unauthorized Access</h2>
        <p className="text-center">You are not authorized to access this page.</p>
      </div>
    );
  }

  return (
    <div className='container-fluid bg-secondary min-vh-100'>
      <div className='row'>
        <Nav />
        <div className='col-12 col-md-3 col-lg-2 bg-white vh-100 position-fixed'>
          <Sidebar />
        </div>
        <div className="container" style={{ marginLeft: '250px' }}>
          <h2 className="mb-4">Report Page</h2>

          <div className="mb-4">
            <h3>Sales Data</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Quantity Sold</th>
                  <th>Total Revenue</th>
                </tr>
              </thead>
              <tbody>
                {salesData.map(sale => (
                  <tr key={sale.id}>
                    <td>{sale.productName}</td>
                    <td>{sale.quantitySold}</td>
                    <td>{sale.totalRevenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <h3>User Data</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {userData.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
