import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaLocationDot, FaPhone, FaEnvelope, FaCartShopping } from "react-icons/fa6";
import { IoSearchCircle } from "react-icons/io5";
import { FaFacebookSquare, FaYoutube, FaUserCog } from "react-icons/fa";
import './css/Header.css';

const Header = ({ cartItems }) => {
    const [scrolled, setScrolled] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 0) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleSearch = () => {
        //  search functionality here
        console.log('Searching...');
    };

    return (
        <div className={`header ${scrolled ? 'scrolled' : ''}`}>
            <div className="banner-container">
                <div className={`banner ${scrolled ? 'hidden' : ''}`}>
                    <div className="left_content">
                        <div className="address"><FaLocationDot /> Naxal, Kathmandu</div>
                        <div className="contact"> <FaPhone /> +977 9804964820</div>
                        <div className="email"><FaEnvelope /> narbugrocery@gmail.com</div>
                    </div>
                    <div className="right_content">
                        <a href="https://www.facebook.com/profile.php?id=100055888415312&mibextid=ZbWKwL"><div className="facebook_icon"><FaFacebookSquare /> </div></a>
                       <a href="https://www.youtube.com/"><div className="youtube_icon"><FaYoutube /> </div></a>
                    </div>
                </div>
            </div>

            <div className="navigation-container">
                <div className="logo" />
                <p className="narbu">Narbu Grocery Store</p>
                
                <div className="search-container">
                    <input type="search" placeholder='Search' required />
                    <button type="button" className="search-button" onClick={handleSearch}>
                        <IoSearchCircle className="icon" />
                    </button>
                </div>
                
                <nav>
                    <ul>
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/productlist">Product</Link></li>
                        <li><Link to="/offers">Offers</Link></li>
                        <li><Link to="/aboutus">About Us</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                        <li><Link to="/cart"><FaCartShopping /> {cartItems.length > 0 && <span>({cartItems.length})</span>}</Link></li> 
                        <li><Link to="/profile"><FaUserCog /></Link></li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Header;
