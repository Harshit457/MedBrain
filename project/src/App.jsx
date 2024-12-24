import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import PrescriptionDetail from "./pages/PrescriptionDetail";
import Landingpage from "./pages/Landingpage";
function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landingpage></Landingpage>}></Route>
          <Route path="/Home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/prescription/:id" element={<PrescriptionDetail />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
