import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../services/api";

function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const res = await API.get("/orders");

      console.log("Admin Orders:", res.data);

      if (Array.isArray(res.data)) {
        setOrders(res.data);
      } else if (Array.isArray(res.data.orders)) {
        setOrders(res.data.orders);
      } else {
        setOrders([]);
      }
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

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/orders/${id}/status`, {
        status,
      });

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

  // Convert saved JSON address string into object
  const getAddress = (address) => {
    if (!address) return null;

    if (typeof address === "object") {
      return address;
    }

    try {
      return JSON.parse(address);
    } catch (error) {
      console.log("Address Parse Error:", error);
      return null;
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
          📦 Manage Orders
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
            }}
          >
            <h2>No Orders Found</h2>

            <p style={{ color: "#777" }}>
              Customer orders will appear here.
            </p>
          </div>
        ) : (
          <div
            style={{
              maxWidth: "1100px",
              margin: "0 auto",
            }}
          >
            {orders.map((order) => {
              const address = getAddress(order.address);

              return (
                <div
                  key={order._id}
                  style={{
                    background: "#fff",
                    padding: "25px",
                    marginBottom: "25px",
                    borderRadius: "12px",
                    boxShadow:
                      "0 2px 10px rgba(0,0,0,0.1)",
                  }}
                >
                  {/* ORDER DETAILS */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
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

                  {/* CUSTOMER */}
                  <h3 style={{ marginTop: "20px" }}>
                    Customer
                  </h3>

                  <p>
                    <b>Name:</b>{" "}
                    {order.user?.name || "Customer"}
                  </p>

                  <p>
                    <b>Email:</b>{" "}
                    {order.user?.email || "N/A"}
                  </p>

                  {/* PRODUCTS */}
                  <h3 style={{ marginTop: "25px" }}>
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
                            width: "80px",
                            height: "80px",
                            objectFit: "contain",
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: "80px",
                            height: "80px",
                            background: "#f5f5f5",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
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

                        <p>
                          Quantity:{" "}
                          {item.quantity || 1}
                        </p>

                        <p
                          style={{
                            color: "#00b894",
                            fontWeight: "bold",
                          }}
                        >
                          ₹{" "}
                          {Number(
                            item.price ||
                              item.product?.price ||
                              0
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* TOTAL + STATUS */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "25px",
                      flexWrap: "wrap",
                      gap: "15px",
                    }}
                  >
                    <h2>
                      Total: ₹{" "}
                      {Number(
                        order.totalAmount || 0
                      ).toLocaleString()}
                    </h2>

                    <select
                      value={
                        order.status || "Pending"
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
                        border: "1px solid #ccc",
                        fontSize: "15px",
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

                  {/* DELIVERY ADDRESS */}
                  {address && (
                    <div
                      style={{
                        marginTop: "25px",
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
                          lineHeight: "24px",
                          color: "#555",
                        }}
                      >
                        <b>
                          {address.name || "N/A"}
                        </b>
                        <br />

                        {address.address || "N/A"}
                        <br />

                        {address.city || "N/A"},{" "}
                        {address.state || "N/A"}
                        <br />

                        Pincode:{" "}
                        {address.pincode || "N/A"}
                        <br />

                        Phone:{" "}
                        {address.phone || "N/A"}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default ManageOrders;