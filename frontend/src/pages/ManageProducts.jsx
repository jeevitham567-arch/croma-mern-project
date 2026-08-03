import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ManageProducts() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      setLoading(true);

      const res = await API.get("/products");

      setProducts(res.data.products || []);
    } catch (error) {
      console.log("Products Error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to load products"
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/products/${id}`);

      alert("Product Deleted Successfully");

      getProducts();
    } catch (error) {
      console.log("Delete Product Error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to delete product"
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
          padding: "40px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {/* Header */}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "15px",
              flexWrap: "wrap",
              marginBottom: "30px",
            }}
          >
            <div>
              <h1>Manage Products</h1>

              <p
                style={{
                  color: "#777",
                  marginTop: "8px",
                }}
              >
                Total Products: {products.length}
              </p>
            </div>

            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <button
                onClick={() => navigate("/admin")}
                style={{
                  padding: "12px 20px",
                  background: "#555",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                ← Dashboard
              </button>

              <button
                onClick={() =>
                  navigate("/admin/add-product")
                }
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
                + Add Product
              </button>
            </div>
          </div>

          {/* Loading */}

          {loading ? (
            <div
              style={{
                background: "#fff",
                padding: "60px",
                textAlign: "center",
                borderRadius: "12px",
              }}
            >
              <h2>Loading Products...</h2>
            </div>
          ) : products.length === 0 ? (
            /* Empty */

            <div
              style={{
                background: "#fff",
                padding: "60px",
                textAlign: "center",
                borderRadius: "12px",
                boxShadow:
                  "0 3px 10px rgba(0,0,0,0.08)",
              }}
            >
              <h2>No Products Found</h2>

              <p
                style={{
                  color: "#777",
                  margin: "10px 0 25px",
                }}
              >
                Start adding products to your store.
              </p>

              <button
                onClick={() =>
                  navigate("/admin/add-product")
                }
                style={{
                  padding: "12px 25px",
                  background: "#00b894",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                + Add Product
              </button>
            </div>
          ) : (
            /* Products */

            <div
              style={{
                background: "#fff",
                borderRadius: "12px",
                overflowX: "auto",
                boxShadow:
                  "0 3px 10px rgba(0,0,0,0.08)",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  minWidth: "850px",
                }}
              >
                <thead
                  style={{
                    background: "#00bcd4",
                    color: "#fff",
                  }}
                >
                  <tr>
                    <th style={thStyle}>Image</th>

                    <th style={thStyle}>ID</th>

                    <th style={thStyle}>Name</th>

                    <th style={thStyle}>Price</th>

                    <th style={thStyle}>
                      Category
                    </th>

                    <th style={thStyle}>Stock</th>

                    <th style={thStyle}>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product._id}
                      style={{
                        borderBottom:
                          "1px solid #eee",
                      }}
                    >
                      {/* Image */}

                      <td style={tdStyle}>
                        <img
                          src={`http://localhost:5000/uploads/${product.image}`}
                          alt={product.name}
                          style={{
                            width: "70px",
                            height: "70px",
                            objectFit: "contain",
                          }}
                        />
                      </td>

                      {/* ID */}

                      <td style={tdStyle}>
                        {product._id.slice(-6)}
                      </td>

                      {/* Name */}

                      <td
                        style={{
                          ...tdStyle,
                          textAlign: "left",
                          fontWeight: "bold",
                        }}
                      >
                        {product.name}
                      </td>

                      {/* Price */}

                      <td style={tdStyle}>
                        ₹{" "}
                        {product.price?.toLocaleString()}
                      </td>

                      {/* Category */}

                      <td style={tdStyle}>
                        {product.category}
                      </td>

                      {/* Stock */}

                      <td style={tdStyle}>
                        <span
                          style={{
                            padding: "6px 12px",
                            borderRadius: "20px",
                            background:
                              product.stock > 0
                                ? "#d4edda"
                                : "#f8d7da",
                            color:
                              product.stock > 0
                                ? "#155724"
                                : "#721c24",
                            fontWeight: "bold",
                          }}
                        >
                          {product.stock > 0
                            ? product.stock
                            : "Out of Stock"}
                        </span>
                      </td>

                      {/* Actions */}

                      <td style={tdStyle}>
                        <Link
                          to={`/admin/edit-product/${product._id}`}
                        >
                          <button
                            style={{
                              background: "#00bcd4",
                              color: "#fff",
                              border: "none",
                              padding: "9px 18px",
                              borderRadius: "6px",
                              cursor: "pointer",
                              marginRight: "8px",
                              fontWeight: "bold",
                            }}
                          >
                            Edit
                          </button>
                        </Link>

                        <button
                          onClick={() =>
                            deleteProduct(
                              product._id
                            )
                          }
                          style={{
                            background: "#ff4d4f",
                            color: "#fff",
                            border: "none",
                            padding: "9px 18px",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontWeight: "bold",
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

const thStyle = {
  padding: "16px",
  textAlign: "center",
  fontSize: "15px",
};

const tdStyle = {
  padding: "14px",
  textAlign: "center",
};

export default ManageProducts;