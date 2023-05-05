import { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import MainPage from "./pages/MainPage/MainPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/home" element={<MainPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
