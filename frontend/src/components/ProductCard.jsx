import { Link } from "react-router-dom";
import API from "../services/api";

function ProductCard({ product }) {
  const addToCart = async (id) => {
    try {
      await API.post("/cart", {
        productId: id,
      });

      alert("Product Added To Cart");
    } catch (error) {
      console.log(error);
      alert("Unable to add product to cart");
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "20px",
        textAlign: "center",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        background: "#fff",
      }}
    >
      <Link to={`/product/${product._id}`}>
        <img
          src={`http://localhost:5000/uploads/${product.image}`}
          alt={product.name}
          style={{
            width: "180px",
            height: "180px",
            objectFit: "contain",
            marginBottom: "15px",
            cursor: "pointer",
          }}
        />
      </Link>

      <h3>{product.name}</h3>

      <p>{product.description}</p>

      <h2 style={{ color: "green" }}>₹ {product.price}</h2>

      <p style={{ color: "#f59e0b", fontWeight: "bold" }}>
        ⭐ {product.rating}
      </p>

      <button
        onClick={() => addToCart(product._id)}
        style={{
          padding: "10px 20px",
          background: "#00bcd4",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "10px",
        }}
      >
        Add To Cart
      </button>
    </div>
  );
}

export default ProductCard;