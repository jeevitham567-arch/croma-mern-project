import { useEffect, useState } from "react";
import API from "../services/api";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
    await API.put(`/cart/${id}`, {
      quantity,
    });

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
          <>
            {cart.map((item) => (
              <div
                key={item._id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "90%",
                  margin: "20px auto",
                  padding: "25px",
                  border: "1px solid #ddd",
                  borderRadius: "12px",
                  background: "#fff",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                }}
              >
                {/* Left Section */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "30px",
                    flex: 1,
                  }}
                >
                  <img
                    src={`http://localhost:5000/uploads/${item.product.image}`}
                    alt={item.product.name}
                    style={{
                      width: "180px",
                      height: "180px",
                      objectFit: "contain",
                    }}
                  />

                  <div
                    style={{
                      flex: 1,
                    }}
                  >
                    <h2
  style={{
    fontSize: "24px",
    marginBottom: "10px",
  }}
>
  {item.product.name}
</h2>

<p
  style={{
    color: "#666",
    marginBottom: "10px",
    fontSize: "15px",
  }}
>
  {item.product.description}
</p>

<p
  style={{
    color: "#f5a623",
    fontWeight: "bold",
    marginBottom: "10px",
  }}
>
  ⭐ {item.product.rating}
</p>

<h2
  style={{
    color: "#00b894",
    marginBottom: "5px",
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
  MRP ₹ {(item.product.price + 5000).toLocaleString()}
</p>

<p
  style={{
    color: "green",
    fontWeight: "bold",
    marginBottom: "15px",
  }}
>
  Save ₹5,000
</p>

<p
  style={{
    color: "#444",
    marginBottom: "20px",
  }}
>
  🚚 Delivery by <b>25 July</b>
</p>

<h4
  style={{
    marginBottom: "10px",
  }}
>
  Quantity
</h4>

<div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "15px",
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
      fontSize: "20px",
    }}
  >
    -
  </button>

  <span
    style={{
      fontSize: "20px",
      fontWeight: "bold",
      minWidth: "20px",
      textAlign: "center",
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
      border: "none",
      background: "#00c7a5",
      color: "#fff",
      cursor: "pointer",
      fontSize: "20px",
    }}
  >
    +
  </button>
</div>

<div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "15px",
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
      fontSize: "20px",
    }}
  >
    -
  </button>

  <span
    style={{
      fontSize: "20px",
      fontWeight: "bold",
      minWidth: "20px",
      textAlign: "center",
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
      border: "none",
      background: "#00c7a5",
      color: "#fff",
      cursor: "pointer",
      fontSize: "20px",
    }}
  >
    +
  </button>
</div>
                  </div>
                </div>

                {/* Right Section */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "20px",
                  }}
                >
                  <button
                    onClick={() => removeItem(item._id)}
                    style={{
                      padding: "12px 25px",
                      background: "#ff4d4f",
                      color: "#fff",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div
              style={{
                width: "90%",
                margin: "40px auto",
                textAlign: "right",
              }}
            >
              <h2
                style={{
                  color: "#00bcd4",
                  marginBottom: "20px",
                }}
              >
                Grand Total : ₹ {totalPrice.toLocaleString()}
              </h2>

              <button
                style={{
                  padding: "15px 35px",
                  background: "#00bcd4",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Proceed To Checkout
              </button>
            </div>
          </>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Cart;