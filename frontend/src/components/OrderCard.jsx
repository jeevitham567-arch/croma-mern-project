function OrderCard({ order }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        marginBottom: "20px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <img
          src={`http://localhost:5000/uploads/${order.product.image}`}
          alt={order.product.name}
          style={{
            width: "120px",
            height: "120px",
            objectFit: "contain",
          }}
        />

        <div>
          <h2>{order.product.name}</h2>

          <p style={{ color: "#666" }}>
            {order.product.description}
          </p>

          <h3 style={{ color: "#00b894" }}>
            ₹ {order.product.price.toLocaleString()}
          </h3>

          <p>
            Qty : {order.quantity}
          </p>
        </div>
      </div>

      <div
        style={{
          textAlign: "right",
        }}
      >
        <p>
          <b>Order Date</b>
        </p>

        <p>
          {new Date(order.createdAt).toLocaleDateString()}
        </p>

        <p
          style={{
            color: "green",
            fontWeight: "bold",
            marginTop: "10px",
          }}
        >
          Delivered
        </p>
      </div>
    </div>
  );
}

export default OrderCard;