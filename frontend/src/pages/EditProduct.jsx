import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    rating: "",
    image: "",
  });

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const res = await API.get(`/products/${id}`);
      setProduct(res.data.product);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const updateProduct = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/products/${id}`, product);

      alert("Product Updated Successfully");

      navigate("/admin/products");
    } catch (error) {
      console.log(error);
      alert("Unable to update product");
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
          borderRadius: "12px",
        }}
      >
        <h1>Edit Product</h1>

        <form onSubmit={updateProduct}>
          <input
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Product Name"
            style={inputStyle}
          />

          <input
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Price"
            style={inputStyle}
          />

          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Description"
            style={inputStyle}
          />

          <input
            name="category"
            value={product.category}
            onChange={handleChange}
            placeholder="Category"
            style={inputStyle}
          />

          <input
            name="stock"
            value={product.stock}
            onChange={handleChange}
            placeholder="Stock"
            style={inputStyle}
          />

          <input
            name="rating"
            value={product.rating}
            onChange={handleChange}
            placeholder="Rating"
            style={inputStyle}
          />

          <input
            name="image"
            value={product.image}
            onChange={handleChange}
            placeholder="Image"
            style={inputStyle}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "15px",
              background: "#00bcd4",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Update Product
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

export default EditProduct;