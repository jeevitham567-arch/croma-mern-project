import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Checkout() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    getCart();
  }, []);

  const getCart = async () => {
    try {
      const res = await API.get("/cart");
      setCart(res.data.cart);
    } catch (error) {
      console.log("Cart Error:", error);
      alert("Unable to load cart");
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const subtotal = cart.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  const discount = 500;
  const delivery = 0;

  const grandTotal = subtotal + delivery - discount;

  const placeOrder = async () => {
    try {
      if (cart.length === 0) {
        alert("Your cart is empty");
        return;
      }

      if (
        !form.name ||
        !form.phone ||
        !form.address ||
        !form.city ||
        !form.state ||
        !form.pincode
      ) {
        alert("Please fill all address details");
        return;
      }

      setLoading(true);

      // Create Razorpay Order
      const razorpayRes = await API.post(
        "/orders/create-razorpay-order",
        {
          amount: grandTotal,
        }
      );

      const razorpayOrder = razorpayRes.data.order;

      const options = {
        // Correct Razorpay TEST Key ID
        key: "rzp_test_TKAbeJeGWAdL2U",

        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "Croma",
        description: "Croma E-commerce Purchase",
        order_id: razorpayOrder.id,

        handler: async function (response) {
          try {
            // Verify Razorpay Payment
            const verifyRes = await API.post(
              "/orders/verify-payment",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }
            );

            if (verifyRes.data.success) {
              const items = cart.map((item) => ({
                product: item.product._id,
                quantity: item.quantity,
              }));

              // Create final order
              const orderRes = await API.post("/orders", {
                items,
                totalAmount: grandTotal,
                address: form,
              });

              if (orderRes.data.success) {
                alert("Payment successful and order placed!");

                navigate("/orders");
              }
            } else {
              alert("Payment verification failed");
            }
          } catch (error) {
            console.log("Payment verification error:", error);

            alert(
              error.response?.data?.message ||
                "Payment verification failed"
            );
          } finally {
            setLoading(false);
          }
        },

        prefill: {
          name: form.name,
          contact: form.phone,
        },

        theme: {
          color: "#00bcd4",
        },

        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      // Open Razorpay Checkout
      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.log("Payment Error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to start payment"
      );

      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          maxWidth: "700px",
          margin: "40px auto",
          background: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          Checkout
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          style={inputStyle}
        />

        <textarea
          name="address"
          placeholder="Full Address"
          value={form.address}
          onChange={handleChange}
          style={{
            ...inputStyle,
            height: "100px",
          }}
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="state"
          placeholder="State"
          value={form.state}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={form.pincode}
          onChange={handleChange}
          style={inputStyle}
        />

        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            background: "#f5f5f5",
            borderRadius: "8px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>Subtotal</span>
            <b>₹ {subtotal.toLocaleString()}</b>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
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
              fontSize: "20px",
            }}
          >
            <b>Total</b>

            <b style={{ color: "#00b894" }}>
              ₹ {grandTotal.toLocaleString()}
            </b>
          </div>
        </div>

        <button
          onClick={placeOrder}
          disabled={loading}
          style={{
            width: "100%",
            padding: "15px",
            background: loading ? "#999" : "#00bcd4",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "18px",
            fontWeight: "bold",
            marginTop: "20px",
          }}
        >
          {loading
            ? "Processing Payment..."
            : "Pay & Place Order"}
        </button>
      </div>

      <Footer />
    </>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "18px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "16px",
  boxSizing: "border-box",
};

export default Checkout;