import React from 'react';
import './Cart.css';
import Khalti from './khalti/Khalti';

function Cart({ cart, removeFromCart, incrementQuantity, decrementQuantity }) {
  const calculateTotalPrice = (item) => {
    return item.unit_price * item.quantity;
  };

  const totalPrice = cart.reduce((total, item) => total + calculateTotalPrice(item), 0);

  return (
    <div className="cart-container">
      {cart.length > 0 ? (
        <div>
          <h2>Shopping Cart</h2>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((cartItem, cartIndex) => (
                <tr key={cartIndex}>
                  <td><img src={`http://localhost:8081/images/${cartItem.image}`} alt={cartItem.product_name} /></td>
                  <td>{cartItem.product_name}</td>
                  <td>Rs. {cartItem.unit_price}</td>
                  <td>
                    <span>{cartItem.quantity}</span>
                  </td>
                  <td>Rs. {calculateTotalPrice(cartItem)}</td>
                  <td style={{display:'flex',flexDirection:'column', gap:'10px'}}>
                    <button onClick={() => decrementQuantity(cartIndex)}>-</button>
                    <button onClick={() => incrementQuantity(cartIndex)}>+</button>
                    <button onClick={() => removeFromCart(cartItem.product_id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="cart-summary">
            <p>Total Price: Rs. {totalPrice}</p>
          </div>
          <div className='checkout'>
              <Khalti totalAmount={totalPrice} />
          </div>
        </div>
      ) : (
        <div style={{marginTop:'200px', display:'flex', justifyContent:'center'}}>
          <h2>Your cart is empty</h2>
        </div>
      )}
    </div>
  );
}

export default Cart;
