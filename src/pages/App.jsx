import React from "react";
import { Navigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import UpdateUserPage from "./pages/UpdateUserPage";
import SchedulePage from "./pages/SchedulePage";
import MoodInputPage from "./pages/MoodInputPage";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Navbar */}
        <nav className="bg-blue-600 text-white p-4 flex justify-between">
          <h1 className="font-bold">Mood Planner</h1>
          <div className="space-x-4">
            <Link to="/register" className="hover:underline">
              Register
            </Link>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
          </div>
        </nav>

        {/* Routes */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<RegisterPage />} /> 
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/mood" element={<MoodInputPage />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/updateuserpage" element={<UpdateUserPage />} />
            {/* <Route path="*" element={<Navigate to="/" replace />} /> fallback */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}
