import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import Nav from './Nav';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const MessagesPage = () => {
  const [userRole, setUserRole] = useState(null);
  const [messages, setMessages] = useState([]);
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
      fetchMessages();
    }
  }, [userRole]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:8081/messages');
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
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
        <div className='col-12 col-md-9 col-lg-10'>
          <div className='row g-3 my-2'>
            <div className='container-c' style={{ marginLeft: '300px' }}>
              <h2 className="mt-3">Messages from Users</h2>
              {messages.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th className="col-3">Name</th>
                        <th className="col-3">Email</th>
                        <th className="col-4">Message</th>
                        <th className="col-2">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {messages.map((message, index) => (
                        <tr key={index}>
                          <td className="col-3">{message.name}</td>
                          <td className="col-3">{message.email}</td>
                          <td className="col-4">{message.message}</td>
                          <td className="col-2">{message.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No messages found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
