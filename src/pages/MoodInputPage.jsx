import React, { useState } from "react";
import { updateSchedule } from "../services/Api";
import { useNavigate } from "react-router-dom";

export default function MoodInputPage() {
  const [mood, setMood] = useState("happy");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId"); // login ke baad save kiya tha
      if (!userId) {
        alert("User not found. Please login again.");
        return;
      }

      await updateSchedule(userId, mood);

      // success ke baad SchedulePage par bhejna hai
      navigate("/schedule");
    } catch (err) {
      alert("Failed to update schedule");
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
        How are you feeling?
      </h1>

      <select
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        className="w-full px-4 py-2 mb-6 rounded-xl bg-[#e0e0e0] 
        shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff] 
        focus:outline-none"
      >
        <option value="happy">Happy</option>
        <option value="sad">Sad</option>
        <option value="anxious">Anxious</option>
        <option value="focused">Focused</option>
        <option value="tired">Tired</option>
        <option value="default">Default</option>
      </select>

      <button
        type="submit"
        className="w-full py-3 rounded-xl bg-[#e0e0e0] text-gray-800 font-semibold 
        shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff] 
        hover:shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff] 
        transition-all duration-300"
      >
        Save Mood & Generate Schedule
      </button>
    </form>
  </div>
);


  

  // return (
  //   <div className="relative flex items-center justify-center h-screen overflow-hidden bg-gradient-to-tr from-purple-500 via-blue-500 to-rose-400">
  //     {/* Background animated waves */}
  //     <div className="absolute w-[200%] h-[200%] animate-spin-slow bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,transparent_60%)]"></div>

  //     {/* Floating 3D form card */}
  //     <form
  //       onSubmit={handleSubmit}   // 👈 yahan add kiya
  //       className="relative z-10 w-[420px] p-8 rounded-2xl shadow-2xl 
  //       bg-white/30 backdrop-blur-xl border border-white/40 
  //       transform hover:rotate-1 hover:-rotate-x-1 hover:scale-[1.02] transition-all duration-500"
  //     >
  //       <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
  //         How are you feeling?
  //       </h1>

  //       <select
  //         value={mood}
  //         onChange={(e) => setMood(e.target.value)}
  //         className="w-full px-4 py-2 mb-6 rounded-xl bg-white/70 backdrop-blur-md 
  //         border border-white/40 text-black placeholder-gray-500
  //         focus:outline-none focus:ring-2 focus:ring-purple-400"
  //       >
  //         <option value="happy">Happy</option>
  //         <option value="sad">Sad</option>
  //         <option value="anxious">Anxious</option>
  //         <option value="focused">Focused</option>
  //         <option value="tired">Tired</option>
  //         <option value="default">Default</option>
  //       </select>

  //       <button
  //         type="submit"
  //         className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 
  //         text-white font-semibold shadow-lg transform hover:scale-105 hover:shadow-2xl 
  //         transition-all duration-300"
  //       >
  //         Save Mood & Generate Schedule
  //       </button>
  //     </form>
  //   </div>
  // );
}

