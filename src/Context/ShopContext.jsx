import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);
const getDefaultCart = () => {
  let cart = {};
  for (let i = 0; i < 300+1; i++) {
    cart[i] = 0;
  }
  return cart;
};
const ShopContextProvider = (props) => {
   const [all_product, setAllProduct]=useState([])
  const [cartItems, setCartItems] = useState(getDefaultCart());

  useEffect(()=> async()=>{
    fetch("http://localhost:3000/api/products/Allproduct").then((res)=> res.json()).then((data)=>{
      setAllProduct(data.products)
     console.log("Fetched Data:", data);
      
    })
  },[])
   
  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    console.log(cartItems);
    
  };
  const RemoveCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };
   const getTotalCartAmount = () => {
    let totalAmount = 0;
    for(const item in cartItems){
      if(cartItems[item] > 0){
        let itemInfo = all_product.find((product) => product.id === Number(item));
        totalAmount += cartItems[item] * itemInfo.new_price;
      }
    
    }
      return totalAmount;
   }



   const getTotalCartItems = () => {
    let totalItems = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItems += cartItems[item];
      }
      
   }

return totalItems;

  }

  const ContextValue = { all_product,addToCart, RemoveCart, cartItems,getTotalCartAmount,getTotalCartItems };
  return (
    <ShopContext.Provider value={ContextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
export default ShopContextProvider;
