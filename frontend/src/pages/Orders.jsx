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

      console.log("Orders API Response:", res.data);

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

      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle address stored as String or Object
  const getAddress = (address) => {
    if (!address) return null;

    // If already an object
    if (typeof address === "object") {
      return address;
    }

    // If stored as JSON string
    try {
      return JSON.parse(address);
    } catch (error) {
      console.log("Address Parse Error:", error);

      // If old address is just normal text
      return {
        address: address,
      };
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
            <div style={{ fontSize: "60px" }}>📦</div>

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
                  {/* ORDER HEADER */}

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

                  {/* PRODUCTS */}

                  <h3 style={{ marginTop: "20px" }}>
                    Products
                  </h3>

                  {order.items?.length > 0 ? (
                    order.items.map((item, index) => (
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
                              justifyContent:
                                "center",
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
                            {item.product?.name ||
                              "Product"}
                          </h3>

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
                              fontWeight: "bold",
                            }}
                          >
                            ₹{" "}
                            {Number(
                              item.product?.price ||
                                item.price ||
                                0
                            ).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p style={{ color: "#777" }}>
                      No products found in this order.
                    </p>
                  )}

                  {/* TOTAL */}

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "25px",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "10px",
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

                  <div style={{ marginTop: "15px" }}>
                    <span
                      style={{
                        display: "inline-block",
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
                          color: "#555",
                          lineHeight: "24px",
                          marginBottom: 0,
                        }}
                      >
                        {address.name && (
                          <>
                            <b>{address.name}</b>
                            <br />
                          </>
                        )}

                        {address.address && (
                          <>
                            {address.address}
                            <br />
                          </>
                        )}

                        {(address.city ||
                          address.state) && (
                          <>
                            {address.city || ""}
                            {address.city &&
                            address.state
                              ? ", "
                              : ""}
                            {address.state || ""}
                            <br />
                          </>
                        )}

                        {address.pincode && (
                          <>
                            Pincode:{" "}
                            {address.pincode}
                            <br />
                          </>
                        )}

                        {address.phone && (
                          <>
                            Phone:{" "}
                            {address.phone}
                          </>
                        )}
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

export default Orders;