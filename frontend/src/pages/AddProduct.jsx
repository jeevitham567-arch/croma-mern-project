import { useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    rating: "",
    image: "",
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const addProduct = async (e) => {
    e.preventDefault();

    try {
      await API.post("/products", product);
      alert("Product Added Successfully");

      setProduct({
        name: "",
        price: "",
        description: "",
        category: "",
        stock: "",
        rating: "",
        image: "",
      });
    } catch (error) {
      console.log(error);
      alert("Unable to add product");
    }
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          maxWidth: "600px",
          margin: "40px auto",
          background: "#fff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,.1)",
        }}
      >
        <h1>Add Product</h1>

        <form onSubmit={addProduct}>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={product.name}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            style={inputStyle}
          />

          <textarea
            name="description"
            placeholder="Description"
            value={product.description}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={product.category}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={product.stock}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="number"
            name="rating"
            placeholder="Rating"
            value={product.rating}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="text"
            name="image"
            placeholder="Image Name"
            value={product.image}
            onChange={handleChange}
            style={inputStyle}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              background: "#00bcd4",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Add Product
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  boxSizing: "border-box",
};

export default AddProduct;