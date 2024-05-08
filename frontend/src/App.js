import React, { useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Header from './Header';
import MayShow from './MayShow';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';
import ContactPage from './ContactPage';
import HomePage from './HomePage';
import OfferPage from './OfferPage';
import AboutUsPage from './AboutUs';
import AdminPannel from './Admin/AdminPannel';
import Home from './Admin/Home';
import Nav from './Admin/Nav';
import Sidebar from './Admin/Sidebar';
import ProductPage from './Admin/products';
import Report from './Admin/Report';
import User from './Admin/User';
import ProductList from './Components/ProductList';
import Cart from './Components/Cart';
import Query from './Admin/Query';
import Profile from './Components/Profile';
import ChangePassword from './Components/ChangePassword';

function App() {
  const [cart, setCart] = useState([]);

  // Load cart items from localStorage when component mounts
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart items to localStorage when cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (data) => {
    const existingItemIndex = cart.findIndex(item => item.product_id === data.product_id);

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      updatedCart[existingItemIndex].price += data.unit_price; // Adjust price based on the added quantity
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...data, quantity: 1, unit_price: data.price }]); // Include unit_price when adding a new item
    }
  };

  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const incrementQuantity = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += 1;
    updatedCart[index].price = updatedCart[index].unit_price; // Adjust price based on the increased quantity
    setCart(updatedCart);
  };

  const decrementQuantity = (index) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      updatedCart[index].price = updatedCart[index].unit_price; // Adjust price based on the decreased quantity
      setCart(updatedCart);
    }
  };

  return (
    <BrowserRouter>
      <MayShow paths={['/admin', '/user', '/report', '/query', '/products']}>
        <Header cartItems={cart} />
      </MayShow>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/change-password' element={<ChangePassword />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/offers' element={<OfferPage />} />
        <Route path='/aboutus' element={<AboutUsPage />} />
        <Route path='/nav' element={<Nav />} />
        <Route path='/sidebar' element={<Sidebar />} />
        <Route path='/productlist' element={<ProductList addToCart={addToCart} />} />
        <Route path='/cart' element={<Cart cart={cart} removeFromCart={removeFromCart} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='*' element={<div style={{ marginTop: '200px', fontSize: '50px', marginBottom: '340px', display: 'flex', justifyContent: 'center' }}>Page Not Found</div>} />


        <Route path='/adminhome' element={<Home />} />
        <Route path='/report' element={<Report />} />
        <Route path='/user' element={<User />} />
        <Route path='/admin' element={<AdminPannel />} />
        <Route path='/query' element={<Query />} />
        <Route path='/products' element={<ProductPage />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
