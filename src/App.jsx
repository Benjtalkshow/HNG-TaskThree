import React from "react";
import "./index.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./Auth/PrivateRoute";
import Gallery from "./pages/Gallery";
import LoginPage from "./pages/LoginPage";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Pulic Pages */}
        <Route index element={<LoginPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="*" element={<ErrorPage />} />

        {/* private route */}
        <Route element={<PrivateRoute />}>
          <Route path="/gallery" element={<Gallery />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
