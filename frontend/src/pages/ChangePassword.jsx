import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../services/api";

function ChangePassword() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.currentPassword ||
      !form.newPassword ||
      !form.confirmPassword
    ) {
      alert("Please fill all fields");
      return;
    }

    if (form.newPassword.length < 6) {
      alert("New password must be at least 6 characters");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await API.put("/auth/change-password", {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });

      alert(
        res.data.message ||
          "Password changed successfully"
      );

      navigate("/profile");
    } catch (error) {
      console.log("Change Password Error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to change password"
      );
    } finally {
      setLoading(false);
    }
  };

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
            maxWidth: "600px",
            margin: "0 auto",
            background: "#fff",
            padding: "35px",
            borderRadius: "14px",
            boxShadow: "0 3px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              marginBottom: "10px",
            }}
          >
            Change Password
          </h1>

          <p
            style={{
              textAlign: "center",
              color: "#777",
              marginBottom: "30px",
            }}
          >
            Keep your account secure with a strong password
          </p>

          <form onSubmit={handleSubmit}>
            <label>Current Password</label>

            <input
              type="password"
              name="currentPassword"
              value={form.currentPassword}
              onChange={handleChange}
              placeholder="Enter current password"
              style={inputStyle}
            />

            <label>New Password</label>

            <input
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
              style={inputStyle}
            />

            <label>Confirm New Password</label>

            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              style={inputStyle}
            />

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "14px",
                background: loading
                  ? "#999"
                  : "#00bcd4",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: loading
                  ? "not-allowed"
                  : "pointer",
                fontSize: "16px",
                fontWeight: "bold",
                marginTop: "10px",
              }}
            >
              {loading
                ? "Changing Password..."
                : "Change Password"}
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

export default ChangePassword;