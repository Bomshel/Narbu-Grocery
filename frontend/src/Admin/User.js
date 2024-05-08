import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import Nav from './Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router-dom';

function User() {
  const [userRole, setUserRole] = useState(null);
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    full_name: '',
    email: '',
    role: '',
    password: ''
  });
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
      fetchUsers();
    }
  }, [userRole]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8081/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/users', newUser);
      console.log('New user added successfully:', response.data);
      setNewUser({
        full_name: '',
        email: '',
        role: '',
        password: ''
      });
      setUsers([...users, response.data]);
    } catch (error) {
      console.error('Error adding new user:', error);
    }
  };

  const handleEditUser = async (userId) => {
    console.log('Edit user:', userId);
  };

  const handleRemoveUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8081/users/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
      console.log('User removed successfully:', userId);
    } catch (error) {
      console.error('Error removing user:', error);
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
        <div className='user' style={{ marginLeft: '300px', width: '70%' }}>
          <div className='mt-3'>
            <form onSubmit={handleSubmit} style={{ marginLeft: '300px' }}>
              <h2>Add New User</h2>
              <div className='mb-3' style={{ width: '70%' }}>
                <label htmlFor='full_name' className='form-label'>Full Name:</label>
                <input
                  type='text'
                  id='full_name'
                  name='full_name'
                  value={newUser.full_name}
                  onChange={handleInputChange}
                  className='form-control'
                  required
                />
              </div>
              <div className='mb-3' style={{ width: '70%' }}>
                <label htmlFor='email' className='form-label'>Email:</label>
                <input
                  type='text'
                  id='email'
                  name='email'
                  value={newUser.email}
                  onChange={handleInputChange}
                  className='form-control'
                  required
                />
              </div>
              <div className='mb-3' style={{ width: '70%' }}>
                <label htmlFor='role' className='form-label'>Role:</label>
                <input
                  type='text'
                  id='role'
                  name='role'
                  value={newUser.role}
                  onChange={handleInputChange}
                  className='form-control'
                  required
                />
              </div>
              <div className='mb-3' style={{ width: '70%' }}>
                <label htmlFor='password' className='form-label'>Password:</label>
                <input
                  type='password'
                  id='password'
                  name='password'
                  value={newUser.password}
                  onChange={handleInputChange}
                  className='form-control'
                  required
                />
              </div>
              <button type='submit' className='btn btn-primary' style={{ width: '70%' }}>Add User</button>
            </form>

            <h2 className='user' style={{ marginTop: '50px', marginLeft: '120px' }}>User List</h2>
            <table className='table table-striped' style={{ marginLeft: '80px' }}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.full_name}</td>
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
}

export default User;
