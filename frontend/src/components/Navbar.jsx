import { Link } from "react-router-dom";
import {
  FaBars,
  FaHeart,
  FaShoppingCart,
  FaUserCircle,
} from "react-icons/fa";
import { useState } from "react";
import logo from "../assets/Croma_Logo_acrkvn.svg";

function Navbar({ search = "", setSearch = () => {} }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
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
          gap: "20px",
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
            onClick={() => setMenuOpen(true)}
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
            maxWidth: "45vw",
            padding: "12px 18px",
            borderRadius: "30px",
            border: "none",
            outline: "none",
            fontSize: "15px",
            background: "#fff",
          }}
        />

        {/* Right Side */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "22px",
          }}
        >
          <Link
            to="/wishlist"
            style={{
              color: "#fff",
              fontSize: "22px",
            }}
          >
            <FaHeart />
          </Link>

          <Link
            to="/cart"
            style={{
              color: "#fff",
              fontSize: "22px",
            }}
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
            style={{
              color: "#fff",
              fontSize: "24px",
            }}
          >
            <FaUserCircle />
          </Link>

          {!user ? (
            <Link
              to="/login"
              style={{
                color: "#fff",
                textDecoration: "none",
              }}
            >
              Login
            </Link>
          ) : (
            <span
              style={{
                color: "#00c8c8",
                fontWeight: "bold",
              }}
            >
              {user.name}
            </span>
          )}
        </div>
      </nav>

      {/* Sidebar */}
      {menuOpen && (
        <>
          {/* Overlay */}
          <div
            onClick={() => setMenuOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.5)",
              zIndex: 1999,
            }}
          />

          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "300px",
              maxWidth: "80%",
              height: "100vh",
              background: "#1f1f1f",
              color: "#fff",
              padding: "25px",
              zIndex: 2000,
              boxShadow: "5px 0 20px rgba(0,0,0,.4)",
              boxSizing: "border-box",
              overflowY: "auto",
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
                gap: "12px",
              }}
            >
              <Link
                style={linkStyle}
                to="/category/mobiles"
                onClick={() => setMenuOpen(false)}
              >
                📱 Mobiles
              </Link>

              <Link
                style={linkStyle}
                to="/category/laptops"
                onClick={() => setMenuOpen(false)}
              >
                💻 Laptops
              </Link>

              <Link
                style={linkStyle}
                to="/category/televisions"
                onClick={() => setMenuOpen(false)}
              >
                📺 Televisions
              </Link>

              <Link
                style={linkStyle}
                to="/category/refrigerators"
                onClick={() => setMenuOpen(false)}
              >
                🧊 Refrigerators
              </Link>

              <Link
                style={linkStyle}
                to="/category/washing-machines"
                onClick={() => setMenuOpen(false)}
              >
                🧺 Washing Machines
              </Link>

              <Link
                style={linkStyle}
                to="/category/air-conditioners"
                onClick={() => setMenuOpen(false)}
              >
                ❄️ Air Conditioners
              </Link>

              <Link
                style={linkStyle}
                to="/category/audio"
                onClick={() => setMenuOpen(false)}
              >
                🎧 Audio
              </Link>

              <Link
                style={linkStyle}
                to="/category/smart-watches"
                onClick={() => setMenuOpen(false)}
              >
                ⌚ Smart Watches
              </Link>

              <Link
                style={linkStyle}
                to="/category/cameras"
                onClick={() => setMenuOpen(false)}
              >
                📷 Cameras
              </Link>

              <Link
                style={linkStyle}
                to="/category/gaming"
                onClick={() => setMenuOpen(false)}
              >
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
        </>
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