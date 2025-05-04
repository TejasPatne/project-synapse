import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Project from "./pages/Project.tsx";
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Support both URL patterns: with and without year */}
        <Route path="/project/:projectId" element={<Project />} />
        <Route path="/project/:year/:projectId" element={<Project />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
);
