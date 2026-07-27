import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../services/api";

function EditProfile() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    phone: "",
  });

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const res = await API.get("/auth/profile");

      setUser({
        name: res.data.user.name,
        phone: res.data.user.phone || "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      await API.put("/auth/profile", user);

      alert("Profile Updated Successfully");

      navigate("/profile");
    } catch (error) {
      console.log(error);
      alert("Unable to update profile");
    }
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          maxWidth: "600px",
          margin: "40px auto",
          background: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 3px 10px rgba(0,0,0,.1)",
        }}
      >
        <h1>Edit Profile</h1>

        <form onSubmit={updateProfile}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={user.name}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={user.phone}
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
            Update Profile
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

export default EditProfile;