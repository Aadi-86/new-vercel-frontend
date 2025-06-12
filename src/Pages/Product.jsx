import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import Breafcrums from '../Components/Breafcrums/Breafcrums';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProduct from '../Components/RelatedProducts/RelatedProduct';
import all_products from '../Components/Assets/all_product.js';

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      let foundProduct = null;

      // Step 1: Check context data
      if (all_product && all_product.length > 0) {
        foundProduct = all_product.find((e) => e.id === Number(productId));
      }

      // Step 2: If not found in context, try local fallback
      if (!foundProduct) {
        foundProduct = all_products.find((e) => e.id === Number(productId));
      }

      // Step 3: Optional - fetch from API (if you want)
      // Can add fetch here if needed

      setProduct(foundProduct);
      setLoading(false);
    };

    loadProduct();
  }, [all_product, productId]);

  if (loading) return <div>Loading product...</div>;

  if (!product) {
    return <div style={{ color: 'red' }}>Product not found.</div>;
  }

  return (
    <div>
      <Breafcrums product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProduct />
    </div>
  );
};

export default Product;
