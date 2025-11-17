import React, { useState } from "react";
import { registerUser } from "../services/Api";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, ChevronDown } from "lucide-react";

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    admin: false,
    mood: "happy",
    occupation: "",
    ageGroup: "",
    workTime: "",
    gender: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    await registerUser(form);

    // Backend sirf "Registered" bhej raha hai
    alert(
      "Registered successfully! A verification link has been sent to your email. Please verify your account before logging in."
    );

    // Redirect to login page (user cannot login until verified)
    navigate("/login");

  } catch (err) {
    console.error("Registration error:", err.response?.data || err.message);
    alert(err.response?.data?.message || "Registration failed!");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="flex items-center justify-center h-screen bg-[#e0e0e0]">
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-[420px] p-8 rounded-2xl bg-[#e0e0e0] 
                   shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] 
                   transition-all duration-500"
      >
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Register
        </h1>

        {/* Username */}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={(e) => handleChange("username", e.target.value)}
          required
          className="w-full px-4 py-2 mb-4 rounded-xl bg-[#e0e0e0] text-gray-700 
                     shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff] 
                     focus:outline-none"
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Please Enter Valid Email"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          required
          className="w-full px-4 py-2 mb-4 rounded-xl bg-[#e0e0e0] text-gray-700 
                     shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff] 
                     focus:outline-none"
        />

        {/* Password */}
        <div className="relative w-full mb-6">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
            required
            className="w-full px-4 py-2 pr-12 rounded-xl bg-[#e0e0e0] text-gray-700 
                       shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff] 
                       focus:outline-none transition-all duration-300"
          />
          <div
            className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600 hover:text-blue-600 transition"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </div>
        </div>

        {/* Custom Neomorphic Select Fields */}
        <NeomorphicSelect
          label="Select Occupation"
          name="occupation"
          value={form.occupation}
          options={["Engineer", "Businessman", "Lawyer", "Teacher", "Singer"]}
          onChange={handleChange}
        />
        <NeomorphicSelect
          label="Select Gender"
          name="gender"
          value={form.gender}
          options={["Male", "Female", "Other"]}
          onChange={handleChange}
        />
        <NeomorphicSelect
          label="Select Age Group"
          name="ageGroup"
          value={form.ageGroup}
          options={["18 to 25", "26 to 40", "41 to 60"]}
          onChange={handleChange}
        />
        <NeomorphicSelect
          label="Select Work Time"
          name="workTime"
          value={form.workTime}
          // options={["9 to 5", "10 to 6", "Night Shift"]}
          options={["Early_shift", "Regular_shift", "Late_shift"]}
          onChange={handleChange}
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 
            ${
              loading
                ? "bg-gray-400 text-white"
                : "bg-[#e0e0e0] text-gray-800 shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff] hover:shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff]"
            }`}
        >
          {loading ? "Sending Verification..." : "Register"}
        </button>

        <p
          className="text-center text-blue-600 cursor-pointer mt-4 hover:underline"
          onClick={() => navigate("/login")}
        >
          Already have an account? <span className="font-semibold">Login</span>
        </p>
      </form>
    </div>
  );
}

/* 🌈 Custom Neomorphic Dropdown Component */
function NeomorphicSelect({ label, name, value, options, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative mb-4">
      <div
        onClick={() => setOpen(!open)}
        className={`w-full px-4 py-2 flex justify-between items-center rounded-xl bg-[#e0e0e0] text-gray-700 
                    cursor-pointer select-none
                    ${open
                      ? "shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff]"
                      : "shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff]"
                    } transition-all duration-300`}
      >
        <span>{value || label}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </div>

      {open && (
        <div
          className="absolute left-0 top-full mt-2 w-full rounded-xl bg-[#e0e0e0] 
                     shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff] 
                     overflow-hidden z-20"
        >
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                onChange(name, opt.toLowerCase());
                setOpen(false);
              }}
              className="px-4 py-2 hover:bg-[#d4d4d4] cursor-pointer text-gray-700 transition-all"
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
