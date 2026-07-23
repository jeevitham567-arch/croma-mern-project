import { Link } from "react-router-dom";
import {
  FaBars,
  FaHeart,
  FaShoppingCart,
  FaUserCircle,
} from "react-icons/fa";
import { useState } from "react";
import logo from "../assets/Croma_Logo_acrkvn.svg";

function Navbar({ search, setSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px 40px",
          background: "#1a1a1a",
          color: "white",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        {/* Menu + Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <FaBars
            size={24}
            style={{ cursor: "pointer" }}
            onClick={() => setMenuOpen(!menuOpen)}
          />

          <Link to="/">
            <img
              src={logo}
              alt="Croma Logo"
              style={{
                width: "120px",
                height: "40px",
                objectFit: "contain",
              }}
            />
          </Link>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="What are you looking for?"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "500px",
            padding: "12px 18px",
            borderRadius: "30px",
            border: "none",
            outline: "none",
            fontSize: "15px",
            background: "#fff",
          }}
        />

        {/* Right Icons */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "25px",
          }}
        >
          <Link
            to="/wishlist"
            style={{ color: "#fff", fontSize: "22px" }}
          >
            <FaHeart />
          </Link>

          <Link
            to="/cart"
            style={{ color: "#fff", fontSize: "22px" }}
          >
            <FaShoppingCart />
          </Link>

          <Link
            to="/orders"
            style={{
              color: "#fff",
              textDecoration: "none",
            }}
          >
            Orders
          </Link>

          <Link
            to="/profile"
            style={{ color: "#fff", fontSize: "24px" }}
          >
            <FaUserCircle />
          </Link>

          <Link
            to="/login"
            style={{
              color: "#fff",
              textDecoration: "none",
            }}
          >
            Login
          </Link>
        </div>
      </nav>
            {/* Sidebar */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "300px",
            height: "100vh",
            background: "#1f1f1f",
            color: "#fff",
            padding: "25px",
            zIndex: 2000,
            boxShadow: "5px 0 20px rgba(0,0,0,.4)",
          }}
        >
          <h2
            style={{
              marginBottom: "20px",
              color: "#00c8c8",
            }}
          >
            ☰ Shop by Category
          </h2>

          <hr
            style={{
              border: "1px solid #444",
              marginBottom: "20px",
            }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <Link style={linkStyle} to="/category/mobiles">
              📱 Mobiles
            </Link>

            <Link style={linkStyle} to="/category/laptops">
              💻 Laptops
            </Link>

            <Link style={linkStyle} to="/category/televisions">
              📺 Televisions
            </Link>

            <Link style={linkStyle} to="/category/refrigerators">
              🧊 Refrigerators
            </Link>

            <Link style={linkStyle} to="/category/washing-machines">
              🧺 Washing Machines
            </Link>

            <Link style={linkStyle} to="/category/air-conditioners">
              ❄️ Air Conditioners
            </Link>

            <Link style={linkStyle} to="/category/audio">
              🎧 Audio
            </Link>

            <Link style={linkStyle} to="/category/smart-watches">
              ⌚ Smart Watches
            </Link>

            <Link style={linkStyle} to="/category/cameras">
              📷 Cameras
            </Link>

            <Link style={linkStyle} to="/category/gaming">
              🎮 Gaming
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen(false)}
            style={{
              marginTop: "35px",
              width: "100%",
              padding: "14px",
              border: "none",
              borderRadius: "8px",
              background: "#00c8c8",
              color: "#fff",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            Close Menu
          </button>
        </div>
      )}
    </>
  );
}

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontSize: "17px",
  padding: "10px",
  borderRadius: "8px",
  background: "#2d2d2d",
};

export default Navbar;