import React, { useContext, useEffect, useState } from "react";
import "./ProductDisplay.css";
import star_icon from "../../Components/Assets/star_icon.png";
import star_dull_icon from "../../Components/Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import all_product from "../../Components/Assets/all_product.js";

const ProductDisplay = (props) => {
  const { addToCart, RemoveCart, cartItems } = useContext(ShopContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Load product either from props or fallback
  useEffect(() => {
    const loadProduct = async () => {
      try {
        if (props.product) {
          setProduct(props.product);
        } else {
          const res = await fetch("http://localhost:3000/api/products");
          const data = await res.json();

          if (data && data.products && data.products.length > 0) {
            const fallback = data.products.find(
              (p) => p.id === props.productId
            );
            setProduct(fallback || all_product.find(p => p.id === props.productId));
          } else {
            // If API fails or is empty, use local file
            const fallback = all_product.find(p => p.id === props.productId);
            setProduct(fallback);
            setError(true);
          }
        }
      } catch (err) {
        console.error("Error loading product:", err);
        const fallback = all_product.find(p => p.id === props.productId);
        setProduct(fallback);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [props.product, props.productId]);

  if (loading) return <p>Loading product...</p>;
  if (!product) return <p style={{ color: "red" }}>Product not found.</p>;

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className="productdisplay-img">
          <img className="product-main-img" src={product.image} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            ${product.old_price}
          </div>
          <div className="productdisplay-right-price-new">
            ${product.new_price}
          </div>
        </div>
        <div className="productdisplay-right-description">
          “A comfortable cotton t-shirt with a modern fit. Lightweight,
          breathable, and perfect for everyday wear. Durable and easy to care
          for.”
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>
        <button onClick={() => addToCart(product.id)}>ADD TO CART</button>
        <p className="productdisplay-right-categroy">
          <span>Category :</span> {product.category}
        </p>
        <p className="productdisplay-right-categroy">
          <span>Tags :</span> Modern, Latest
        </p>

        {error && (
          <p style={{ color: "red" }}>
            Failed to load from API. Showing fallback product.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductDisplay;
