import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../services/api";

function ChangePassword() {
  const navigate = useNavigate();

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  const changePassword = async (e) => {
    e.preventDefault();

    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await API.put("/auth/change-password", passwords);

      alert("Password Changed Successfully");

      navigate("/profile");
    } catch (error) {
      console.log(error);
      alert("Unable to change password");
    }
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          maxWidth: "500px",
          margin: "40px auto",
          background: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 3px 10px rgba(0,0,0,.1)",
        }}
      >
        <h1>Change Password</h1>

        <form onSubmit={changePassword}>
          <input
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            value={passwords.currentPassword}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={passwords.newPassword}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            value={passwords.confirmPassword}
            onChange={handleChange}
            style={inputStyle}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "15px",
              background: "#00bcd4",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Update Password
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  boxSizing: "border-box",
};

export default ChangePassword;