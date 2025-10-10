import React, { useState } from "react";
import { createSchedule } from "../services/Api";
import { useNavigate } from "react-router-dom";

export default function CreateSchedulePage() {
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleCreateSchedule = async () => {
    try {
      const res = await createSchedule();
      setMessage("Schedule created successfully!");
      console.log("Schedule:", res.data);
      navigate("/schedule");
    } catch (err) {
      console.error(err);
      setMessage("Failed to create schedule. Please try again!");
    }
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Create Your Schedule</h2>

      <button
        onClick={handleCreateSchedule}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
      >
        Create Schedule
      </button>

      {message && (
        <p className="mt-4 text-gray-700 font-medium">{message}</p>
      )}
    </div>
  );
}
