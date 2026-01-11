// src/layouts/MainLayout.jsx
import Navbar from "./components/Navbar/Navbar";
import Footer from "./pages/Footer/Footer";
import CartSidebar from "./components/CartSidebar";
import CustomCursor from "./components/CustomCursor/CustomCursor";
import ScrollToTop from "./components/ScrollToTop"
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="relative min-h-screen bg-[#fdfbf7]">
      <CustomCursor />
      <ScrollToTop />
      <Navbar />
      <CartSidebar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
