import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await API.get(`/products/${id}`);
      setProduct(res.data.product);
    } catch (error) {
      console.log(error);
    }
  };

  if (!product) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <>
      <Navbar />

      <div
        style={{
          display: "flex",
          gap: "50px",
          padding: "50px",
          alignItems: "center",
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "350px",
            height: "350px",
            objectFit: "contain",
          }}
        />

        <div>
          <h1>{product.name}</h1>

          <p style={{ margin: "20px 0" }}>
            {product.description}
          </p>

          <h2 style={{ color: "green" }}>
            ₹ {product.price}
          </h2>

          <h3>Category : {product.category}</h3>

          <h3>Stock : {product.stock}</h3>

          <button
            style={{
              marginTop: "20px",
              padding: "12px 30px",
              background: "#00bcd4",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Add To Cart
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ProductDetails;