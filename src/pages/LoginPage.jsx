import React, { useState } from "react";
import { loginUser, createSchedule, forgotPassword, resetPassword } from "../services/Api";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [forgotEmail, setForgotEmail] = useState("");
  const [resetData, setResetData] = useState({ email: "", token: "", newPassword: "" });
  const [mode, setMode] = useState("login"); // "login" | "forgot" | "reset"

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginUser(form);
      localStorage.setItem("token", res.data.token);
      alert("Login successful!");
      const result = await createSchedule();
      localStorage.setItem("userId", result.data.userId);
      navigate("/mood");
    } catch (err) {
      alert("Login failed!");
    }
  };

  const handleForgot = async (e) => {
    e.preventDefault();
    setLoading(true); // 👈 loading start
    try {
      await forgotPassword({ email: forgotEmail });
      alert("OTP sent successfully to your email!");
      setMode("reset");
    } catch (err) {
      alert("Failed to send OTP. Please try again!");
    } finally {
      setLoading(false); // 👈 loading end
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true); // 👈 loading start
    try {
      await resetPassword(resetData);
      alert("Password reset successful! Please login again.");
      setMode("login");
    } catch (err) {
      alert("Failed to reset password!");
    } finally {
      setLoading(false); // 👈 loading end
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#e0e0e0]">
      {/* =============== LOGIN FORM =============== */}
      {mode === "login" && (
        <form
          onSubmit={handleSubmit}
          className="relative z-10 w-[420px] p-8 rounded-2xl bg-[#e0e0e0] 
          shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] 
          transition-all duration-500"
        >
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Login
          </h1>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 rounded-xl bg-[#e0e0e0] text-gray-700 
            shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff] 
            focus:outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-6 rounded-xl bg-[#e0e0e0] text-gray-700 
            shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff] 
            focus:outline-none"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#e0e0e0] text-gray-800 font-semibold 
            shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff] 
            hover:shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff] 
            transition-all duration-300"
          >
            Login
          </button>

          <p
            className="text-center text-blue-600 cursor-pointer mt-4 hover:underline"
            onClick={() => navigate("/register")}
          >
            Don’t have an account?{" "}
            <span className="font-semibold">Register</span>
          </p>

          <p
            className="text-center text-gray-600 cursor-pointer mt-2 hover:underline"
            onClick={() => setMode("forgot")}
          >
            Forgot Password?
          </p>
        </form>
      )}

      {/* =============== FORGOT PASSWORD FORM =============== */}
      {mode === "forgot" && (
        <form
          onSubmit={handleForgot}
          className="relative z-10 w-[420px] p-8 rounded-2xl bg-[#e0e0e0] 
    shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] 
    transition-all duration-500"
        >
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Forgot Password
          </h1>

          <input
            type="email"
            name="forgotEmail"
            placeholder="Enter your email"
            value={forgotEmail}
            onChange={(e) => setForgotEmail(e.target.value)}
            required
            className="w-full px-4 py-2 mb-4 rounded-xl bg-[#e0e0e0] text-gray-700 
      shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff] 
      focus:outline-none"
          />

          {/* 🔁 Send OTP button with loading animation */}
          <button
            type="submit"
            disabled={loading}
            className={`relative w-full py-3 rounded-xl font-semibold transition-all duration-300
      ${loading
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-[#e0e0e0] text-gray-800 shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff] hover:shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff]"}
      `}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Sending OTP...
              </span>
            ) : (
              "Send OTP"
            )}
          </button>

          <p
            className="text-center text-blue-600 cursor-pointer mt-4 hover:underline"
            onClick={() => setMode("login")}
          >
            Back to Login
          </p>
        </form>
      )}


      {/* =============== RESET PASSWORD FORM =============== */}
      {mode === "reset" && (
        <form
          onSubmit={handleReset}
          className="relative z-10 w-[420px] p-8 rounded-2xl bg-[#e0e0e0] 
          shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] 
          transition-all duration-500"
        >
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Reset Password
          </h1>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={resetData.email}
            onChange={(e) => setResetData({ ...resetData, email: e.target.value })}
            className="w-full px-4 py-2 mb-4 rounded-xl bg-[#e0e0e0] text-gray-700 
            shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff] 
            focus:outline-none"
          />

          <input
            type="text"
            name="otp"
            placeholder="Reset Token"
            value={resetData.otp}
            onChange={(e) => setResetData({ ...resetData, otp: e.target.value })}
            className="w-full px-4 py-2 mb-4 rounded-xl bg-[#e0e0e0] text-gray-700 
            shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff] 
            focus:outline-none"
          />

          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={resetData.newPassword}
            onChange={(e) => setResetData({ ...resetData, newPassword: e.target.value })}
            className="w-full px-4 py-2 mb-6 rounded-xl bg-[#e0e0e0] text-gray-700 
            shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff] 
            focus:outline-none"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#e0e0e0] text-gray-800 font-semibold 
            shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff] 
            hover:shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff] 
            transition-all duration-300"
          >
            Reset Password
          </button>

          <p
            className="text-center text-blue-600 cursor-pointer mt-4 hover:underline"
            onClick={() => setMode("login")}
          >
            Back to Login
          </p>
        </form>
      )}
    </div>
  );

}
