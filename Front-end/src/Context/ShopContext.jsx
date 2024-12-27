import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let i = 0; i < 100 + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_product, setAllProduct] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());

  useEffect(() => {
    fetch("http://localhost:9090/allproducts")
      .then((res) => res.json())
      .then((data) => setAllProduct(data));
    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:9090/getcart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": ` ${localStorage.getItem("auth-token")}`,
          "Content-type": "application/json",
        },
        body: "",
      })
        .then((response) => response.json())
        .then((data) => setCartItems(data));
    }
  }, []);

  const addToCar = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    // console.log(cartItems);
    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:9090/addtocart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 'itemId': itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:9090/removeitemcart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 'itemId': itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let productInfo = all_product.find(
          (product) => product.id === Number(item)
        );
        totalAmount += productInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const getTotalCartProducts = () => {
    let totalProducts = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let productInfo = all_product.find(
          (product) => product.id === Number(item)
        );
        totalProducts += cartItems[item];
      }
    }
    return totalProducts;
  };

  const contextValue = {
    all_product,
    cartItems,
    addToCar,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartProducts,
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;