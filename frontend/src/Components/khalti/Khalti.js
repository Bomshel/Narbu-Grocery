import React from "react";
import KhaltiCheckout from "khalti-checkout-web";
import config from "./khaltiConfig";

export default function Khalti({ totalAmount }) {
  let checkout = new KhaltiCheckout(config);

  let buttonStyles = {
    backgroundColor: "purple",
    padding: "10px",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
    border: "1px solid white",
  };

  const handlePayment = () => {
    checkout.show({ amount: totalAmount * 100 });
  };

  return (
    <div>
      <button onClick={handlePayment} style={buttonStyles}>
        Pay Via Khalti
      </button>
    </div>
  );
}
