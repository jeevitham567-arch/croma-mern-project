import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../services/api";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const res = await API.get("/auth/users");

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
            View all registered customers.
          </p>

          <div
            style={{
              background: "#fff",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow:
                "0 3px 10px rgba(0,0,0,0.08)",
            }}
          >
            {loading ? (
              <h3
                style={{
                  textAlign: "center",
                  padding: "40px",
                }}
              >
                Loading users...
              </h3>
            ) : users.length === 0 ? (
              <h3
                style={{
                  textAlign: "center",
                  padding: "40px",
                }}
              >
                No users found.
              </h3>
            ) : (
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                }}
              >
                <thead
                  style={{
                    background: "#00bcd4",
                    color: "#fff",
                  }}
                >
                  <tr>
                    <th style={thStyle}>Name</th>
                    <th style={thStyle}>Email</th>
                    <th style={thStyle}>Phone</th>
                    <th style={thStyle}>Role</th>
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
                        {user.phone || "Not added"}
                      </td>

                      <td style={tdStyle}>
                        <span
                          style={{
                            padding: "6px 14px",
                            borderRadius: "20px",
                            background:
                              user.role === "admin"
                                ? "#ffeaa7"
                                : "#dfe6e9",
                            fontWeight: "bold",
                          }}
                        >
                          {user.role}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

const thStyle = {
  padding: "16px",
  textAlign: "center",
};

const tdStyle = {
  padding: "16px",
  textAlign: "center",
};

export default ManageUsers;