import React from 'react';
import './css/Footer.css';

const Footer = () => {
  return (
    <div className='footer'>
        <footer>
        <p>&copy; 2023 Narbu Grocery. All rights reserved.</p>
        <p>Designed by: Prashant Khadka</p>
        <p>{new Date().getFullYear()}</p>
        </footer>
    </div>
  );
};

export default Footer;
