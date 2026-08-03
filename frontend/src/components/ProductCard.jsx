import { Link } from "react-router-dom";
import API from "../services/api";
import { FiHeart } from "react-icons/fi";

function ProductCard({ product }) {
  const addToCart = async (id) => {
    try {
      await API.post("/cart", {
        productId: id,
        quantity: 1,
      });

      alert("Product Added To Cart 🛒");
    } catch (error) {
      console.log("Cart Error:", error);

      if (error.response?.status === 401) {
        alert("Please login first");
      } else {
        alert(
          error.response?.data?.message ||
            "Unable to add product to cart"
        );
      }
    }
  };

  const addToWishlist = async (id) => {
    try {
      await API.post("/wishlist", {
        productId: id,
      });

      alert("Added To Wishlist ❤️");
    } catch (error) {
      console.log("Wishlist Error:", error);

      if (error.response?.status === 401) {
        alert("Please login first");
      } else {
        alert(
          error.response?.data?.message ||
            "Unable to add to Wishlist"
        );
      }
    }
  };

  const isOutOfStock = product.stock <= 0;

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
        e.currentTarget.style.transform =
          "translateY(-8px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform =
          "translateY(0px)";
      }}
    >
      {/* Wishlist */}

      <button
        onClick={() => addToWishlist(product._id)}
        style={{
          position: "absolute",
          top: "15px",
          right: "15px",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          background: "#2a2a2a",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          border: "none",
          zIndex: 2,
        }}
      >
        <FiHeart size={22} color="#fff" />
      </button>

      {/* Product Image */}

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

      {/* Product Name */}

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

      {/* Description */}

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

      {/* Price */}

      <h2
        style={{
          color: "#fff",
          marginBottom: "5px",
        }}
      >
        ₹ {product.price?.toLocaleString()}
      </h2>

      {/* Old Price */}

      <p
        style={{
          color: "#888",
          textDecoration: "line-through",
          marginBottom: "5px",
        }}
      >
        ₹{" "}
        {(
          Number(product.price || 0) + 5000
        ).toLocaleString()}
      </p>

      {/* Discount */}

      <p
        style={{
          color: "#00e676",
          fontWeight: "bold",
          marginBottom: "12px",
        }}
      >
        Save ₹5,000
      </p>

      {/* Rating */}

      <p
        style={{
          color: "#ffc107",
          fontSize: "17px",
          marginBottom: "8px",
        }}
      >
        ⭐ {product.rating || 0}
      </p>

      {/* Stock */}

      <p
        style={{
          color: isOutOfStock
            ? "#ff5252"
            : "#00e676",
          fontWeight: "bold",
          marginBottom: "15px",
        }}
      >
        {isOutOfStock
          ? "Out of Stock"
          : `In Stock (${product.stock})`}
      </p>

      {/* Add To Cart */}

      <button
        onClick={() => addToCart(product._id)}
        disabled={isOutOfStock}
        style={{
          width: "100%",
          padding: "13px",
          background: isOutOfStock
            ? "#666"
            : "#00c853",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: isOutOfStock
            ? "not-allowed"
            : "pointer",
          fontWeight: "bold",
          fontSize: "16px",
        }}
      >
        {isOutOfStock
          ? "Out of Stock"
          : "🛒 Add To Cart"}
      </button>

      {/* View Details */}

      <Link
        to={`/product/${product._id}`}
        style={{
          display: "block",
          textAlign: "center",
          marginTop: "12px",
          padding: "11px",
          border: "1px solid #555",
          borderRadius: "8px",
          color: "#fff",
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        View Details
      </Link>
    </div>
  );
}

export default ProductCard;