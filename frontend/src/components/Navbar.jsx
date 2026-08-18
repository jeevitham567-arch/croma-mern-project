import { Link, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaShoppingCart,
  FaUserCircle,
  FaMapMarkerAlt,
  FaBox,
  FaAward,
  FaHeart,
  FaTv,
  FaCommentDots,
  FaPowerOff,
  FaTimes,
} from "react-icons/fa";
import { useState } from "react";
import logo from "../assets/Croma_Logo_acrkvn.svg";

function Navbar({ search = "", setSearch = () => {} }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setProfileOpen(false);
    navigate("/login");
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}

      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px 40px",
          background: "#000",
          color: "#fff",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          gap: "20px",
          borderBottom: "1px solid #222",
        }}
      >
        {/* MENU + LOGO */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <FaBars
            size={24}
            style={{
              cursor: "pointer",
            }}
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

        {/* SEARCH */}

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

        {/* RIGHT SIDE */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "22px",
          }}
        >
          {/* CART */}

          <Link
            to="/cart"
            style={{
              color: "#fff",
              fontSize: "22px",
            }}
          >
            <FaShoppingCart />
          </Link>

          {/* PROFILE */}

          <div
            style={{
              position: "relative",
            }}
          >
            <FaUserCircle
              size={27}
              style={{
                cursor: "pointer",
              }}
              onClick={() => setProfileOpen(!profileOpen)}
            />

            {/* PROFILE DROPDOWN */}

            {profileOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "45px",
                  right: 0,
                  width: "320px",
                  background: "#181818",
                  borderRadius: "8px",
                  padding: "16px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.7)",
                  borderRight: "3px solid #00e6a8",
                  zIndex: 3000,
                }}
              >
                {/* PROFILE HEADER */}

                <div
                  style={{
                    padding: "5px 10px 15px",
                    borderBottom: "1px solid #333",
                    marginBottom: "8px",
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      color: "#fff",
                      fontSize: "18px",
                    }}
                  >
                    {user?.name || "Guest User"}
                  </h3>

                  <p
                    style={{
                      margin: "5px 0 0",
                      color: "#999",
                      fontSize: "12px",
                    }}
                  >
                    {user?.email || "Login to your account"}
                  </p>

                  <button
                    onClick={() => {
                      setProfileOpen(false);

                      if (user) {
                        navigate("/edit-profile");
                      } else {
                        navigate("/login");
                      }
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#00e6a8",
                      cursor: "pointer",
                      fontSize: "12px",
                      padding: "8px 0 0",
                    }}
                  >
                    {user
                      ? "Edit your basic details"
                      : "Login to your account"}
                  </button>
                </div>

                {/* ADDRESS */}

                <ProfileMenuItem
                  icon={<FaMapMarkerAlt />}
                  title="My Address"
                  description="Manage your saved addresses"
                  onClick={() => {
                    setProfileOpen(false);
                    alert("Address management coming soon");
                  }}
                />

                {/* ORDERS */}

                <ProfileMenuItem
                  icon={<FaBox />}
                  title="My Orders"
                  description="View, track, cancel orders and buy again"
                  onClick={() => {
                    setProfileOpen(false);
                    navigate("/orders");
                  }}
                />

                {/* PRIVILEGE OFFERS */}

                <ProfileMenuItem
                  icon={<FaAward />}
                  title="My Privilege Offers"
                  description="Exclusive offers for you"
                  onClick={() => {
                    setProfileOpen(false);
                    alert("Privilege Offers coming soon");
                  }}
                />

                {/* WISHLIST */}

                <ProfileMenuItem
                  icon={<FaHeart />}
                  title="My Wishlist"
                  description="Have a look at your favourite products"
                  onClick={() => {
                    setProfileOpen(false);
                    navigate("/wishlist");
                  }}
                />

                {/* DEVICES */}

                <ProfileMenuItem
                  icon={<FaTv />}
                  title="My Devices & Plans"
                  description="Manage your devices and plans"
                  onClick={() => {
                    setProfileOpen(false);
                    alert("Devices & Plans coming soon");
                  }}
                />

                {/* SERVICE REQUEST */}

                <ProfileMenuItem
                  icon={<FaCommentDots />}
                  title="My Service Requests"
                  description="Manage complaints, feedback and service requests"
                  onClick={() => {
                    setProfileOpen(false);
                    alert("Service Requests coming soon");
                  }}
                />

                {/* LOGIN / LOGOUT */}

                {!user ? (
                  <ProfileMenuItem
                    icon={<FaUserCircle />}
                    title="Login"
                    onClick={() => {
                      setProfileOpen(false);
                      navigate("/login");
                    }}
                  />
                ) : (
                  <ProfileMenuItem
                    icon={<FaPowerOff />}
                    title="Logout"
                    onClick={logout}
                    danger
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* ================= SIDEBAR ================= */}

      {menuOpen && (
        <>
          {/* OVERLAY */}

          <div
            onClick={() => setMenuOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.6)",
              zIndex: 1999,
            }}
          />

          {/* SIDEBAR */}

          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "300px",
              maxWidth: "80%",
              height: "100vh",
              background: "#111",
              color: "#fff",
              padding: "25px",
              zIndex: 2000,
              boxShadow: "5px 0 20px rgba(0,0,0,.5)",
              boxSizing: "border-box",
              overflowY: "auto",
            }}
          >
            {/* SIDEBAR HEADER */}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2
                style={{
                  color: "#00c8c8",
                  margin: 0,
                }}
              >
                Shop by Category
              </h2>

              <FaTimes
                size={22}
                style={{
                  cursor: "pointer",
                }}
                onClick={() => setMenuOpen(false)}
              />
            </div>

            <hr
              style={{
                border: "1px solid #333",
                margin: "20px 0",
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
                to="/category/television"
                onClick={() => setMenuOpen(false)}
              >
                📺 Television
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
                to="/category/smart-watch"
                onClick={() => setMenuOpen(false)}
              >
                ⌚ Smart Watches
              </Link>

              <Link
                style={linkStyle}
                to="/category/camera"
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

            {/* CLOSE BUTTON */}

            <button
              onClick={() => setMenuOpen(false)}
              style={{
                marginTop: "35px",
                width: "100%",
                padding: "14px",
                border: "none",
                borderRadius: "8px",
                background: "#00c8c8",
                color: "#000",
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

/* ================= PROFILE MENU ITEM ================= */

function ProfileMenuItem({
  icon,
  title,
  description,
  onClick,
  danger = false,
}) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "flex-start",
        padding: "12px 10px",
        cursor: "pointer",
        borderRadius: "6px",
        transition: "0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#262626";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
      }}
    >
      <div
        style={{
          fontSize: "18px",
          marginRight: "15px",
          marginTop: "2px",
          width: "20px",
          textAlign: "center",
          color: danger ? "#ff5252" : "#fff",
        }}
      >
        {icon}
      </div>

      <div>
        <h4
          style={{
            fontSize: "14px",
            fontWeight: "600",
            color: danger ? "#ff5252" : "#fff",
            margin: "0 0 3px",
          }}
        >
          {title}
        </h4>

        {description && (
          <p
            style={{
              fontSize: "11px",
              color: "#999",
              lineHeight: "1.3",
              margin: 0,
            }}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

/* ================= SIDEBAR LINK ================= */

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontSize: "17px",
  padding: "12px",
  borderRadius: "8px",
  background: "#222",
};

export default Navbar;