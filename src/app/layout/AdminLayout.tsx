import { useEffect } from "react";
// @ts-ignore
import feather from "feather-icons";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import Footer from "../../components/Footer";
import { Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "simplebar/dist/simplebar.min.css";
import "../../App.css"; // keep your existing styling

export default function AdminLayout() {
  useEffect(() => {
    feather.replace();

    const toggleBtn = document.getElementById("sidebarToggle");
    const wrapper = document.querySelector(".wrapper");

    if (toggleBtn && wrapper) {
      const handler = () => wrapper.classList.toggle("toggled");
      toggleBtn.addEventListener("click", handler);
      return () => toggleBtn.removeEventListener("click", handler);
    }
  }, []);

  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main">
        <Topbar />
        <main className="content">
          <div className="container-fluid">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
