import { Link } from "react-router-dom";
import logo from "../assets/Croma_Logo_acrkvn.svg";

function Navbar({ search, setSearch }) {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 40px",
        background: "#1a1a1a",
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
        }}
      >
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

      {/* Search Bar */}
      <input
        type="text"
        placeholder="What are you looking for?"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "400px",
          padding: "10px 15px",
          borderRadius: "8px",
          border: "none",
          outline: "none",
          fontSize: "16px",
        }}
      />

      {/* Navigation Links */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <Link
          to="/"
          style={{ color: "white", textDecoration: "none" }}
        >
          Home
        </Link>

        <Link
          to="/login"
          style={{ color: "white", textDecoration: "none" }}
        >
          Login
        </Link>

        <Link
          to="/register"
          style={{ color: "white", textDecoration: "none" }}
        >
          Register
        </Link>

        <Link
          to="/cart"
          style={{ color: "white", textDecoration: "none" }}
        >
          Cart
        </Link>

        <Link
          to="/orders"
          style={{ color: "white", textDecoration: "none" }}
        >
          Orders
        </Link>

        <Link
          to="/profile"
          style={{ color: "white", textDecoration: "none" }}
        >
          Profile
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;