import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

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
          background: "#000",
          color: "#fff",
          minHeight: "75vh",
          padding: "30px 7%",
        }}
      >
        {/* Heading */}
        <h2
          style={{
            fontSize: "24px",
            marginBottom: "25px",
            fontWeight: "700",
            color: "#fff",
          }}
        >
          YOUR CART
        </h2>

        {cart.length === 0 ? (
          <div
            style={{
              background: "#151515",
              color: "#fff",
              padding: "50px",
              textAlign: "center",
              borderRadius: "8px",
              border: "1px solid #292929",
            }}
          >
            <h2>Your Cart is Empty</h2>

            <button
              onClick={() => navigate("/")}
              style={{
                marginTop: "20px",
                padding: "12px 28px",
                border: "none",
                borderRadius: "5px",
                background: "#00c8a0",
                color: "#fff",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 350px",
              gap: "20px",
              alignItems: "start",
            }}
          >
            {/* LEFT SIDE */}
            <div>
              {/* Coupon */}
              <div
                style={{
                  background: "#151515",
                  padding: "18px 20px",
                  borderRadius: "6px",
                  marginBottom: "15px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  border: "1px solid #292929",
                }}
              >
                <div>
                  <span
                    style={{
                      fontSize: "20px",
                      color: "#00c8a0",
                    }}
                  >
                    %
                  </span>

                  <span
                    style={{
                      marginLeft: "15px",
                      fontSize: "17px",
                      fontWeight: "600",
                      color: "#fff",
                    }}
                  >
                    Apply Coupon
                  </span>
                </div>

                <span
                  style={{
                    fontSize: "25px",
                    color: "#aaa",
                  }}
                >
                  ›
                </span>
              </div>

              {/* Products */}
              {cart.map((item) => (
                <div
                  key={item._id}
                  style={{
                    background: "#151515",
                    padding: "22px",
                    borderRadius: "6px",
                    marginBottom: "15px",
                    border: "1px solid #292929",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "22px",
                    }}
                  >
                    {/* Product Image */}
                    <div
                      style={{
                        width: "140px",
                        height: "140px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        background: "#fff",
                        borderRadius: "6px",
                      }}
                    >
                      <img
                        src={`http://localhost:5000/uploads/${item.product.image}`}
                        alt={item.product.name}
                        style={{
                          width: "125px",
                          height: "125px",
                          objectFit: "contain",
                        }}
                      />
                    </div>

                    {/* Product Details */}
                    <div style={{ flex: 1 }}>
                      <h3
                        style={{
                          margin: "0 0 8px",
                          fontSize: "18px",
                          lineHeight: "1.4",
                          color: "#fff",
                        }}
                      >
                        {item.product.name}
                      </h3>

                      {/* Rating */}
                      <div
                        style={{
                          color: "#00c8a0",
                          fontSize: "15px",
                          marginBottom: "8px",
                        }}
                      >
                        ★★★★
                        <span style={{ color: "#555" }}>★</span>
                      </div>

                      {/* Price */}
                      <div
                        style={{
                          fontSize: "22px",
                          fontWeight: "700",
                          color: "#fff",
                        }}
                      >
                        ₹{item.product.price.toLocaleString()}
                      </div>

                      {/* MRP */}
                      <div
                        style={{
                          marginTop: "4px",
                          color: "#777",
                          textDecoration: "line-through",
                          fontSize: "14px",
                        }}
                      >
                        ₹{(item.product.price + 5000).toLocaleString()}
                      </div>

                      {/* Delivery */}
                      <div
                        style={{
                          color: "#aaa",
                          fontSize: "14px",
                          marginTop: "7px",
                        }}
                      >
                        Standard Delivery by 25 July
                      </div>

                      {/* Quantity + Remove */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "14px",
                          marginTop: "16px",
                          flexWrap: "wrap",
                        }}
                      >
                        <button
                          onClick={() => decreaseQuantity(item)}
                          style={quantityButton}
                        >
                          −
                        </button>

                        <span
                          style={{
                            fontWeight: "600",
                            fontSize: "16px",
                            color: "#fff",
                          }}
                        >
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => increaseQuantity(item)}
                          style={quantityButton}
                        >
                          +
                        </button>

                        <button
                          onClick={() => removeItem(item._id)}
                          style={{
                            marginLeft: "12px",
                            padding: "8px 24px",
                            background: "#151515",
                            color: "#fff",
                            border: "1px solid #555",
                            borderRadius: "5px",
                            cursor: "pointer",
                            fontWeight: "600",
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Offer */}
                  <div
                    style={{
                      borderTop: "1px solid #292929",
                      marginTop: "18px",
                      paddingTop: "13px",
                      color: "#aaa",
                      fontSize: "14px",
                    }}
                  >
                    <span
                      style={{
                        color: "#00c8a0",
                        fontSize: "18px",
                        marginRight: "10px",
                      }}
                    >
                      ✓
                    </span>

                    Buy & Get Offer Applied
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT SIDE */}
            <div
              style={{
                position: "sticky",
                top: "90px",
              }}
            >
              {/* Order Summary */}
              <div
                style={{
                  background: "#151515",
                  padding: "20px",
                  borderRadius: "6px",
                  border: "1px solid #292929",
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    fontSize: "20px",
                    fontWeight: "700",
                    color: "#fff",
                  }}
                >
                  Order Summary ({cart.length} item
                  {cart.length > 1 ? "s" : ""})
                </h2>

                {/* Original Price */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "22px",
                    color: "#aaa",
                    fontSize: "15px",
                  }}
                >
                  <span>Original Price</span>

                  <span style={{ color: "#fff" }}>
                    ₹{totalPrice.toLocaleString()}
                  </span>
                </div>

                {/* Savings */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "15px",
                    color: "#aaa",
                    fontSize: "15px",
                  }}
                >
                  <span>Savings</span>

                  <span
                    style={{
                      color: "#00c8a0",
                      fontWeight: "600",
                    }}
                  >
                    + ₹5,000
                  </span>
                </div>

                <hr
                  style={{
                    border: "none",
                    borderTop: "1px solid #292929",
                    margin: "18px 0",
                  }}
                />

                {/* Total */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "18px",
                    fontWeight: "700",
                    color: "#fff",
                  }}
                >
                  <span>Total</span>

                  <span>
                    ₹{totalPrice.toLocaleString()}
                  </span>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={() => navigate("/checkout")}
                  style={{
                    width: "100%",
                    marginTop: "20px",
                    padding: "13px",
                    border: "none",
                    borderRadius: "5px",
                    background: "#00c8a0",
                    color: "#fff",
                    fontSize: "16px",
                    fontWeight: "700",
                    cursor: "pointer",
                  }}
                >
                  Checkout
                </button>
              </div>

              {/* Secure Checkout */}
              <div
                style={{
                  background: "#151515",
                  marginTop: "15px",
                  padding: "18px",
                  borderRadius: "6px",
                  border: "1px solid #292929",
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontSize: "16px",
                    color: "#fff",
                  }}
                >
                  🔒 Secure Checkout
                </h3>

                <p
                  style={{
                    color: "#aaa",
                    fontSize: "13px",
                    lineHeight: "22px",
                    marginBottom: 0,
                    marginTop: "10px",
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

const quantityButton = {
  width: "32px",
  height: "32px",
  borderRadius: "50%",
  border: "1px solid #555",
  background: "#222",
  color: "#fff",
  cursor: "pointer",
  fontSize: "18px",
};

export default Cart;