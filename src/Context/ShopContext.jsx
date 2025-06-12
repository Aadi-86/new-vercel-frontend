import React, { createContext, useEffect, useState } from "react";
import fallback_products from "../Components/Assets/all_product.js";

export const ShopContext = createContext(null);

// Initialize cart with 0 quantities
const getDefaultCart = () => {
  let cart = {};
  for (let i = 1; i <= 300; i++) {
    cart[i] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_product, setAllProduct] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());

  // ✅ Corrected useEffect with async function inside
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/products/Allproduct");
        const data = await res.json();

        if (data && data.products && data.products.length > 0) {
          setAllProduct(data.products);
        } else {
          console.warn("API returned no products, using fallback.");
          setAllProduct(fallback_products);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setAllProduct(fallback_products); // fallback if fetch fails
      }
    };

    fetchData();
  }, []);

  // ✅ Add to Cart
  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  // ✅ Remove from Cart
  const RemoveCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  // ✅ Total cart price with null check
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = all_product.find(
          (product) => product.id === Number(item)
        );
        if (itemInfo) {
          totalAmount += cartItems[item] * itemInfo.new_price;
        }
      }
    }
    return totalAmount;
  };

  // ✅ Total number of items in cart
  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItems += cartItems[item];
      }
    }
    return totalItems;
  };

  // ✅ Final context object
  const ContextValue = {
    all_product,
    addToCart,
    RemoveCart,
    cartItems,
    getTotalCartAmount,
    getTotalCartItems,
  };

  return (
    <ShopContext.Provider value={ContextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
