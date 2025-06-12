import React, { useEffect, useState } from "react";
import "./CSS/ShopCategory.css";
import dropDown_icon from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/Item/Item";
import all_product from "../Components/Assets/all_product.js"; // single import used

const ShopCategory = (props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/products");
        const data = await res.json();

        if (data && data.products && data.products.length > 0) {
          setProducts(data.products);
        } else {
          console.warn("API returned empty or unexpected data, using fallback.");
          setProducts(all_product);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(true);
        setProducts(all_product);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products by category
  const filteredProducts = products.filter(
    (item) => item.category === props.category
  );

  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={props.banner} alt="" />

      <div className="shopcategory-indexSort">
        <p>
          <span>Showing {filteredProducts.length}</span> products in{" "}
          {props.category}
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropDown_icon} alt="" />
        </div>
      </div>

      {loading && <p>Loading products...</p>}
      {error && (
        <p style={{ color: "red" }}>
          Failed to load from API. Showing fallback data.
        </p>
      )}

      <div className="shopcategory-products">
        {filteredProducts.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>

      <div className="shopcategory-loadmore">Explore More</div>
    </div>
  );
};

export default ShopCategory;
