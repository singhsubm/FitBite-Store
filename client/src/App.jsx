import { Routes, Route } from "react-router-dom";
import MainLayout from "./Layout.jsx";
import Home from "./Home.jsx";
import Shop from "./pages/Shop/Shop.jsx";
import Story from "./pages/Story/Story.jsx";
import ProductDetails from "./pages/ProductDetails/ProductDetails.jsx";
import Checkout from "./pages/Checkout/Checkout.jsx";
import Login from "./pages/Auth/Login.jsx";
import ForgotPassword from "./pages/Auth/ForgotPassword.jsx";
import ResetPassword from "./pages/Auth/ResetPassword.jsx";
import Signup from "./pages/Auth/Signup.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Blog from "./pages/Blog/Blog.jsx";
import BlogDetails from "./pages/Blog/BlogDetails.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import AdminBlog from "./pages/Admin/AdminBlog.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import ContactSection from "./pages/ContactSection/ContactSection.jsx";
import FAQ from "./pages/Info/FAQ.jsx";
import Privacy from "./pages/Info/Privacy.jsx";
import Terms from "./pages/Info/Terms.jsx";


function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/story" element={<Story />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/contact" element={<ContactSection />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />

        <Route element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/blog" element={<AdminBlog />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
