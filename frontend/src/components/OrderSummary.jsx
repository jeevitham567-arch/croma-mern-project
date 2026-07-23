import { useNavigate } from "react-router-dom";

function OrderSummary({ totalPrice }) {
  const navigate = useNavigate();

  const delivery = 0;
  const discount = 500;

  const grandTotal = totalPrice + delivery - discount;

  return (
    <div
      style={{
        width: "350px",
        background: "#fff",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
        height: "fit-content",
      }}
    >
      <h2>Order Summary</h2>

      <hr />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <span>Subtotal</span>
        <b>₹ {totalPrice.toLocaleString()}</b>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "15px",
        }}
      >
        <span>Delivery</span>
        <span style={{ color: "green" }}>FREE</span>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "15px",
        }}
      >
        <span>Discount</span>
        <span style={{ color: "green" }}>
          - ₹ {discount}
        </span>
      </div>

      <hr />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
          fontSize: "22px",
        }}
      >
        <b>Total</b>

        <b style={{ color: "#00b894" }}>
          ₹ {grandTotal.toLocaleString()}
        </b>
      </div>

      <button
        onClick={() => navigate("/checkout")}
        style={{
          width: "100%",
          marginTop: "30px",
          padding: "15px",
          background: "#00bcd4",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        Proceed To Checkout
      </button>
    </div>
  );
}

export default OrderSummary;