import { useEffect, useState } from "react";
import API from "../services/api";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

function Home() {
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

  return (
    <>
      <Navbar />

      <Hero />

      <Categories />

      <div style={{ padding: "40px" }}>
        <h2
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          Latest Products
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;