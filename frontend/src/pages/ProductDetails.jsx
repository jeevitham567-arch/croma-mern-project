import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    getProduct();
    getReviews();
  }, []);

  const getProduct = async () => {
    try {
      const res = await API.get(`/products/${id}`);
      setProduct(res.data.product);
    } catch (error) {
      console.log(error);
    }
  };

  const getReviews = async () => {
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
        name,
        rating,
        comment,
      });

      alert("Review Added Successfully");

      setName("");
      setRating(5);
      setComment("");

      getReviews();
    } catch (error) {
      console.log(error);
      alert("Unable to add review");
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
          flexWrap: "wrap",
        }}
      >
        <img
          src={`http://localhost:5000/uploads/${product.image}`}
          alt={product.name}
          style={{
            width: "400px",
            objectFit: "contain",
          }}
        />

        <div>
          <h1>{product.name}</h1>

          <p style={{ margin: "20px 0" }}>
            {product.description}
          </p>

          <h2 style={{ color: "green" }}>
            ₹ {product.price}
          </h2>

          <h3>⭐ {product.rating}</h3>

          <h3>Category : {product.category}</h3>

          <h3>Stock : {product.stock}</h3>

          <button
            style={{
              padding: "12px 25px",
              marginTop: "20px",
              background: "#00bcd4",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginRight: "15px",
            }}
          >
            Add To Cart
          </button>

          <button
            style={{
              padding: "12px 25px",
              marginTop: "20px",
              background: "green",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Buy Now
          </button>
        </div>
      </div>

      {/* Reviews Section */}

      <div
        style={{
          padding: "50px",
          maxWidth: "900px",
          margin: "auto",
        }}
      >
        <h2>⭐ Customer Reviews</h2>

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "20px",
          }}
        />

        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "15px",
          }}
        >
          <option value={5}>⭐⭐⭐⭐⭐</option>
          <option value={4}>⭐⭐⭐⭐</option>
          <option value={3}>⭐⭐⭐</option>
          <option value={2}>⭐⭐</option>
          <option value={1}>⭐</option>
        </select>

        <textarea
          rows="4"
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "15px",
          }}
        />

        <button
          onClick={submitReview}
          style={{
            padding: "12px 25px",
            marginTop: "20px",
            background: "#00c853",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Submit Review
        </button>

        <hr style={{ margin: "40px 0" }} />

        {reviews.length === 0 ? (
          <h3>No Reviews Yet</h3>
        ) : (
          reviews.map((review) => (
            <div
              key={review._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "20px",
                marginBottom: "20px",
              }}
            >
              <h3>{review.name}</h3>

              <p>{"⭐".repeat(review.rating)}</p>

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