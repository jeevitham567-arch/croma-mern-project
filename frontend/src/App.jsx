import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";

import ProductDetails from "./pages/ProductDetails";
import CategoryProducts from "./pages/CategoryProducts";

import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import ChangePassword from "./pages/ChangePassword";

import AdminDashboard from "./pages/AdminDashboard";
import ManageProducts from "./pages/ManageProducts";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import AdminOrders from "./pages/AdminOrders";
import AdminUsers from "./pages/AdminUsers";

import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PRODUCTS */}
        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/category/:category"
          element={<CategoryProducts />}
        />

        {/* SHOPPING */}
        <Route path="/cart" element={<Cart />} />

        <Route
          path="/wishlist"
          element={<Wishlist />}
        />

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        <Route
          path="/orders"
          element={<Orders />}
        />

        {/* PROFILE */}
        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/edit-profile"
          element={<EditProfile />}
        />

        <Route
          path="/change-password"
          element={<ChangePassword />}
        />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/products"
          element={<ManageProducts />}
        />

        <Route
          path="/admin/add-product"
          element={<AddProduct />}
        />

        <Route
          path="/admin/edit-product/:id"
          element={<EditProduct />}
        />

        <Route
          path="/admin/orders"
          element={<AdminOrders />}
        />

        <Route
          path="/admin/users"
          element={<AdminUsers />}
        />

        {/* 404 */}
        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;