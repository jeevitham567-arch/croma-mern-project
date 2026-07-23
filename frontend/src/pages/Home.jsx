import { useEffect, useState, useRef } from "react";
import API from "../services/api";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const productsRef = useRef(null);

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

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Navbar
        search={search}
        setSearch={setSearch}
      />

      {search === "" && (
        <Hero productsRef={productsRef} />
      )}

      {search === "" && (
        <div
          style={{
            background: "#00c8c8",
            color: "#fff",
            textAlign: "center",
            padding: "15px",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          🎉 Independence Sale | Up to 70% OFF | Free Delivery | No Cost EMI
        </div>
      )}

      {search === "" && (
        <Categories
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      )}

      <div
        ref={productsRef}
        style={{
          padding: "50px 40px",
          background: "#f7f7f7",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "34px",
            color: "#222",
            marginBottom: "10px",
          }}
        >
          🔥 Trending Products
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#777",
            marginBottom: "40px",
            fontSize: "17px",
          }}
        >
          Grab the best deals on today's top electronics.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(280px,1fr))",
            gap: "30px",
          }}
        ></div>
                 {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))
          ) : (
            <h2
              style={{
                textAlign: "center",
                color: "gray",
                width: "100%",
              }}
            >
              No products found.
            </h2>
          )}
        </div>
      </div>

      {/* Featured Brands */}
      <div
        style={{
          padding: "60px 40px",
          background: "#fff",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "32px",
            marginBottom: "40px",
          }}
        >
          ⭐ Featured Brands
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
            gap: "25px",
          }}
        >
          <div style={brandStyle}>🍎 Apple</div>
          <div style={brandStyle}>📱 Samsung</div>
          <div style={brandStyle}>💻 HP</div>
          <div style={brandStyle}>🎧 Sony</div>
          <div style={brandStyle}>🖥️ Dell</div>
          <div style={brandStyle}>📺 LG</div>
        </div>
      </div>

      {/* Newsletter */}
      <div
        style={{
          background: "#1a1a1a",
          color: "#fff",
          textAlign: "center",
          padding: "60px 20px",
        }}
      >
        <h2>Stay Updated</h2>

        <p
          style={{
            color: "#ccc",
            marginTop: "10px",
            marginBottom: "25px",
          }}
        >
          Subscribe to get the latest offers and product updates.
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          style={{
            width: "350px",
            padding: "14px",
            borderRadius: "30px",
            border: "none",
            outline: "none",
            marginRight: "10px",
          }}
        />

        <button
          style={{
            padding: "14px 30px",
            background: "#00c8c8",
            color: "#fff",
            border: "none",
            borderRadius: "30px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Subscribe
        </button>
      </div> 
            <Footer />
    </>
  );
}

const brandStyle = {
  background: "#f5f5f5",
  padding: "25px 40px",
  borderRadius: "12px",
  fontSize: "22px",
  fontWeight: "bold",
  textAlign: "center",
  cursor: "pointer",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};

export default Home;