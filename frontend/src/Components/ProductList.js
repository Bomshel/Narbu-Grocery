import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TiShoppingCart } from "react-icons/ti";
import '../css/ProductList.css';

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [flippedCards, setFlippedCards] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    try {
      let url = 'http://localhost:8081/category';
      if (selectedCategory) {
        url += `?category=${selectedCategory}`;
      }
      const response = await axios.get(url);
      setProducts(response.data);
      initializeFlippedState(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const initializeFlippedState = (products) => {
    const initialFlippedState = products.reduce((obj, product) => {
      obj[product.product_id] = false;
      return obj;
    }, {});
    setFlippedCards(initialFlippedState);
  };

  const toggleCardFlip = (productId) => {
    setFlippedCards((prevState) => ({
      ...prevState,
      [productId]: !prevState[productId],
    }));
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setCartItems([...cartItems, product]);
  };

  const getCartItemQuantity = (productId) => {
    return cartItems.filter(item => item.product_id === productId).length;
  };

  return (
    <div>
      <div className="head">
        <nav>
          <ul>
            <li onClick={() => handleCategoryClick('Grocery')}>Grocery</li>
            <li onClick={() => handleCategoryClick('Fruits')}>Fruits</li>
            <li onClick={() => handleCategoryClick('Vegetables')}>Vegetables</li>
            <li onClick={() => handleCategoryClick('Bakery')}>Bakery & Dairy</li>
            <li onClick={() => handleCategoryClick('Non Veg')}>Eggs & Meat</li>
            <li onClick={() => handleCategoryClick('Beverage')}>Beverage</li>
            <li onClick={() => handleCategoryClick('Pet Food')}>Pet Food</li>
          </ul>
        </nav>
      </div>

      <div className="container-fluid">
        <div className="row row-cols-1 row-cols-md-5 g-5">
          {products.map((product) => (
            <div className="col" key={product.product_id}>
              <div
                className={`card ${flippedCards[product.product_id] ? 'flipped' : ''}`}
                onClick={() => toggleCardFlip(product.product_id)}
              >
                <div className="card-front">
                  <img src={`http://localhost:8081/images/${product.image}`} alt={product.product_name} />
                  <div className="card-body">
                    <h5>{product.product_name}</h5>
                    <p style={{ color: 'red', fontWeight: '600' }}>Price: Rs. {product.price}</p>
                    {getCartItemQuantity(product.product_id) === 0 ? (
                      <button className="add-to-cart" onClick={(e) => { e.stopPropagation(); handleAddToCart(product) }}><TiShoppingCart /> Add</button>
                    ) : (
                      <div style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center', gap:'15px',}}>
                        <button onClick={(e) => { e.stopPropagation(); handleAddToCart(product) }}>+</button>
                        <span>{getCartItemQuantity(product.product_id)}</span>
                        <button onClick={(e) => { e.stopPropagation(); handleRemoveFromCart(product) }}>-</button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="card-back">
                  <div className="card-body">
                    <p>{product.description}</p>
                    <p style={{ color: 'red', fontWeight: '600' }}>Price: Rs. {product.price}</p>
                    <button className="add-to-cart" onClick={(e) => { e.stopPropagation(); handleAddToCart(product) }}><TiShoppingCart /> Add</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
