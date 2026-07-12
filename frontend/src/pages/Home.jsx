import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
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

      <div style={{ padding: "30px" }}>
        <h2>Latest Products</h2>

        {products.map((product) => (
          <div
            key={product._id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              margin: "10px 0",
            }}
          >
            <h3>{product.name}</h3>
            <p>₹ {product.price}</p>
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
}

export default Home;