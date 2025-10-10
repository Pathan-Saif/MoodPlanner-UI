import React from "react";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
      <h1 className="text-3xl font-bold mb-6">Welcome to Mood Planner!</h1>
      <div className="space-x-4">
        <Link
          to="/mood"
          className="px-6 py-3 bg-yellow-400 text-black rounded-lg font-semibold shadow-lg"
        >
          Enter Mood
        </Link>
        <Link
          to="/schedule"
          className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold shadow-lg"
        >
          View Schedule
        </Link>
      </div>
    </div>
  );
}
