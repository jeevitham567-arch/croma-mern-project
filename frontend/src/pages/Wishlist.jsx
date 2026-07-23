import { useEffect, useState } from "react";
import API from "../services/api";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WishlistCard from "../components/WishlistCard";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    getWishlist();
  }, []);

  const getWishlist = async () => {
    try {
      const res = await API.get("/wishlist");
      setWishlist(res.data.wishlist);
    } catch (error) {
      console.log(error);
    }
  };

  const removeWishlist = async (id) => {
    try {
      await API.delete(`/wishlist/${id}`);
      getWishlist();
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async (productId) => {
    try {
      await API.post("/cart", {
        productId,
      });

      alert("Product Added To Cart");

      // Optional: Remove from wishlist after moving to cart
      // await removeWishlist(productId);

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
          background: "#f5f5f5",
          minHeight: "80vh",
          padding: "40px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          ❤️ My Wishlist
        </h1>

        {wishlist.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              marginTop: "100px",
            }}
          >
            <h2>Your Wishlist is Empty</h2>

            <p
              style={{
                color: "#777",
                marginTop: "10px",
              }}
            >
              Add your favourite products here.
            </p>
          </div>
        ) : (
          wishlist.map((item) => (
            <WishlistCard
              key={item._id}
              item={item}
              addToCart={addToCart}
              removeWishlist={removeWishlist}
            />
          ))
        )}
      </div>

      <Footer />
    </>
  );
}

export default Wishlist;