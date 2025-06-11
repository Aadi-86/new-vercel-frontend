import React from "react";
import "./Breafcrums.css";
import arrow_icon from "../../Components/Assets/breadcrum_arrow.png";
const Breafcrums = (props) => {
  const { product } = props;
  return (
    <div className="breadcrums">
      HOME <img src={arrow_icon} alt="" />
      SHOP <img src={arrow_icon} alt="" />
      {product.category} <img src={arrow_icon} alt="" />
      {product.name}
    </div>
  );
};

export default Breafcrums;
