import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './products.css';
import Sidebar from './Sidebar';
import Nav from './Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router-dom';

function Products() {
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    product_id: '',
    product_name: '',
    category: '',
    description: '',
    price: '',
    file: null
  });

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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (event) => {
    setProduct({ ...product, file: event.target.files[0] });
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('product_id', product.product_id);
    formData.append('product_name', product.product_name);
    formData.append('category', product.category)
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('image', product.file);
  
    axios.post('http://localhost:8081/upload', formData)
      .then(res => {
        if (res.data.Status === "Success") {
          console.log("Succeeded");
          // Clear the form fields
          setProduct({
            product_id: '',
            product_name: '',
            category: '',
            description: '',
            price: '',
            file: null
          });
        } else {
          console.log("Failed");
        }
      })
      .catch(err => console.log(err));
  };
  
  return (
    <div className='container-fluid bg-secondary min-vh-100'>
      <div className='row'>
        <Nav />
        <div className='col-12 col-md-3 col-lg-2 bg-white vh-100 position-fixed'>                
          <Sidebar />        
        </div>
        <div className='container' style={{ marginLeft: '270px' }}>
          <h2>Add New Product</h2>
          <div className="form-group">
            <label htmlFor="product_id">Product ID:</label>
            <input
              type="text"
              id="product_id"
              name="product_id"
              value={product.product_id}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>      
          <div className="form-group">
            <label htmlFor="product_name">Product Name:</label>
            <input
              type="text"
              id="product_name"
              name="product_name"
              value={product.product_name}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              name="category"
              value={product.category}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div> 
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input
              type="text"
              id="price"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div> 
          <div className="form-group">
            <label htmlFor="file">Image:</label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleFileChange}
              className="form-control"
              required
            />
          </div> 
          <button onClick={handleUpload} className="btn btn-primary">Upload</button>
        </div>
      </div>
    </div>
  );
}

export default Products;
