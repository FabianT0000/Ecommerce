import React, { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";
import Button from 'react-bootstrap/Button';
import "./CartProducts.css";

const CartProducts = () => {
  const { all_product, cartItems, removeFromCart,getTotalCartAmount } = useContext(ShopContext);
   return (
    <div className="cartProducts">
      <div className="cartProducts-main">
        <p>Productos</p>
        <p>Titulo</p>
        <p>Precio</p>
        <p>Cantidad</p>
        <p>Total</p>
        <p>Eliminar</p>
      </div>
      <hr />
      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div>
              <div className="cartProducts-format cartProducts-main">
                <img src={e.image} alt="" className="product-icon" />
                <p>{e.name}</p>

                <p>${e.price}</p>

                <button className="cartProducts-quantity">
                  {cartItems[e.id]}
                </button>
                <p>${e.price * cartItems[e.id]}</p>
                <img
                  className="cartProduct-remove"
                  src={remove_icon}
                  onClick={() => {
                    removeFromCart(e.id);
                  }}
                  alt=""
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cartProducts-down">
        <div className="cartProduct-total">
          <h1>Precio de tú compra :</h1>
          <div className="cartProducts-total-item">
            <p>Subtotal :</p>
            <p>${getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cartProducts-total-item">
            <h3>Total</h3>
            <h3>${getTotalCartAmount()}</h3>
          </div>
          <Button onClick={()=>alert("Compra exitosa")} variant="primary">Finalizar Compra</Button>
        </div>
      </div>
    </div>
  );
};

export default CartProducts;
