import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../services/api";

function AdminOrders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    checkAdmin();
  }, []);

  // ================================
  // CHECK ADMIN
  // ================================
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

  // ================================
  // GET ALL ORDERS
  // ================================
  const getOrders = async () => {
    try {
      setLoading(true);

      const res = await API.get("/orders/admin/all");

      setOrders(
        Array.isArray(res.data.orders)
          ? res.data.orders
          : []
      );
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

  // ================================
  // UPDATE ORDER STATUS
  // ================================
  const updateStatus = async (id, status) => {
    try {
      setUpdatingId(id);

      const res = await API.put(
        `/orders/admin/${id}/status`,
        {
          status,
        }
      );

      alert(
        res.data?.message ||
          "Order status updated successfully"
      );

      // Update status immediately in UI
      setOrders((previousOrders) =>
        previousOrders.map((order) =>
          order._id === id
            ? {
                ...order,
                status,
              }
            : order
        )
      );
    } catch (error) {
      console.log(
        "Status Update Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Unable to update order status"
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // ================================
  // LOADING
  // ================================
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

  // ================================
  // PAGE
  // ================================
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
          {/* HEADER */}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "15px",
              marginBottom: "30px",
            }}
          >
            <div>
              <h1 style={{ marginBottom: "8px" }}>
                📦 Admin Orders
              </h1>

              <p style={{ color: "#777" }}>
                Manage all customer orders from here.
              </p>
            </div>

            <button
              onClick={() => navigate("/admin")}
              style={{
                padding: "12px 20px",
                background: "#00b894",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              ← Dashboard
            </button>
          </div>

          {/* NO ORDERS */}

          {orders.length === 0 ? (
            <div
              style={{
                background: "#fff",
                padding: "50px",
                borderRadius: "12px",
                textAlign: "center",
                boxShadow:
                  "0 3px 10px rgba(0,0,0,0.08)",
              }}
            >
              <h2>No Orders Found</h2>

              <p
                style={{
                  color: "#777",
                  marginTop: "10px",
                }}
              >
                Customer orders will appear here.
              </p>
            </div>
          ) : (
            /* ORDERS */

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
                {/* ORDER HEADER */}

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit,minmax(220px,1fr))",
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
                        marginTop: "5px",
                      }}
                    >
                      {order._id}
                    </p>
                  </div>

                  <div>
                    <h3>Customer</h3>

                    <p style={{ marginTop: "5px" }}>
                      {order.user?.name ||
                        "Unknown User"}
                    </p>

                    <p
                      style={{
                        color: "#777",
                        marginTop: "4px",
                      }}
                    >
                      {order.user?.email || ""}
                    </p>
                  </div>

                  <div>
                    <h3>Order Date</h3>

                    <p style={{ marginTop: "5px" }}>
                      {order.createdAt
                        ? new Date(
                            order.createdAt
                          ).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                </div>

                <hr />

                {/* PRODUCTS */}

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
                            borderRadius: "8px",
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: "70px",
                            height: "70px",
                            background: "#f5f5f5",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "25px",
                            borderRadius: "8px",
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
                            marginTop: "5px",
                          }}
                        >
                          Quantity:{" "}
                          {item.quantity || 1}
                        </p>

                        <p
                          style={{
                            color: "#00b894",
                            fontWeight: "bold",
                            marginTop: "5px",
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

                {/* TOTAL */}

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

                {/* STATUS */}

                <div
                  style={{
                    marginTop: "20px",
                    padding: "15px",
                    background: "#f8f9fa",
                    borderRadius: "8px",
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
                    disabled={
                      updatingId === order._id
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
                      cursor:
                        updatingId === order._id
                          ? "not-allowed"
                          : "pointer",
                      fontSize: "15px",
                      minWidth: "180px",
                      background: "#fff",
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

                  {updatingId ===
                    order._id && (
                    <span
                      style={{
                        marginLeft: "12px",
                        color: "#777",
                      }}
                    >
                      Updating...
                    </span>
                  )}
                </div>

                {/* ADDRESS */}

                {order.address && (
                  <div
                    style={{
                      marginTop: "20px",
                      padding: "15px",
                      background: "#f8f9fa",
                      borderRadius: "8px",
                    }}
                  >
                    <h3>
                      📍 Delivery Address
                    </h3>

                    <p
                      style={{
                        color: "#555",
                        lineHeight: "24px",
                        marginTop: "8px",
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