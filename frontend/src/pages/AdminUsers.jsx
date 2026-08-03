import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../services/api";

function AdminUsers() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!user || !token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    if (user.role !== "admin") {
      alert("Access denied. Admin only.");
      navigate("/");
      return;
    }

    getUsers();
  };

  const getUsers = async () => {
    try {
      const res = await API.get("/auth/admin/users");

      setUsers(res.data.users || []);
    } catch (error) {
      console.log("Users Error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to load users"
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
          padding: "40px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "auto",
          }}
        >
          <h1>Manage Users</h1>

          <p
            style={{
              color: "#777",
              marginBottom: "30px",
            }}
          >
            View all registered users.
          </p>

          {loading ? (
            <h2>Loading users...</h2>
          ) : users.length === 0 ? (
            <div
              style={{
                background: "#fff",
                padding: "40px",
                borderRadius: "12px",
                textAlign: "center",
              }}
            >
              <h2>No Users Found</h2>
            </div>
          ) : (
            <div
              style={{
                background: "#fff",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow:
                  "0 3px 10px rgba(0,0,0,0.08)",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                }}
              >
                <thead
                  style={{
                    background: "#00b894",
                    color: "#fff",
                  }}
                >
                  <tr>
                    <th style={thStyle}>Name</th>
                    <th style={thStyle}>Email</th>
                    <th style={thStyle}>Phone</th>
                    <th style={thStyle}>Role</th>
                    <th style={thStyle}>Joined</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user._id}
                      style={{
                        borderBottom:
                          "1px solid #eee",
                      }}
                    >
                      <td style={tdStyle}>
                        {user.name}
                      </td>

                      <td style={tdStyle}>
                        {user.email}
                      </td>

                      <td style={tdStyle}>
                        {user.phone || "N/A"}
                      </td>

                      <td style={tdStyle}>
                        <span
                          style={{
                            background:
                              user.role === "admin"
                                ? "#6c5ce7"
                                : "#00b894",
                            color: "#fff",
                            padding: "6px 12px",
                            borderRadius: "15px",
                            fontWeight: "bold",
                          }}
                        >
                          {user.role}
                        </span>
                      </td>

                      <td style={tdStyle}>
                        {user.createdAt
                          ? new Date(
                              user.createdAt
                            ).toLocaleDateString()
                          : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

const thStyle = {
  padding: "15px",
  textAlign: "center",
};

const tdStyle = {
  padding: "15px",
  textAlign: "center",
};

export default AdminUsers;