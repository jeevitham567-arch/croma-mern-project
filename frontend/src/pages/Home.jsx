import { useEffect, useState, useRef } from "react";
import API from "../services/api";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import LocationPopup from "../components/LocationPopup";

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showLocation, setShowLocation] = useState(true);

  const productsRef = useRef(null);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data.products);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  const filteredProducts = products.filter((product) => {
    const productName = product.name?.toLowerCase() || "";
    const productCategory = product.category?.toLowerCase() || "";

    const matchesSearch = productName.includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      productCategory === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <div
      style={{
        background: "#000000",
        minHeight: "100vh",
        color: "#ffffff",
      }}
    >
      {/* ================= LOCATION POPUP ================= */}
      {showLocation && (
        <LocationPopup
          onClose={() => setShowLocation(false)}
        />
      )}

      {/* ================= NAVBAR ================= */}
      <Navbar
        search={search}
        setSearch={setSearch}
      />

      {/* ================= HERO ================= */}
      {search === "" && (
        <Hero productsRef={productsRef} />
      )}

      {/* ================= CATEGORIES BLOCK ================= */}
      {search === "" && (
        <section
          style={{
            background: "#000000",
            padding: "35px 30px",
            marginTop: "20px",
          }}
        >
          <Categories
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </section>
      )}

      {/* ================= TRENDING PRODUCTS BLOCK ================= */}
      <section
        ref={productsRef}
        style={{
          padding: "50px 40px",
          background: "#000000",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
          {/* ================= HEADING ================= */}
          <h2
            style={{
              textAlign: "center",
              fontSize: "32px",
              color: "#ffffff",
              marginBottom: "10px",
              fontWeight: "700",
            }}
          >
            🔥 Trending Products
          </h2>

          <p
            style={{
              textAlign: "center",
              color: "#cccccc",
              marginBottom: "35px",
              fontSize: "16px",
            }}
          >
            Grab the best deals on today's top electronics.
          </p>

          {/* ================= PRODUCT CARDS ================= */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "25px",
            }}
          >
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))
            ) : (
              <div
                style={{
                  gridColumn: "1 / -1",
                  background: "#1a1a1a",
                  padding: "50px",
                  borderRadius: "12px",
                  textAlign: "center",
                  border: "1px solid #333",
                }}
              >
                <h2
                  style={{
                    color: "#cccccc",
                    margin: 0,
                  }}
                >
                  No products found.
                </h2>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================= FEATURED BRANDS BLOCK ================= */}
      <section
        style={{
          padding: "55px 40px",
          background: "#000000",
          borderTop: "1px solid #222",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "30px",
            marginBottom: "35px",
            color: "#ffffff",
          }}
        >
          ⭐ Featured Brands
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "20px",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          <div style={brandStyle}>
            🍎 Apple
          </div>

          <div style={brandStyle}>
            📱 Samsung
          </div>

          <div style={brandStyle}>
            💻 HP
          </div>

          <div style={brandStyle}>
            🎧 Sony
          </div>

          <div style={brandStyle}>
            🖥️ Dell
          </div>

          <div style={brandStyle}>
            📺 LG
          </div>
        </div>
      </section>

      {/* ================= NEWSLETTER BLOCK ================= */}
      <section
        style={{
          background: "#111111",
          color: "#ffffff",
          textAlign: "center",
          padding: "55px 20px",
          borderTop: "1px solid #222",
        }}
      >
        <h2
          style={{
            fontSize: "30px",
            marginBottom: "10px",
            color: "#ffffff",
          }}
        >
          Stay Updated
        </h2>

        <p
          style={{
            color: "#cccccc",
            margin: "10px 0 25px",
          }}
        >
          Subscribe to get the latest offers and product updates.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <input
            type="email"
            placeholder="Enter your email"
            style={{
              width: "300px",
              maxWidth: "90%",
              padding: "14px 18px",
              borderRadius: "25px",
              border: "1px solid #444",
              outline: "none",
              fontSize: "15px",
              background: "#ffffff",
              color: "#000000",
            }}
          />

          <button
            type="button"
            style={{
              padding: "14px 28px",
              background: "#00c8c8",
              color: "#000000",
              border: "none",
              borderRadius: "25px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "15px",
            }}
          >
            Subscribe
          </button>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <Footer />
    </div>
  );
}

const brandStyle = {
  background: "#1a1a1a",
  padding: "22px 35px",
  minWidth: "150px",
  borderRadius: "12px",
  fontSize: "20px",
  fontWeight: "bold",
  textAlign: "center",
  color: "#ffffff",
  border: "1px solid #333333",
  boxShadow: "0 3px 12px rgba(0,0,0,0.5)",
  transition: "0.3s",
  cursor: "pointer",
};

export default Home;