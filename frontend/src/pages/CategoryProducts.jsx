import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import API from "../services/api";

function CategoryProducts() {
  const { category } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryName = decodeURIComponent(category);

  useEffect(() => {
    getCategoryProducts();
  }, [category]);

  const getCategoryProducts = async () => {
    try {
      setLoading(true);

      const res = await API.get("/products");

      const allProducts = res.data.products || [];

      const filteredProducts = allProducts.filter(
        (product) =>
          product.category?.toLowerCase() ===
          categoryName.toLowerCase()
      );

      setProducts(filteredProducts);
    } catch (error) {
      console.log("Category Products Error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to load products"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          minHeight: "70vh",
          background: "#f5f5f5",
          padding: "40px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "auto",
          }}
        >
          {/* Header */}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "30px",
              flexWrap: "wrap",
              gap: "15px",
            }}
          >
            <div>
              <h1 style={{ margin: 0 }}>
                {categoryName}
              </h1>

              <p
                style={{
                  color: "#777",
                  marginTop: "8px",
                }}
              >
                Products in {categoryName}
              </p>
            </div>

            <button
              onClick={() => navigate("/")}
              style={{
                padding: "10px 20px",
                border: "none",
                borderRadius: "8px",
                background: "#00bcd4",
                color: "#fff",
                cursor: "pointer",
                fontSize: "15px",
              }}
            >
              ← Back to Home
            </button>
          </div>

          {/* Loading */}

          {loading ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px",
              }}
            >
              <h2>Loading Products...</h2>
            </div>
          ) : products.length === 0 ? (
            /* No products */

            <div
              style={{
                background: "#fff",
                padding: "60px 20px",
                textAlign: "center",
                borderRadius: "12px",
              }}
            >
              <h2>No Products Found</h2>

              <p style={{ color: "#777" }}>
                There are no products available in{" "}
                {categoryName}.
              </p>
            </div>
          ) : (
            /* Products */

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "25px",
              }}
            >
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default CategoryProducts;