import { Link } from "react-router-dom";

function Navbar() {
  return (
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
      {/* Logo */}
      <h2>
        <Link
          to="/"
          style={{
            color: "#00e6e6",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Croma
        </Link>
      </h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search Products..."
        style={{
          width: "350px",
          padding: "10px",
          borderRadius: "5px",
          border: "none",
          outline: "none",
        }}
      />

      {/* Navigation Links */}
      <div style={{ display: "flex", gap: "20px" }}>
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