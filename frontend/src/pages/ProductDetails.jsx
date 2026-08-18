import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);

  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProduct();
    getReviews();
  }, [id]);

  // GET PRODUCT
  const getProduct = async () => {
    try {
      const res = await API.get(`/products/${id}`);
      setProduct(res.data.product);
    } catch (error) {
      console.log("Product Error:", error);
      alert(
        error.response?.data?.message ||
          "Unable to load product"
      );
    }
  };

  // GET REVIEWS
  const getReviews = async () => {
    try {
      const res = await API.get(`/reviews/${id}`);
      setReviews(res.data.reviews || []);
    } catch (error) {
      console.log("Reviews Error:", error);
      setReviews([]);
    }
  };

  // ADD TO CART
  const addToCart = async () => {
    try {
      setLoading(true);

      await API.post("/cart", {
        productId: id,
        quantity,
      });

      alert("Product Added To Cart 🛒");
      navigate("/cart");
    } catch (error) {
      console.log("Add Cart Error:", error);

      if (error.response?.status === 401) {
        alert("Please login first");
        navigate("/login");
      } else {
        alert(
          error.response?.data?.message ||
            "Unable to add product to cart"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // BUY NOW
  const buyNow = async () => {
    try {
      setLoading(true);

      await API.post("/cart", {
        productId: id,
        quantity,
      });

      navigate("/checkout");
    } catch (error) {
      console.log("Buy Now Error:", error);

      if (error.response?.status === 401) {
        alert("Please login first");
        navigate("/login");
      } else {
        alert(
          error.response?.data?.message ||
            "Unable to continue"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // ADD TO WISHLIST
  const addToWishlist = async () => {
    try {
      await API.post("/wishlist", {
        productId: id,
      });

      alert("Added to Wishlist ❤️");
    } catch (error) {
      console.log("Wishlist Error:", error);

      if (error.response?.status === 401) {
        alert("Please login first");
        navigate("/login");
      } else {
        alert(
          error.response?.data?.message ||
            "Unable to add to wishlist"
        );
      }
    }
  };

  // SUBMIT REVIEW
  const submitReview = async () => {
    if (!name.trim() || !comment.trim()) {
      alert("Please enter your name and review");
      return;
    }

    try {
      await API.post("/reviews", {
        product: id,
        name,
        rating,
        comment,
      });

      alert("Review Added Successfully ⭐");

      setName("");
      setRating(5);
      setComment("");

      getReviews();
    } catch (error) {
      console.log("Review Error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to add review"
      );
    }
  };

  if (!product) {
    return (
      <>
        <Navbar />

        <div
          style={{
            minHeight: "70vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2>Loading Product...</h2>
        </div>

        <Footer />
      </>
    );
  }

  const isOutOfStock = product.stock <= 0;

  return (
    <>
      <Navbar />

      {/* PRODUCT DETAILS */}
      <div
        style={{
          background: "#f5f5f5",
          minHeight: "70vh",
          padding: "50px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "auto",
            background: "#fff",
            padding: "40px",
            borderRadius: "15px",
            boxShadow:
              "0 3px 12px rgba(0,0,0,0.08)",
            display: "flex",
            gap: "50px",
            flexWrap: "wrap",
          }}
        >
          {/* IMAGE */}
          <div
            style={{
              flex: "1",
              minWidth: "300px",
              textAlign: "center",
            }}
          >
            <img
              src={`http://localhost:5000/uploads/${product.image}`}
              alt={product.name}
              style={{
                width: "100%",
                maxWidth: "450px",
                height: "400px",
                objectFit: "contain",
              }}
            />
          </div>

          {/* DETAILS */}
          <div
            style={{
              flex: "1",
              minWidth: "300px",
            }}
          >
            <h1>{product.name}</h1>

            <p
              style={{
                color: "#777",
                marginTop: "15px",
                lineHeight: "25px",
              }}
            >
              {product.description}
            </p>

            <h2
              style={{
                color: "#00b894",
                marginTop: "20px",
              }}
            >
              ₹ {Number(product.price || 0).toLocaleString()}
            </h2>

            <p
              style={{
                marginTop: "15px",
                color: "#f5a623",
                fontSize: "18px",
              }}
            >
              ⭐ {product.rating || 0}
            </p>

            <p style={{ marginTop: "10px" }}>
              <b>Category:</b> {product.category}
            </p>

            <p style={{ marginTop: "10px" }}>
              <b>Stock:</b>{" "}
              {product.stock > 0
                ? `${product.stock} Available`
                : "Out of Stock"}
            </p>

            {/* QUANTITY */}
            {!isOutOfStock && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  marginTop: "25px",
                }}
              >
                <b>Quantity:</b>

                <button
                  onClick={() =>
                    setQuantity(
                      Math.max(1, quantity - 1)
                    )
                  }
                  style={quantityButton}
                >
                  −
                </button>

                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  {quantity}
                </span>

                <button
                  onClick={() =>
                    setQuantity(
                      Math.min(
                        product.stock,
                        quantity + 1
                      )
                    )
                  }
                  style={quantityButton}
                >
                  +
                </button>
              </div>
            )}

            {/* BUTTONS */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                marginTop: "25px",
              }}
            >
              <button
                onClick={addToCart}
                disabled={
                  loading || isOutOfStock
                }
                style={{
                  ...actionButton,
                  background: isOutOfStock
                    ? "#999"
                    : "#00bcd4",
                  cursor:
                    loading || isOutOfStock
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                🛒 Add To Cart
              </button>

              <button
                onClick={buyNow}
                disabled={
                  loading || isOutOfStock
                }
                style={{
                  ...actionButton,
                  background: isOutOfStock
                    ? "#999"
                    : "#00b894",
                  cursor:
                    loading || isOutOfStock
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                ⚡ Buy Now
              </button>

              <button
                onClick={addToWishlist}
                style={{
                  ...actionButton,
                  background: "#ff4d4f",
                }}
              >
                ❤️ Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* REVIEWS */}
      <div
        style={{
          maxWidth: "900px",
          margin: "50px auto",
          padding: "0 20px",
        }}
      >
        <h2>⭐ Customer Reviews</h2>

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          style={inputStyle}
        />

        <select
          value={rating}
          onChange={(e) =>
            setRating(Number(e.target.value))
          }
          style={inputStyle}
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
          onChange={(e) =>
            setComment(e.target.value)
          }
          style={{
            ...inputStyle,
            resize: "vertical",
          }}
        />

        <button
          onClick={submitReview}
          style={{
            padding: "12px 25px",
            background: "#00c853",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
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

              <p>
                {"⭐".repeat(review.rating || 0)}
              </p>

              <p
                style={{
                  color: "#555",
                  marginTop: "10px",
                }}
              >
                {review.comment}
              </p>
            </div>
          ))
        )}
      </div>

      <Footer />
    </>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "15px",
  marginBottom: "5px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  fontSize: "16px",
  boxSizing: "border-box",
};

const actionButton = {
  padding: "13px 20px",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "15px",
};

const quantityButton = {
  width: "35px",
  height: "35px",
  border: "1px solid #ccc",
  background: "#fff",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "20px",
};

export default ProductDetails;