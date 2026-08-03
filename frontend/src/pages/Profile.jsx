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
          background: "#f5f5f5",
          minHeight: "80vh",
          padding: "50px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          <h1>My Profile</h1>

          <p style={{ color: "#777" }}>
            Manage your account information
          </p>

          <div
            style={{
              background: "#fff",
              marginTop: "25px",
              padding: "30px",
              borderRadius: "14px",
              boxShadow: "0 3px 12px rgba(0,0,0,0.08)",
            }}
          >
            <div
              style={{
                textAlign: "center",
                marginBottom: "30px",
              }}
            >
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  margin: "0 auto 15px",
                  borderRadius: "50%",
                  background: "#00bcd4",
                  color: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "40px",
                  fontWeight: "bold",
                }}
              >
                {user.name
                  ? user.name.charAt(0).toUpperCase()
                  : "U"}
              </div>

              <h2>{user.name || "User"}</h2>

              <p style={{ color: "#777" }}>
                {user.email || "No email"}
              </p>
            </div>

            <hr />

            <h2>Personal Information</h2>

            <p>
              <b>Name:</b> {user.name || "Not Added"}
            </p>

            <p>
              <b>Email:</b> {user.email || "Not Added"}
            </p>

            <p>
              <b>Phone:</b> {user.phone || "Not Added"}
            </p>

            <p>
              <b>Role:</b> {user.role || "Customer"}
            </p>

            <div
              style={{
                display: "flex",
                gap: "15px",
                marginTop: "30px",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() => navigate("/orders")}
                style={buttonStyle}
              >
                📦 My Orders
              </button>

              <button
                onClick={() => navigate("/wishlist")}
                style={buttonStyle}
              >
                ❤️ My Wishlist
              </button>

              <button
                onClick={() => navigate("/edit-profile")}
                style={buttonStyle}
              >
                ✏️ Edit Profile
              </button>

              <button
                onClick={() => navigate("/change-password")}
                style={{
                  ...buttonStyle,
                  background: "#ff9800",
                }}
              >
                🔐 Change Password
              </button>
            </div>

            <button
              onClick={logout}
              style={{
                width: "100%",
                marginTop: "20px",
                padding: "14px",
                background: "#f44336",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

const buttonStyle = {
  flex: "1",
  minWidth: "180px",
  padding: "14px",
  background: "#00bcd4",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default Profile;