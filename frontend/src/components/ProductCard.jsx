import { Link } from "react-router-dom";
import API from "../services/api";
import { FiHeart } from "react-icons/fi";

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

  const addToWishlist = async (id) => {
    try {
      await API.post("/wishlist", {
        productId: id,
      });

      alert("Added To Wishlist ❤️");
    } catch (error) {
      console.log(error);

      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Unable to add to Wishlist");
      }
    }
  };

  return (
    <div
      style={{
        background: "#1b1b1b",
        borderRadius: "16px",
        padding: "20px",
        color: "#fff",
        position: "relative",
        transition: "0.3s",
        boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0px)";
      }}
    >
      {/* Wishlist Icon */}

      <div
        onClick={() => addToWishlist(product._id)}
        style={{
          position: "absolute",
          top: "15px",
          right: "15px",
          width: "38px",
          height: "38px",
          borderRadius: "50%",
          background: "#2a2a2a",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          transition: "0.3s",
        }}
      >
        <FiHeart size={22} color="#fff" />
      </div>

      <Link to={`/product/${product._id}`}>
        <img
          src={`http://localhost:5000/uploads/${product.image}`}
          alt={product.name}
          style={{
            width: "200px",
            height: "200px",
            objectFit: "contain",
            display: "block",
            margin: "10px auto 20px",
            cursor: "pointer",
          }}
        />
      </Link>

      <h3
        style={{
          fontSize: "20px",
          fontWeight: "600",
          height: "55px",
          overflow: "hidden",
          lineHeight: "28px",
          marginBottom: "10px",
        }}
      >
        {product.name}
      </h3>

      <p
        style={{
          color: "#bdbdbd",
          fontSize: "14px",
          height: "40px",
          overflow: "hidden",
          marginBottom: "15px",
        }}
      >
        {product.description}
      </p>

      <h2
        style={{
          color: "#fff",
          marginBottom: "5px",
        }}
      >
        ₹ {product.price.toLocaleString()}
      </h2>

      <p
        style={{
          color: "#888",
          textDecoration: "line-through",
          marginBottom: "5px",
        }}
      >
        ₹ {(product.price + 5000).toLocaleString()}
      </p>

      <p
        style={{
          color: "#00e676",
          fontWeight: "bold",
          marginBottom: "12px",
        }}
      >
        Save ₹5,000
      </p>

      <p
        style={{
          color: "#ffc107",
          fontSize: "17px",
          marginBottom: "20px",
        }}
      >
        ⭐⭐⭐⭐⭐
      </p>

      <button
        onClick={() => addToCart(product._id)}
        style={{
          width: "100%",
          padding: "13px",
          background: "#00c853",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "16px",
        }}
      >
        🛒 Add To Cart
      </button>
    </div>
  );
}

export default ProductCard;