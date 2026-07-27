import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import ProductDetails from "./pages/ProductDetails";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import CategoryProducts from "./pages/CategoryProducts";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";
import AdminDashboard from "./pages/AdminDashboard";
import ManageProducts from "./pages/ManageProducts";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import EditProfile from "./pages/EditProfile";
import ChangePassword from "./pages/ChangePassword";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/category/:category" element={<CategoryProducts />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<ManageProducts />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route path="/admin/edit-product/:id" element={<EditProduct />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/change-password" element={<ChangePassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;