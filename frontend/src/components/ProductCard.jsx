import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "20px",
        textAlign: "center",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        background: "#fff",
        transition: "0.3s",
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: "180px",
          height: "180px",
          objectFit: "contain",
          marginBottom: "15px",
        }}
      />

      <h3>{product.name}</h3>

      <p>{product.description}</p>

      <h2 style={{ color: "green" }}>
        ₹ {product.price}
      </h2>

      <Link to={`/product/${product._id}`}>
        <button
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
          View Details
        </button>
      </Link>
    </div>
  );
}

export default ProductCard;