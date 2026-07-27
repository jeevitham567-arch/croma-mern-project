import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ManageProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await API.delete(`/products/${id}`);
      alert("Product Deleted Successfully");
      getProducts();
    } catch (error) {
      console.log(error);
      alert("Unable to delete product");
    }
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          padding: "40px",
          minHeight: "80vh",
          background: "#f5f5f5",
        }}
      >
        <h1
          style={{
            marginBottom: "25px",
          }}
        >
          Manage Products
        </h1>

        <table
          style={{
            width: "100%",
            background: "#fff",
            borderCollapse: "collapse",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <thead
            style={{
              background: "#00bcd4",
              color: "#fff",
            }}
          >
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Price</th>
              <th style={thStyle}>Category</th>
              <th style={thStyle}>Stock</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                style={{
                  borderBottom: "1px solid #ddd",
                }}
              >
                <td style={tdStyle}>
                  {product._id.slice(-5)}
                </td>

                <td style={tdStyle}>
                  {product.name}
                </td>

                <td style={tdStyle}>
                  ₹ {product.price}
                </td>

                <td style={tdStyle}>
                  {product.category}
                </td>

                <td style={tdStyle}>
                  {product.stock}
                </td>

                <td style={tdStyle}>
                  <Link
                    to={`/admin/edit-product/${product._id}`}
                  >
                    <button
                      style={{
                        background: "#00bcd4",
                        color: "#fff",
                        border: "none",
                        padding: "8px 18px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        marginRight: "10px",
                      }}
                    >
                      Edit
                    </button>
                  </Link>

                  <button
                    onClick={() => deleteProduct(product._id)}
                    style={{
                      background: "#ff4d4f",
                      color: "#fff",
                      border: "none",
                      padding: "8px 18px",
                      borderRadius: "6px",
                      cursor: "pointer",
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

      <Footer />
    </>
  );
}

const thStyle = {
  padding: "15px",
};

const tdStyle = {
  padding: "15px",
  textAlign: "center",
};

export default ManageProducts;