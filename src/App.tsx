
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import { useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import "simplebar/dist/simplebar.min.css";

function App() {
 
  useEffect(() => {

  // Find the button ONLY after render
  const toggleBtn = document.getElementById("sidebarToggle");
  const wrapper = document.querySelector(".wrapper");

  if (toggleBtn && wrapper) {
    const handler = () => wrapper.classList.toggle("toggled");
    toggleBtn.addEventListener("click", handler);

    // cleanup
    return () => toggleBtn.removeEventListener("click", handler);
  }
}, []); // Ok with empty because Topbar rendered once



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

export default App;
