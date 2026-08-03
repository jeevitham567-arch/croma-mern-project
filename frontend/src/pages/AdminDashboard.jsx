import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../services/api";

function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = () => {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

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

    getDashboardStats();
    getProducts();
  };

  const getDashboardStats = async () => {
    try {
      setLoading(true);

      const res = await API.get("/admin/stats");

      setStats(
        res.data.stats || {
          totalProducts: 0,
          totalOrders: 0,
          totalUsers: 0,
          totalRevenue: 0,
        }
      );
    } catch (error) {
      console.log(
        "Dashboard Stats Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Unable to load dashboard statistics"
      );
    } finally {
      setLoading(false);
    }
  };

  const getProducts = async () => {
    try {
      const res = await API.get("/products");

      setProducts(
        res.data.products || []
      );
    } catch (error) {
      console.log(
        "Products Error:",
        error
      );
    }
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
          <h1
            style={{
              marginBottom: "10px",
            }}
          >
            Admin Dashboard
          </h1>

          <p
            style={{
              color: "#777",
              marginBottom: "30px",
            }}
          >
            Manage your Croma store from here.
          </p>

          {/* Dashboard Cards */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(220px,1fr))",
              gap: "20px",
            }}
          >
            {/* PRODUCTS */}

            <div style={cardStyle}>
              <div style={iconStyle}>
                📦
              </div>

              <h3>Total Products</h3>

              <h1>
                {loading
                  ? "..."
                  : stats.totalProducts}
              </h1>
            </div>

            {/* ORDERS */}

            <div style={cardStyle}>
              <div style={iconStyle}>
                🛒
              </div>

              <h3>Total Orders</h3>

              <h1>
                {loading
                  ? "..."
                  : stats.totalOrders}
              </h1>
            </div>

            {/* USERS */}

            <div style={cardStyle}>
              <div style={iconStyle}>
                👥
              </div>

              <h3>Total Users</h3>

              <h1>
                {loading
                  ? "..."
                  : stats.totalUsers}
              </h1>
            </div>

            {/* REVENUE */}

            <div style={cardStyle}>
              <div style={iconStyle}>
                💰
              </div>

              <h3>Revenue</h3>

              <h1>
                ₹{" "}
                {loading
                  ? "..."
                  : stats.totalRevenue.toLocaleString()}
              </h1>
            </div>
          </div>

          {/* ADMIN ACTIONS */}

          <div
            style={{
              background: "#fff",
              marginTop: "35px",
              padding: "30px",
              borderRadius: "12px",
              boxShadow:
                "0 3px 10px rgba(0,0,0,0.08)",
            }}
          >
            <h2>Admin Actions</h2>

            <div
              style={{
                display: "flex",
                gap: "15px",
                flexWrap: "wrap",
                marginTop: "20px",
              }}
            >
              <button
                onClick={() =>
                  navigate("/admin/products")
                }
                style={buttonStyle}
              >
                📦 Manage Products
              </button>

              <button
                onClick={() =>
                  navigate("/admin/add-product")
                }
                style={buttonStyle}
              >
                ➕ Add Product
              </button>

              <button
                 onClick={() =>
                 navigate("/admin/orders")
                 }
                 style={{
                 ...buttonStyle,
                 background: "#6c5ce7",
                }}
              >
  🛒 Manage Orders
</button>
            </div>
          </div>

          {/* RECENT PRODUCTS */}

          <div
            style={{
              background: "#fff",
              marginTop: "30px",
              padding: "30px",
              borderRadius: "12px",
              boxShadow:
                "0 3px 10px rgba(0,0,0,0.08)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h2>Products</h2>

              <button
                onClick={() =>
                  navigate("/admin/products")
                }
                style={{
                  border: "none",
                  background:
                    "transparent",
                  color: "#00b894",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                View All →
              </button>
            </div>

            {products.length === 0 ? (
              <p
                style={{
                  color: "#777",
                }}
              >
                No products found.
              </p>
            ) : (
              products
                .slice(0, 5)
                .map((product) => (
                  <div
                    key={product._id}
                    style={{
                      display: "flex",
                      alignItems:
                        "center",
                      gap: "20px",
                      padding: "15px 0",
                      borderBottom:
                        "1px solid #eee",
                    }}
                  >
                    {/* Product Image */}

                    <img
                      src={`http://localhost:5000/uploads/${product.image}`}
                      alt={product.name}
                      style={{
                        width: "70px",
                        height: "70px",
                        objectFit:
                          "contain",
                      }}
                    />

                    {/* Product Details */}

                    <div
                      style={{
                        flex: 1,
                      }}
                    >
                      <h3>
                        {product.name}
                      </h3>

                      <p
                        style={{
                          color: "#777",
                          marginTop: "5px",
                        }}
                      >
                        {product.category}
                      </p>
                    </div>

                    {/* Price */}

                    <strong>
                      ₹{" "}
                      {product.price?.toLocaleString()}
                    </strong>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

const cardStyle = {
  background: "#fff",
  padding: "30px",
  borderRadius: "12px",
  textAlign: "center",
  boxShadow:
    "0 3px 10px rgba(0,0,0,.1)",
};

const iconStyle = {
  fontSize: "35px",
  marginBottom: "10px",
};

const buttonStyle = {
  padding: "13px 20px",
  background: "#00b894",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default AdminDashboard;