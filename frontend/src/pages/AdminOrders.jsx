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
      console.log("Get Admin Orders Error:", error);

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
      await API.put(
        `/orders/admin/${id}/status`,
        {
          status,
        }
      );

      alert("Order status updated successfully");

      getOrders();
    } catch (error) {
      console.log("Update Status Error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to update order status"
      );
    }
  };

  const getStatusColor = (status) => {
    if (status === "Delivered") return "green";
    if (status === "Cancelled") return "red";
    if (status === "Shipped") return "#6c5ce7";
    if (status === "Confirmed") return "#0984e3";

    return "#f39c12";
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          background: "#f5f5f5",
          minHeight: "80vh",
          padding: "40px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "auto",
          }}
        >
          <h1>Manage Orders</h1>

          <p
            style={{
              color: "#777",
              marginBottom: "30px",
            }}
          >
            View and manage all customer orders.
          </p>

          {loading ? (
            <h2>Loading orders...</h2>
          ) : orders.length === 0 ? (
            <div
              style={{
                background: "#fff",
                padding: "40px",
                borderRadius: "12px",
                textAlign: "center",
              }}
            >
              <h2>No Orders Found</h2>

              <p style={{ color: "#777" }}>
                There are no customer orders yet.
              </p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order._id}
                style={{
                  background: "#fff",
                  padding: "25px",
                  borderRadius: "12px",
                  marginBottom: "25px",
                  boxShadow:
                    "0 3px 10px rgba(0,0,0,0.08)",
                }}
              >
                {/* Order Header */}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "15px",
                    marginBottom: "20px",
                  }}
                >
                  <div>
                    <h2>
                      Order #
                      {order._id.slice(-6).toUpperCase()}
                    </h2>

                    <p
                      style={{
                        color: "#777",
                        marginTop: "5px",
                      }}
                    >
                      {new Date(
                        order.createdAt
                      ).toLocaleString()}
                    </p>
                  </div>

                  <div
                    style={{
                      background: getStatusColor(
                        order.status
                      ),
                      color: "#fff",
                      padding: "8px 16px",
                      borderRadius: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    {order.status}
                  </div>
                </div>

                {/* Customer */}

                <div
                  style={{
                    background: "#f8f8f8",
                    padding: "15px",
                    borderRadius: "8px",
                    marginBottom: "20px",
                  }}
                >
                  <h3>Customer</h3>

                  <p>
                    Name:{" "}
                    <strong>
                      {order.user?.name || "N/A"}
                    </strong>
                  </p>

                  <p>
                    Email:{" "}
                    <strong>
                      {order.user?.email || "N/A"}
                    </strong>
                  </p>

                  <p>
                    Address:{" "}
                    <strong>
                      {order.address}
                    </strong>
                  </p>
                </div>

                {/* Products */}

                <h3>Products</h3>

                <div
                  style={{
                    marginTop: "15px",
                  }}
                >
                  {order.items?.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                        padding: "15px 0",
                        borderBottom:
                          "1px solid #eee",
                      }}
                    >
                      <img
                        src={
                          item.product?.image
                            ? `http://localhost:5000/uploads/${item.product.image}`
                            : ""
                        }
                        alt={
                          item.product?.name ||
                          "Product"
                        }
                        style={{
                          width: "70px",
                          height: "70px",
                          objectFit: "contain",
                        }}
                      />

                      <div style={{ flex: 1 }}>
                        <h3>
                          {item.product?.name ||
                            "Product"}
                        </h3>

                        <p
                          style={{
                            color: "#777",
                          }}
                        >
                          Quantity: {item.quantity}
                        </p>
                      </div>

                      <strong>
                        ₹{" "}
                        {(
                          item.price *
                          item.quantity
                        ).toLocaleString()}
                      </strong>
                    </div>
                  ))}
                </div>

                {/* Bottom */}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "25px",
                    flexWrap: "wrap",
                    gap: "20px",
                  }}
                >
                  <h2>
                    Total: ₹{" "}
                    {order.totalAmount?.toLocaleString()}
                  </h2>

                  <div>
                    <label
                      style={{
                        fontWeight: "bold",
                        marginRight: "10px",
                      }}
                    >
                      Update Status:
                    </label>

                    <select
                      value={order.status}
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
                </div>
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
