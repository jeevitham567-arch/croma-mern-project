import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../services/api";

function Profile() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const res = await API.get("/auth/profile");
      setUser(res.data.user);
    } catch (error) {
      console.log("Profile Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <div
          style={{
            minHeight: "70vh",
            background: "#000",
            color: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2>Loading Profile...</h2>
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div
        style={{
          background: "#000",
          color: "#fff",
          minHeight: "80vh",
          padding: "50px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          {/* Header */}

          <div style={{ marginBottom: "30px" }}>
            <h1
              style={{
                fontSize: "36px",
                marginBottom: "8px",
              }}
            >
              My Profile
            </h1>

            <p
              style={{
                color: "#aaa",
                fontSize: "16px",
              }}
            >
              Manage your account information
            </p>
          </div>

          {/* Profile Card */}

          <div
            style={{
              background: "#171717",
              borderRadius: "16px",
              padding: "35px",
              boxShadow: "0 5px 25px rgba(0,0,0,0.4)",
            }}
          >
            {/* User Header */}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "25px",
                paddingBottom: "30px",
                borderBottom: "1px solid #333",
                flexWrap: "wrap",
              }}
            >
              {/* Avatar */}

              <div
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  background: "#00c8c8",
                  color: "#000",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "40px",
                  fontWeight: "bold",
                  flexShrink: 0,
                }}
              >
                {user.name
                  ? user.name.charAt(0).toUpperCase()
                  : "U"}
              </div>

              {/* Name */}

              <div>
                <h2
                  style={{
                    margin: 0,
                    fontSize: "28px",
                  }}
                >
                  {user.name || "User"}
                </h2>

                <p
                  style={{
                    color: "#aaa",
                    marginTop: "8px",
                    marginBottom: "10px",
                  }}
                >
                  {user.email || "No email"}
                </p>

                <span
                  style={{
                    display: "inline-block",
                    background: "#252525",
                    color: "#00c8c8",
                    padding: "6px 14px",
                    borderRadius: "20px",
                    fontSize: "13px",
                    fontWeight: "bold",
                  }}
                >
                  {user.role || "Customer"}
                </span>
              </div>
            </div>

            {/* Personal Information */}

            <div
              style={{
                marginTop: "30px",
              }}
            >
              <h2
                style={{
                  fontSize: "22px",
                  marginBottom: "20px",
                }}
              >
                Personal Information
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "18px",
                }}
              >
                {/* Name */}

                <div style={infoCard}>
                  <span style={labelStyle}>Name</span>

                  <strong>
                    {user.name || "Not Added"}
                  </strong>
                </div>

                {/* Email */}

                <div style={infoCard}>
                  <span style={labelStyle}>Email</span>

                  <strong
                    style={{
                      wordBreak: "break-word",
                    }}
                  >
                    {user.email || "Not Added"}
                  </strong>
                </div>

                {/* Phone */}

                <div style={infoCard}>
                  <span style={labelStyle}>Phone</span>

                  <strong>
                    {user.phone || "Not Added"}
                  </strong>
                </div>

                {/* Role */}

                <div style={infoCard}>
                  <span style={labelStyle}>Account Type</span>

                  <strong>
                    {user.role || "Customer"}
                  </strong>
                </div>
              </div>
            </div>

            {/* Account Actions */}

            <div
              style={{
                marginTop: "35px",
              }}
            >
              <h2
                style={{
                  fontSize: "22px",
                  marginBottom: "20px",
                }}
              >
                My Account
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "15px",
                }}
              >
                {/* Orders */}

                <button
                  onClick={() => navigate("/orders")}
                  style={actionButton}
                >
                  <span style={iconStyle}>📦</span>

                  <span>My Orders</span>
                </button>

                {/* Wishlist */}

                <button
                  onClick={() => navigate("/wishlist")}
                  style={actionButton}
                >
                  <span style={iconStyle}>❤️</span>

                  <span>My Wishlist</span>
                </button>

                {/* Edit Profile */}

                <button
                  onClick={() => navigate("/edit-profile")}
                  style={actionButton}
                >
                  <span style={iconStyle}>✏️</span>

                  <span>Edit Profile</span>
                </button>

                {/* Change Password */}

                <button
                  onClick={() =>
                    navigate("/change-password")
                  }
                  style={actionButton}
                >
                  <span style={iconStyle}>🔐</span>

                  <span>Change Password</span>
                </button>
              </div>
            </div>

            {/* Logout */}

            <button
              onClick={logout}
              style={logoutButton}
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

const infoCard = {
  background: "#222",
  border: "1px solid #333",
  borderRadius: "10px",
  padding: "18px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const labelStyle = {
  color: "#888",
  fontSize: "14px",
};

const actionButton = {
  background: "#222",
  color: "#fff",
  border: "1px solid #333",
  borderRadius: "10px",
  padding: "18px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  fontSize: "16px",
  fontWeight: "bold",
  transition: "0.2s",
};

const iconStyle = {
  fontSize: "22px",
};

const logoutButton = {
  width: "100%",
  marginTop: "30px",
  padding: "15px",
  background: "#e53935",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "16px",
};

export default Profile;