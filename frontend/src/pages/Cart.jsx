import { useEffect, useState } from "react";
import API from "../services/api";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import OrderSummary from "../components/OrderSummary";

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    getCart();
  }, []);

  const getCart = async () => {
    try {
      const res = await API.get("/cart");
      setCart(res.data.cart);
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = async (id) => {
    try {
      await API.delete(`/cart/${id}`);
      getCart();
    } catch (error) {
      console.log(error);
    }
  };

  const updateQuantity = async (id, quantity) => {
    try {
      await API.put(`/cart/${id}`, { quantity });
      getCart();
    } catch (error) {
      console.log(error);
    }
  };

  const increaseQuantity = (item) => {
    updateQuantity(item._id, item.quantity + 1);
  };

  const decreaseQuantity = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item._id, item.quantity - 1);
    }
  };

  const totalPrice = cart.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  return (
    <>
      <Navbar />

      <div
        style={{
          background: "#f5f5f5",
          minHeight: "100vh",
          padding: "40px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          🛒 My Cart
        </h1>

        {cart.length === 0 ? (
          <h2
            style={{
              textAlign: "center",
              color: "gray",
            }}
          >
            Your Cart is Empty
          </h2>
        ) : (
          <div
            style={{
              display: "flex",
              gap: "30px",
              alignItems: "flex-start",
            }}
          >
            <div style={{ flex: 1 }}>
              {cart.map((item) => (
                <div
                  key={item._id}
                  style={{
                    display: "flex",
                    gap: "25px",
                    background: "#fff",
                    padding: "20px",
                    borderRadius: "12px",
                    marginBottom: "20px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                  }}
                >
                  <img
                    src={`http://localhost:5000/uploads/${item.product.image}`}
                    alt={item.product.name}
                    style={{
                      width: "170px",
                      height: "170px",
                      objectFit: "contain",
                    }}
                  />

                  <div style={{ flex: 1 }}>
                    <h2>{item.product.name}</h2>

                    <p
                      style={{
                        color: "#666",
                        marginTop: "10px",
                      }}
                    >
                      {item.product.description}
                    </p>

                    <p
                      style={{
                        color: "#f5a623",
                        fontWeight: "bold",
                        marginTop: "10px",
                      }}
                    >
                      ⭐ {item.product.rating}
                    </p>

                    <h2
                      style={{
                        color: "#00b894",
                        marginTop: "15px",
                      }}
                    >
                      ₹ {item.product.price.toLocaleString()}
                    </h2>

                    <p
                      style={{
                        textDecoration: "line-through",
                        color: "#777",
                      }}
                    >
                      ₹ {(item.product.price + 5000).toLocaleString()}
                    </p>

                    <p
                      style={{
                        color: "green",
                        fontWeight: "bold",
                      }}
                    >
                      Save ₹5,000
                    </p>

                    <p
                      style={{
                        marginTop: "10px",
                        color: "#555",
                      }}
                    >
                      🚚 Delivery by 25 July
                    </p>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                        marginTop: "20px",
                      }}
                    >
                      <button
                        onClick={() => decreaseQuantity(item)}
                        style={{
                          width: "35px",
                          height: "35px",
                          borderRadius: "50%",
                          border: "1px solid #ccc",
                          background: "#fff",
                          cursor: "pointer",
                        }}
                      >
                        -
                      </button>

                      <span
                        style={{
                          fontWeight: "bold",
                          fontSize: "20px",
                        }}
                      >
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item)}
                        style={{
                          width: "35px",
                          height: "35px",
                          borderRadius: "50%",
                          background: "#00bcd4",
                          color: "#fff",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item._id)}
                      style={{
                        marginTop: "20px",
                        padding: "10px 25px",
                        background: "#ff4d4f",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
                          </div>

            {/* Right Side Order Summary */}
            <div
              style={{
                width: "350px",
                position: "sticky",
                top: "20px",
              }}
            >
              <OrderSummary totalPrice={totalPrice} />

              {/* Coupon Section */}
              <div
                style={{
                  background: "#fff",
                  marginTop: "20px",
                  padding: "20px",
                  borderRadius: "12px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                }}
              >
                <h3>🎁 Apply Coupon</h3>

                <input
                  type="text"
                  placeholder="Enter Coupon Code"
                  style={{
                    width: "100%",
                    padding: "12px",
                    marginTop: "15px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />

                <button
                  style={{
                    width: "100%",
                    marginTop: "15px",
                    padding: "12px",
                    background: "#00bcd4",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Apply Coupon
                </button>
              </div>

              {/* Secure Checkout */}
              <div
                style={{
                  background: "#fff",
                  marginTop: "20px",
                  padding: "20px",
                  borderRadius: "12px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                }}
              >
                <h3>🔒 Secure Checkout</h3>

                <p
                  style={{
                    color: "#666",
                    marginTop: "10px",
                    lineHeight: "24px",
                  }}
                >
                  ✓ 100% Secure Payment
                  <br />
                  ✓ Fast Delivery
                  <br />
                  ✓ Easy Returns
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Cart;