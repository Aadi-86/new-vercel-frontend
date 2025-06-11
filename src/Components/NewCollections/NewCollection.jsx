import React, { useEffect, useState } from "react";
import "./NewCollection.css";

import Item from "../Item/Item";
const NewCollection = () => {
  const [new_collection, setNewCollection] = useState([]);
useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/products/newCollection");
      const data = await res.json();
      setNewCollection(data.products);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };
  fetchData();
}, []);

  return (
    <div className="new-collection">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {new_collection.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NewCollection;
