function WishlistCard({ item, addToCart, removeWishlist }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#fff",
        borderRadius: "12px",
        padding: "20px",
        marginBottom: "20px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "25px",
          alignItems: "center",
          flex: 1,
        }}
      >
        <img
          src={`http://localhost:5000/uploads/${item.product.image}`}
          alt={item.product.name}
          style={{
            width: "150px",
            height: "150px",
            objectFit: "contain",
          }}
        />

        <div>
          <h2>{item.product.name}</h2>

          <p style={{ color: "#666" }}>
            {item.product.description}
          </p>

          <h3 style={{ color: "#00b894" }}>
            ₹ {item.product.price.toLocaleString()}
          </h3>

          <p style={{ color: "#f5a623" }}>
            ⭐ {item.product.rating}
          </p>

          <p style={{ color: "green" }}>
            In Stock
          </p>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <button
          onClick={() => addToCart(item.product._id)}
          style={{
            padding: "12px 25px",
            background: "#00bcd4",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          🛒 Move To Cart
        </button>

        <button
          onClick={() => removeWishlist(item._id)}
          style={{
            padding: "12px 25px",
            background: "#ff4d4f",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default WishlistCard;