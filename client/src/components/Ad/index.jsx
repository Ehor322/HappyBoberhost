import React from "react";
import { Link } from "react-router-dom";

import "./ad.scss";

const Ad = ({ picture, price, animalName, id }) => {
  const path = `/ad/${id}`;
  return (<Link to={path}><div className="chat__dialog-ad">
    <div className="chat__dialog-ad-info">
      <img src={picture} alt="" />
      <div className="chat__dialog-ad-text">
        <div className="chat__dialog-ad-description">
          {animalName}
        </div>
        <div className="chat__dialog-ad-price">
          {price}<span>₴</span>
        </div>
      </div>
    </div>
  </div></Link>)

};

export default Ad;