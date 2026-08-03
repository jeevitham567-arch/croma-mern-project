import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const res = await API.get("/orders/my-orders");

      setOrders(res.data || []);
    } catch (error) {
      console.log("Orders Error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to load orders"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <div
          style={{
            minHeight: "70vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2>Loading Orders...</h2>
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div
        style={{
          background: "#f5f5f5",
          minHeight: "100vh",
          padding: "40px 20px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          📦 My Orders
        </h1>

        {orders.length === 0 ? (
          <div
            style={{
              maxWidth: "600px",
              margin: "0 auto",
              background: "#fff",
              padding: "50px",
              borderRadius: "12px",
              textAlign: "center",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <h2>No Orders Yet</h2>

            <p style={{ color: "#777" }}>
              Your placed orders will appear here.
            </p>
          </div>
        ) : (
          <div
            style={{
              maxWidth: "1000px",
              margin: "0 auto",
            }}
          >
            {orders.map((order) => (
              <div
                key={order._id}
                style={{
                  background: "#fff",
                  padding: "25px",
                  marginBottom: "25px",
                  borderRadius: "12px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                }}
              >
                {/* Order Header */}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "20px",
                    flexWrap: "wrap",
                    gap: "15px",
                  }}
                >
                  <div>
                    <h3>Order ID</h3>

                    <p
                      style={{
                        color: "#777",
                        wordBreak: "break-all",
                      }}
                    >
                      {order._id}
                    </p>
                  </div>

                  <div>
                    <p style={{ color: "#777" }}>
                      Order Date
                    </p>

                    <b>
                      {order.createdAt
                        ? new Date(
                            order.createdAt
                          ).toLocaleDateString()
                        : "N/A"}
                    </b>
                  </div>
                </div>

                <hr />

                {/* Products */}

                <h3 style={{ marginTop: "20px" }}>
                  Products
                </h3>

                {order.items?.map((item, index) => (
                  <div
                    key={item._id || index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "20px",
                      padding: "15px 0",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    {item.product?.image ? (
                      <img
                        src={`http://localhost:5000/uploads/${item.product.image}`}
                        alt={item.product.name || "Product"}
                        style={{
                          width: "90px",
                          height: "90px",
                          objectFit: "contain",
                          borderRadius: "8px",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "90px",
                          height: "90px",
                          background: "#f5f5f5",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "8px",
                          fontSize: "30px",
                        }}
                      >
                        📦
                      </div>
                    )}

                    <div>
                      <h3>
                        {item.product?.name || "Product"}
                      </h3>

                      <p style={{ color: "#777" }}>
                        Quantity: {item.quantity || 1}
                      </p>

                      <p
                        style={{
                          color: "#00b894",
                          fontWeight: "bold",
                        }}
                      >
                        ₹{" "}
                        {Number(
                          item.product?.price || 0
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Total */}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "25px",
                  }}
                >
                  <h3>Total Amount</h3>

                  <h2
                    style={{
                      color: "#00b894",
                    }}
                  >
                    ₹{" "}
                    {Number(
                      order.totalAmount || 0
                    ).toLocaleString()}
                  </h2>
                </div>

                {/* Status */}

                <div style={{ marginTop: "15px" }}>
                  <span
                    style={{
                      background: "#e3f2fd",
                      color: "#1565c0",
                      padding: "8px 15px",
                      borderRadius: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    Order Status:{" "}
                    {order.status || "Pending"}
                  </span>
                </div>

                {/* Address */}

                {order.address && (
                  <div
                    style={{
                      marginTop: "25px",
                      padding: "15px",
                      background: "#f8f9fa",
                      borderRadius: "8px",
                    }}
                  >
                    <h3>📍 Delivery Address</h3>

                    <p
                      style={{
                        color: "#555",
                        lineHeight: "24px",
                      }}
                    >
                      <b>{order.address.name}</b>
                      <br />

                      {order.address.address}
                      <br />

                      {order.address.city},{" "}
                      {order.address.state}
                      <br />

                      Pincode: {order.address.pincode}
                      <br />

                      Phone: {order.address.phone}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Orders;