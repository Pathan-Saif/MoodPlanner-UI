import React, { useState, useEffect } from "react";
import { getSchedule, deleteUser } from "../services/Api";
import { useNavigate } from "react-router-dom";
import { MoreVertical } from "lucide-react";

export default function MainPage() {
  const [schedule, setSchedule] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await getSchedule();
        setSchedule(res.data);
      } catch (err) {
        console.error("Error fetching schedule:", err);
      }
    })();
  }, []);

  const handleLogout = () => {
    // localStorage.removeItem("token");
    localStorage.clear();
    alert("Logged out!");
    navigate("/register");
  };

  const handleDelete = async () => {
    try {
      await deleteUser();
      alert("Account deleted!");
      // localStorage.removeItem("token");
      localStorage.clear();
      navigate("/register");
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete account.");
    }
  };


  return (
    <div className="min-h-screen bg-[#e0e0e0] text-gray-800 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 bg-[#e0e0e0] rounded-full shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff] hover:shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff] transition-all duration-300"
          >
            <MoreVertical size={20} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-[#e0e0e0] rounded-lg shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff]">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:shadow-[inset_3px_3px_6px_#bebebe,inset_-3px_-3px_6px_#ffffff] transition-all duration-200 rounded-lg"
              >
                Logout
              </button>
              <button
                onClick={handleDelete}
                className="w-full text-left px-4 py-2 hover:shadow-[inset_3px_3px_6px_#bebebe,inset_-3px_-3px_6px_#ffffff] transition-all duration-200 rounded-lg text-red-500"
              >
                Delete Account
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Schedule Section */}
      <div className="bg-[#e0e0e0] rounded-2xl shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] p-6 mb-6">
        <h2
          className="text-xl font-semibold mb-4 cursor-pointer hover:underline"
          onClick={() => navigate("/schedule")}
        >
          Today’s Schedule
        </h2>
        {schedule.length === 0 ? (
          <p className="text-gray-600">No schedule found for today.</p>
        ) : (
          <ul className="space-y-3">
            {schedule[0].tasks.slice(0, 3).map((task, idx) => (
              <li
                key={idx}
                className="p-4 bg-[#e0e0e0] rounded-lg flex justify-between shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff]"
              >
                <span>{task.title}</span>
                <span className="text-gray-500">{task.timeOfDay}</span>
              </li>
            ))}
            {schedule[0].tasks.length > 3 && (
              <li
                className="text-gray-800 font-medium cursor-pointer hover:underline"
                onClick={() => navigate("/schedule")}
              >
                + View full schedule
              </li>
            )}
          </ul>
        )}
      </div>

      {/* Update Profile Section */}
      <div className="bg-[#e0e0e0] rounded-2xl shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] p-6">
        <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
        <button
          onClick={() => navigate("/updateuserpage")}
          className="px-4 py-2 bg-[#e0e0e0] rounded-lg shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff] hover:shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff] transition-all duration-300"
        >
          Update Now
        </button>
      </div>
    </div>
  );

}





