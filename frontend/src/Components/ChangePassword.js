import React, { useState } from 'react';
import axios from 'axios';

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      if (newPassword !== confirmPassword) {
        setMessage('Passwords do not match');
        return;
      }

      const response = await axios.post(
        'http://localhost:8081/password',
        { oldPassword, newPassword },
        { withCredentials: true }
        
      );

      if (response.status === 200) {
        setMessage('Password changed successfully');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      setMessage('Failed to change password');
    }
  };

  return (
    <div className="container" style={{marginTop:'150px', width:'40%', marginBottom:'45px'}}>
      <h2 className="mb-4">Change Password</h2>
      {message && <div className="alert alert-danger">{message}</div>}
      <form onSubmit={handleChangePassword}>
        <div className="mb-3">
          <label htmlFor="oldPassword" className="form-label">Old Password:</label>
          <input
            type="password"
            className="form-control"
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">New Password:</label>
          <input
            type="password"
            className="form-control"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Change Password</button>
      </form>
    </div>
  );
}

export default ChangePassword;
