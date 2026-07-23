import { useEffect, useState } from "react";
import API from "../services/api";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const res = await API.get("/orders");
      setOrders(res.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          padding: "40px",
          background: "#f5f5f5",
          minHeight: "80vh",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          My Orders
        </h1>

        {orders.length === 0 ? (
          <h2
            style={{
              textAlign: "center",
              color: "gray",
            }}
          >
            No Orders Found
          </h2>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              style={{
                width: "90%",
                margin: "20px auto",
                background: "#fff",
                padding: "25px",
                borderRadius: "12px",
                boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
              }}
            >
              <h3>Order ID: {order._id}</h3>

              <p>
                <b>Status:</b>{" "}
                <span style={{ color: "green" }}>
                  {order.status}
                </span>
              </p>

              <p>
                <b>Total:</b> ₹ {order.totalAmount.toLocaleString()}
              </p>

              <p>
                <b>Date:</b>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>

              <hr />

              {order.items.map((item) => (
                <div
                  key={item._id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                    marginTop: "20px",
                  }}
                >
                  <img
                    src={`http://localhost:5000/uploads/${item.product.image}`}
                    alt={item.product.name}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "contain",
                    }}
                  />

                  <div>
                    <h3>{item.product.name}</h3>

                    <p>₹ {item.product.price}</p>

                    <p>Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>

      <Footer />
    </>
  );
}

export default Orders;