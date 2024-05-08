import React from 'react';
import './css/OfferPage.css';
import offer1 from './img/offer1.png';
import offer2 from './img/offer2.png';
import offer3 from './img/offer3.png';
import offer4 from './img/offer4.png';
import offer5 from './img/offer5.png';
import offer6 from './img/offer6.png';
import offer7 from './img/offer7.png';
import offer8 from './img/offer8.png';

const OfferPage = () => {
  const offers = [
    {
      image: offer1,
      title: "Special Discounts on Fruits",
      description: "Enjoy special discounts on a wide variety of fresh fruits this week. Stock up on your favorite fruits and stay healthy!",
    },
    {
      image: offer2,
      title: "Buy One Get One Free on Bakery Items",
      description: "Indulge in delicious bakery treats with our buy one get one free offer on selected bakery items. Don't miss out!",
    },
    {
      image: offer3,
      title: "Buy One Get One Free on Bakery Items",
      description: "Indulge in delicious bakery treats with our buy one get one free offer on selected bakery items. Don't miss out!",
    },
    {
      image: offer4,
      title: "Buy One Get One Free on Bakery Items",
      description: "Indulge in delicious bakery treats with our buy one get one free offer on selected bakery items. Don't miss out!",
    },
    {
      image: offer5,
      title: "Buy One Get One Free on Bakery Items",
      description: "Indulge in delicious bakery treats with our buy one get one free offer on selected bakery items. Don't miss out!",
    },
    {
      image: offer6,
      title: "Buy One Get One Free on Bakery Items",
      description: "Indulge in delicious bakery treats with our buy one get one free offer on selected bakery items. Don't miss out!",
    },
    {
      image : offer7,
      title : "Get heavy discount on Grocery Items",
      description: "Indulge in delicious bakery treats with our buy one get one free offer on selected bakery items. Don't miss out!",
    },
    
    {
      image : offer8,
      title: "Get heavy discount on Dashai Offer.",
      description: "Indulge in delicious bakery treats with our buy one get one free offer on selected bakery items. Don't miss out!",
    }
  ];

  return (
    <div className="offer-page">
      <h2>Special Offers</h2>
      <div className="offer-container">
        {offers.map((offer, index) => (
          <div key={index} className="offer-item">
            <img src={offer.image} alt={offer.title} />
            <div className="offer-details">
              <h3>{offer.title}</h3>
              <p>{offer.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfferPage;
