import React, { useContext } from "react";
import "./ProductDisplay.css";

import Button from 'react-bootstrap/Button';
import { ShopContext } from "../../Context/ShopContext";

const ProductDisplay = (props) => {
    const {product} =props;
    const {addToCar}=useContext(ShopContext);
    return (
    <div className="productDisplay">
      <div className="productDisplay-left">
        <div className="productDisplay-img-list">
          <img src={product.image} alt=""  />
          <img src={product.image} alt=""  />
          <img src={product.image} alt=""  />
        </div>
        <div className="productDisplay-img">
            <img className="productDisplay-main-img" src={product.image } alt="" />
        </div>
      </div>
      <div className="productDisplay-right">
        <h1>{product.name}</h1>
        <div className="productDisplay-right-price">
          {/* <div className="productDisplay-right-price-old">${product.old_price}</div> */}
          <div className="productDisplay-right-price-new">${product.price}</div>
       </div>
          <div className="productDisplay-right-size">
        <h1>Selecciona tú talla</h1>
        <div className="productDisplay-right-sizes">
          <div>S</div>
          <div>M</div>
          <div>L</div>
          <div>XL</div>
          <div>XXL</div>
        </div>
       </div>
       <Button  variant="primary" type="submit" onClick={()=>{addToCar(product.id)}}>
        Agregar
      </Button>
      
      </div>
    </div>
  );
};

export default ProductDisplay;
