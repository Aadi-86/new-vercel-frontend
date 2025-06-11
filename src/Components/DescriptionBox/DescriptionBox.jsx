import React from "react";
import "./DescriptionBox.css";
const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">DESCRIPTION</div>
        <div className="descriptionbox-nav-box fade">Reviews(122)</div>
      </div>
      <div className="descriptionbox-description">
        <p>"This stylish and comfortable cotton t-shirt is the perfect choice for everyday wear. Its lightweight fabric is skin-friendly and breathable, keeping you fresh all day long. With a modern fit and vibrant color options, this t-shirt is ideal for both casual and semi-formal occasions. Easy to wash and featuring durable stitching, it’s sure to become a staple piece in your wardrobe."</p>
        <p>“A comfortable cotton t-shirt with a modern fit. Lightweight, breathable, and perfect for everyday wear. Durable and easy to care for.”</p>
      </div>
    </div>
  );
};

export default DescriptionBox;
