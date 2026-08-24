import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import WhatsAppButton from "./components/WhatsAppButton.jsx";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Services from "./pages/Services.jsx";
import Products from "./pages/Products.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Careers from "./pages/Careers.jsx";
import Contact from "./pages/Contact.jsx";

import AdminLogin from "./admin/AdminLogin.jsx";
import AdminLayout from "./admin/AdminLayout.jsx";
import ManageProducts from "./admin/ManageProducts.jsx";
import ManageCategories from "./admin/ManageCategories.jsx";
import ManageJobs from "./admin/ManageJobs.jsx";
import RequireAuth from "./admin/RequireAuth.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin/>}/>
      <Route path="/admin" element={<RequireAuth><AdminLayout/></RequireAuth>}>
        <Route index element={<ManageProducts/>}/>
        <Route path="products" element={<ManageProducts/>}/>
        <Route path="categories" element={<ManageCategories/>}/>
        <Route path="jobs" element={<ManageJobs/>}/>
      </Route>
      <Route path="*" element={
        <>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/services" element={<Services/>}/>
            <Route path="/products" element={<Products/>}/>
            <Route path="/products/:slug" element={<ProductDetail/>}/>
            <Route path="/careers" element={<Careers/>}/>
            <Route path="/contact" element={<Contact/>}/>
          </Routes>
          <Footer/>
          <WhatsAppButton/>
        </>
      }/>
    </Routes>
  );
}
