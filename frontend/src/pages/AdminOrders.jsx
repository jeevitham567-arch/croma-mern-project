import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../services/api";

function AdminOrders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!user || !token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    if (user.role !== "admin") {
      alert("Access denied. Admin only.");
      navigate("/");
      return;
    }

    getOrders();
  };

  const getOrders = async () => {
    try {
      const res = await API.get("/orders/admin/all");

      setOrders(res.data.orders || []);
    } catch (error) {
      console.log("Admin Orders Error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to load orders"
      );
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/orders/admin/${id}/status`, {
        status,
      });

      alert("Order status updated successfully");

      getOrders();
    } catch (error) {
      console.log("Status Update Error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to update order status"
      );
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
        <div
          style={{
            maxWidth: "1200px",
            margin: "auto",
          }}
        >
          <h1 style={{ marginBottom: "10px" }}>
            📦 Admin Orders
          </h1>

          <p
            style={{
              color: "#777",
              marginBottom: "30px",
            }}
          >
            Manage all customer orders from here.
          </p>

          {orders.length === 0 ? (
            <div
              style={{
                background: "#fff",
                padding: "50px",
                borderRadius: "12px",
                textAlign: "center",
              }}
            >
              <h2>No Orders Found</h2>

              <p style={{ color: "#777" }}>
                Customer orders will appear here.
              </p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order._id}
                style={{
                  background: "#fff",
                  padding: "25px",
                  marginBottom: "25px",
                  borderRadius: "12px",
                  boxShadow:
                    "0 3px 10px rgba(0,0,0,0.08)",
                }}
              >
                {/* Order Header */}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "20px",
                    marginBottom: "20px",
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
                    <h3>Customer</h3>

                    <p>
                      {order.user?.name ||
                        "Unknown User"}
                    </p>

                    <p
                      style={{
                        color: "#777",
                      }}
                    >
                      {order.user?.email || ""}
                    </p>
                  </div>

                  <div>
                    <h3>Order Date</h3>

                    <p>
                      {order.createdAt
                        ? new Date(
                            order.createdAt
                          ).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                </div>

                <hr />

                {/* Products */}

                <h3
                  style={{
                    marginTop: "20px",
                    marginBottom: "15px",
                  }}
                >
                  Products
                </h3>

                {order.items?.map(
                  (item, index) => (
                    <div
                      key={
                        item._id || index
                      }
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                        padding: "15px 0",
                        borderBottom:
                          "1px solid #eee",
                      }}
                    >
                      {item.product?.image ? (
                        <img
                          src={`http://localhost:5000/uploads/${item.product.image}`}
                          alt={
                            item.product.name ||
                            "Product"
                          }
                          style={{
                            width: "70px",
                            height: "70px",
                            objectFit: "contain",
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: "70px",
                            height: "70px",
                            background:
                              "#f5f5f5",
                            display: "flex",
                            justifyContent:
                              "center",
                            alignItems:
                              "center",
                            fontSize: "25px",
                          }}
                        >
                          📦
                        </div>
                      )}

                      <div>
                        <h4>
                          {item.product?.name ||
                            "Product"}
                        </h4>

                        <p
                          style={{
                            color: "#777",
                          }}
                        >
                          Quantity:{" "}
                          {item.quantity || 1}
                        </p>

                        <p
                          style={{
                            color: "#00b894",
                            fontWeight:
                              "bold",
                          }}
                        >
                          ₹{" "}
                          {Number(
                            item.product?.price ||
                              0
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )
                )}

                {/* Total */}

                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems: "center",
                    marginTop: "25px",
                    flexWrap: "wrap",
                    gap: "15px",
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

                <div
                  style={{
                    marginTop: "20px",
                  }}
                >
                  <label
                    style={{
                      display: "block",
                      fontWeight: "bold",
                      marginBottom: "8px",
                    }}
                  >
                    Order Status
                  </label>

                  <select
                    value={
                      order.status ||
                      "Pending"
                    }
                    onChange={(e) =>
                      updateStatus(
                        order._id,
                        e.target.value
                      )
                    }
                    style={{
                      padding: "10px 15px",
                      borderRadius: "8px",
                      border:
                        "1px solid #ccc",
                      cursor: "pointer",
                      fontSize: "15px",
                    }}
                  >
                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Confirmed">
                      Confirmed
                    </option>

                    <option value="Shipped">
                      Shipped
                    </option>

                    <option value="Delivered">
                      Delivered
                    </option>

                    <option value="Cancelled">
                      Cancelled
                    </option>
                  </select>
                </div>

                {/* Address */}

                {order.address && (
                  <div
                    style={{
                      marginTop: "20px",
                      padding: "15px",
                      background:
                        "#f8f9fa",
                      borderRadius: "8px",
                    }}
                  >
                    <h3>
                      📍 Delivery Address
                    </h3>

                    <p
                      style={{
                        color: "#555",
                        lineHeight:
                          "24px",
                      }}
                    >
                      <b>
                        {order.address.name}
                      </b>
                      <br />

                      {order.address.address}
                      <br />

                      {order.address.city},{" "}
                      {order.address.state}
                      <br />

                      Pincode:{" "}
                      {order.address.pincode}
                      <br />

                      Phone:{" "}
                      {order.address.phone}
                    </p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default AdminOrders;