import React from "react";
import "./Header.css";

import arrow_icon from "../Assets/arrow.png";
import header_image from "../Assets/header-image.png";

const Header = () => {
  return (
    <div className="header">
      <div className="header-left">
        <h2>Lo más nuevo</h2>
        <div>
    
          <p>Colección</p>
          <p>Para todos</p>
        </div>

        <div className="header-latest-btn">
          <div>Colección pasada</div>
          <img src={arrow_icon} alt="" srcset="" />
        </div>
      </div>
      <div className="header-right">
        <img id="img-header"src={header_image} alt="" srcset="" />
      </div>
    </div>
  );
};

export default Header;
