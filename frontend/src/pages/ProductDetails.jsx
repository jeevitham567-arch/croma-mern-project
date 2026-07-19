import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);

  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchProduct();
    fetchReviews();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await API.get(`/products/${id}`);
      setProduct(res.data.product);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await API.get(`/reviews/${id}`);
      setReviews(res.data.reviews);
    } catch (error) {
      console.log(error);
    }
  };

  const submitReview = async () => {
    try {
      await API.post("/reviews", {
        product: id,
        rating,
        comment,
      });

      alert("Review Added Successfully");

      setRating("");
      setComment("");

      fetchReviews();
    } catch (error) {
      console.log(error);
      alert("Failed to add review");
    }
  };

  if (!product) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <>
      <Navbar />

      <div
        style={{
          display: "flex",
          gap: "50px",
          padding: "50px",
          alignItems: "center",
        }}
      >
        <img
          src={`http://localhost:5000/uploads/${product.image}`}
          alt={product.name}
          style={{
            width: "350px",
            height: "350px",
            objectFit: "contain",
          }}
        />

        <div>
          <h1>{product.name}</h1>

          <p style={{ margin: "20px 0" }}>{product.description}</p>

          <h2 style={{ color: "green" }}>₹ {product.price}</h2>

          <h3>⭐ {product.rating}</h3>

          <h3>Category : {product.category}</h3>

          <h3>Stock : {product.stock}</h3>

          <button
            style={{
              marginTop: "20px",
              padding: "12px 30px",
              background: "#00bcd4",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Add To Cart
          </button>
        </div>
      </div>

      <div style={{ padding: "40px 50px" }}>
        <h2>Add Review</h2>

        <input
          type="number"
          min="1"
          max="5"
          placeholder="Rating (1-5)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <textarea
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{
            width: "100%",
            height: "100px",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <button
          onClick={submitReview}
          style={{
            padding: "10px 20px",
            background: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Submit Review
        </button>
      </div>

      <div style={{ padding: "40px 50px" }}>
        <h2>Customer Reviews</h2>

        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((review) => (
            <div
              key={review._id}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                marginTop: "15px",
                borderRadius: "8px",
                background: "#fff",
              }}
            >
              <h4>{review.user?.name || "User"}</h4>
              <p>⭐ {review.rating}/5</p>
              <p>{review.comment}</p>
            </div>
          ))
        )}
      </div>

      <Footer />
    </>
  );
}

export default ProductDetails;