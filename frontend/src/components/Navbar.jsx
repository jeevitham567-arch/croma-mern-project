import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
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
            size={25}
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
            width: "400px",
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            outline: "none",
          }}
        />

        {/* Links */}
        <div
          style={{
            display: "flex",
            gap: "20px",
          }}
        >
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            Home
          </Link>

          <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
            Login
          </Link>

          <Link
            to="/register"
            style={{ color: "white", textDecoration: "none" }}
          >
            Register
          </Link>

          <Link to="/cart" style={{ color: "white", textDecoration: "none" }}>
            Cart
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
            width: "280px",
            height: "100vh",
            background: "#222",
            color: "white",
            padding: "20px",
            zIndex: 1000,
          }}
        >
          <h2>Menu</h2>
          <hr />

         <Link to="/category/mobiles">📱 Mobiles</Link>
<br />

<Link to="/category/laptops">💻 Laptops</Link>
<br />

<Link to="/category/televisions">📺 Televisions</Link>
<br />

<Link to="/category/refrigerators">🧊 Refrigerators</Link>
<br />

<Link to="/category/washing-machines">🧺 Washing Machines</Link>
<br />

<Link to="/category/air-conditioners">❄️ Air Conditioners</Link>
<br />

<Link to="/category/audio">🎧 Audio</Link>
<br />

<Link to="/category/smart-watches">⌚ Smart Watches</Link>
<br />

<Link to="/category/cameras">📷 Cameras</Link>
<br />

<Link to="/category/gaming">🎮 Gaming</Link>

          <button
            onClick={() => setMenuOpen(false)}
            style={{
              marginTop: "20px",
              padding: "10px",
              width: "100%",
              background: "#00C8C8",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            Close
          </button>
        </div>
      )}
    </>
  );
}

export default Navbar;