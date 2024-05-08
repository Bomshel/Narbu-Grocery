import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from './Nav';
import Admin from './AdminPannel';

function Home({ Toggle }) {
  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:8081/')
      .then((response) => {
        setProductCount(response.data.length);
      })
      .catch((error) => {
        console.error('Error fetching product count:', error);
      });

    axios.get('http://localhost:8081/users')
      .then((response) => {
        const users = response.data;
        const nullRoleUsers = users.filter(user => user.role !== Admin);
        setUserCount(nullRoleUsers.length);
      })
      .catch((error) => {
        console.error('Error fetching user count:', error);
      });
  }, []);

  return (
    <div className='px-3'>
      <Nav Toggle={Toggle} />
      <div className='container-fluid'>
        <div className='row g-3 my-2'>
          <div className='col-md-3 p-1'>
            <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
              <div>
                <h3 className='fs-2'>{productCount}</h3>
                <p className='fs-5'>Products</p>
              </div>
              <i className='bi bi-cart-plus p-3 fs-1'></i>
            </div>
          </div>
          <div className='col-md-3 p-1'>
            <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
              <div>
                <h3 className='fs-2'>{userCount}</h3>
                <p className='fs-5'>Customer</p>
              </div>
              <i className='bi bi-person p-3 fs-1'></i>
            </div>
          </div>
          <div className='col-md-3 p-1'>
            <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
              <div>
                <h3 className='fs-2'>2250</h3>
                <p className='fs-5'>Delivery</p>
              </div>
              <i className='bi bi-truck p-3 fs-1'></i>
            </div>
          </div>
          <div className='col-md-3 p-1'>
            <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
              <div>
                <h3 className='fs-2'>20%</h3>
                <p className='fs-5'>Increase</p>
              </div>
              <i className='bi bi-graph-up-arrow p-3 fs-1'></i>
            </div>
          </div>
        </div>
      </div>
      <div className='container mt-2'>
        <table className="table caption-top bg-white rounded">
          <caption style={{color:'black', fontSize:'23px'}}>Recent Orders</caption>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
              <th scope="col">Order_id</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(1)].map((_, index) => (
              <tr key={index + 1}>
                <th scope="row">{index + 1}</th>
                <td>Ram Kumar</td>
                <td>980787000</td>
                <td>Maitidevi Kathmandu</td> 
                <td>Ord_012</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
