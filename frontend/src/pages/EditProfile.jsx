import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../services/api";

function EditProfile() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const res = await API.get("/auth/profile");

      const user = res.data.user;

      setForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    } catch (error) {
      console.log("Profile Error:", error);
      alert(
        error.response?.data?.message ||
          "Unable to load profile"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email) {
      alert("Name and email are required");
      return;
    }

    try {
      setSaving(true);

      const res = await API.put(
        "/auth/profile",
        form
      );

      alert(
        res.data.message ||
          "Profile updated successfully"
      );

      // Update localStorage user
      const oldUser =
        JSON.parse(
          localStorage.getItem("user")
        ) || {};

      const updatedUser = {
        ...oldUser,
        ...res.data.user,
      };

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      navigate("/profile");
    } catch (error) {
      console.log("Update Profile Error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to update profile"
      );
    } finally {
      setSaving(false);
    }
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
          <h2>Loading...</h2>
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
            maxWidth: "650px",
            margin: "0 auto",
            background: "#fff",
            padding: "35px",
            borderRadius: "14px",
            boxShadow:
              "0 3px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              marginBottom: "10px",
            }}
          >
            Edit Profile
          </h1>

          <p
            style={{
              textAlign: "center",
              color: "#777",
              marginBottom: "30px",
            }}
          >
            Update your personal information
          </p>

          <form onSubmit={updateProfile}>
            <label>Name</label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              style={inputStyle}
            />

            <label>Email</label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              style={inputStyle}
            />

            <label>Phone</label>

            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              style={inputStyle}
            />

            <button
              type="submit"
              disabled={saving}
              style={{
                width: "100%",
                padding: "14px",
                background: saving
                  ? "#999"
                  : "#00bcd4",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: saving
                  ? "not-allowed"
                  : "pointer",
                fontSize: "16px",
                fontWeight: "bold",
                marginTop: "15px",
              }}
            >
              {saving
                ? "Saving..."
                : "Save Changes"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/profile")}
              style={{
                width: "100%",
                padding: "14px",
                background: "#eee",
                color: "#333",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold",
                marginTop: "12px",
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginTop: "8px",
  marginBottom: "20px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "16px",
  boxSizing: "border-box",
};

export default EditProfile;