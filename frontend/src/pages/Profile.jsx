import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../services/api";

function Profile() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const res = await API.get("/auth/profile");
      setUser(res.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
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
        <div
          style={{
            maxWidth: "700px",
            margin: "auto",
            background: "#fff",
            padding: "35px",
            borderRadius: "12px",
            boxShadow: "0 3px 12px rgba(0,0,0,.1)",
          }}
        >
          {/* Profile Image */}
          <div
            style={{
              textAlign: "center",
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="User"
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                marginBottom: "20px",
              }}
            />

            <h2>{user.name}</h2>

            <p style={{ color: "gray" }}>
              {user.email}
            </p>
          </div>

          <hr style={{ margin: "25px 0" }} />

          <h3>Personal Information</h3>

          <p>
            <b>Name:</b> {user.name}
          </p>

          <p>
            <b>Email:</b> {user.email}
          </p>

          <p>
            <b>Phone:</b> {user.phone || "Not Added"}
          </p>

          <p>
            <b>Role:</b> {user.role}
          </p>

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              gap: "15px",
              marginTop: "30px",
            }}
          >
            <button
              onClick={() => navigate("/edit-profile")}
              style={{
                flex: 1,
                padding: "14px",
                background: "#00bcd4",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "15px",
                fontWeight: "bold",
              }}
            >
              Edit Profile
            </button>

            <button
              onClick={() => navigate("/change-password")}
              style={{
                flex: 1,
                padding: "14px",
                background: "#ffa000",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "15px",
                fontWeight: "bold",
              }}
            >
              Change Password
            </button>
          </div>

          <button
            onClick={logout}
            style={{
              marginTop: "20px",
              width: "100%",
              padding: "15px",
              background: "#ff4d4f",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Profile;