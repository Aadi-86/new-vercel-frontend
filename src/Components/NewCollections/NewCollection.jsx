import React, { useEffect, useState } from "react";
import "./NewCollection.css";
import all_products from "../../Components/Assets/new_collections.js";
import Item from "../Item/Item";

const NewCollection = () => {
  const [new_collection, setNewCollection] = useState([]);
  const [loading, setLoading] = useState(true); // loading state
  const [error, setError] = useState(false); // error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/products/newCollection");
        const data = await res.json();

        if (data && data.products && data.products.length > 0) {
          setNewCollection(data.products);
        } else {
          console.warn("API returned empty or unexpected data, using fallback.");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const dataToRender = new_collection.length > 0 ? new_collection : all_products;

  return (
    <div className="new-collection">
      <h1>NEW COLLECTIONS</h1>
      <hr />

      {loading && <p>Loading collections...</p>}
      {error && <p style={{ color: "red" }}>Failed to load from API. Showing fallback data.</p>}

      <div className="collections">
        {dataToRender.map((item, i) => (
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
    </div>
  );
};

export default NewCollection;
