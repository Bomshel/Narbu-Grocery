import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useHistory hook for navigation
import '../css/Profile.css'; // Import CSS file for styling

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:8081/profile', { withCredentials: true });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:8081/logout'); // Destroy session on the server
        setUser(null); 
        navigate('/home'); // Navigate user to the home page
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (!user) {
    return <div className="loading">
        <h1> You are not logged in yet.</h1>
        <a href='/' className='link'>Login</a>
    </div>;
  }

  return (
    <div className="profile-container">
      <h2 className="profile-title">User Profile</h2>
      <div className="profile-details">
        <p><span className="detail-label">Name:</span> {user.full_name}</p>
        <p><span className="detail-label">Email:</span> {user.email}</p>
      </div>
      <div className="profile-introduction">
        <h3>Introduction</h3>
        <p>Welcome to your profile page, {user.full_name}!</p>
        <p>This is where you can manage your account settings and view your shopping history.</p>
      </div>
      <div className="profile-actions">
      <Link to='/check-histrory'>
        <button className="butn">Check Shopping history</button></Link>
        <Link to='/change-password' >
        <button className="butn">Change Password</button>
        </Link>
        <button className="profile-action-btn" onClick={handleLogout}>Logout</button> 
      </div>
    </div>
  );
};

export default Profile;
