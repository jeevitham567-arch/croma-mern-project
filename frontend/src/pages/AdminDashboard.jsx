import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AdminDashboard() {
  return (
    <>
      <Navbar />

      <div
        style={{
          padding: "40px",
          background: "#f5f5f5",
          minHeight: "80vh",
        }}
      >
        <h1
          style={{
            marginBottom: "30px",
          }}
        >
          Admin Dashboard
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: "20px",
          }}
        >
          <div style={cardStyle}>
            <h2>Products</h2>
            <h1>35</h1>
          </div>

          <div style={cardStyle}>
            <h2>Orders</h2>
            <h1>12</h1>
          </div>

          <div style={cardStyle}>
            <h2>Users</h2>
            <h1>8</h1>
          </div>

          <div style={cardStyle}>
            <h2>Revenue</h2>
            <h1>₹2,50,000</h1>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

const cardStyle = {
  background: "#fff",
  padding: "30px",
  borderRadius: "12px",
  textAlign: "center",
  boxShadow: "0 3px 10px rgba(0,0,0,.1)",
};

export default AdminDashboard;