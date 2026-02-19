// import React, { useState, useEffect } from "react";
// import { getSchedule, deleteUser } from "../services/Api";
// import { useNavigate } from "react-router-dom";
// import { MoreVertical } from "lucide-react";

// export default function MainPage() {
//   const [schedule, setSchedule] = useState([]);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await getSchedule();
//         setSchedule(res.data);
//       } catch (err) {
//         console.error("Error fetching schedule:", err);
//       }
//     })();
//   }, []);

//   const handleLogout = () => {
//     // localStorage.removeItem("token");
//     localStorage.clear();
//     alert("Logged out!");
//     navigate("/register");
//   };

//   const handleDelete = async () => {
//     try {
//       await deleteUser();
//       alert("Account deleted!");
//       // localStorage.removeItem("token");
//       localStorage.clear();
//       navigate("/register");
//     } catch (err) {
//       console.error("Error deleting user:", err);
//       alert("Failed to delete account.");
//     }
//   };


//   return (
//     <div className="min-h-screen bg-[#e0e0e0] text-gray-800 p-6">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>
//         <div className="relative">
//           <button
//             onClick={() => setMenuOpen(!menuOpen)}
//             className="p-2 bg-[#e0e0e0] rounded-full shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff] hover:shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff] transition-all duration-300"
//           >
//             <MoreVertical size={20} />
//           </button>

//           {menuOpen && (
//             <div className="absolute right-0 mt-2 w-40 bg-[#e0e0e0] rounded-lg shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff]">
//               <button
//                 onClick={handleLogout}
//                 className="w-full text-left px-4 py-2 hover:shadow-[inset_3px_3px_6px_#bebebe,inset_-3px_-3px_6px_#ffffff] transition-all duration-200 rounded-lg"
//               >
//                 Logout
//               </button>
//               <button
//                 onClick={handleDelete}
//                 className="w-full text-left px-4 py-2 hover:shadow-[inset_3px_3px_6px_#bebebe,inset_-3px_-3px_6px_#ffffff] transition-all duration-200 rounded-lg text-red-500"
//               >
//                 Delete Account
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Schedule Section */}
//       <div className="bg-[#e0e0e0] rounded-2xl shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] p-6 mb-6">
//         <h2
//           className="text-xl font-semibold mb-4 cursor-pointer hover:underline"
//           onClick={() => navigate("/schedule")}
//         >
//           Today’s Schedule
//         </h2>
//         {schedule.length === 0 ? (
//           <p className="text-gray-600">No schedule found for today.</p>
//         ) : (
//           <ul className="space-y-3">
//             {schedule[0].tasks.slice(0, 3).map((task, idx) => (
//               <li
//                 key={idx}
//                 className="p-4 bg-[#e0e0e0] rounded-lg flex justify-between shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff]"
//               >
//                 <span>{task.title}</span>
//                 <span className="text-gray-500">{task.timeOfDay}</span>
//               </li>
//             ))}
//             {schedule[0].tasks.length > 3 && (
//               <li
//                 className="text-gray-800 font-medium cursor-pointer hover:underline"
//                 onClick={() => navigate("/schedule")}
//               >
//                 + View full schedule
//               </li>
//             )}
//           </ul>
//         )}
//       </div>

//       {/* Update Profile Section */}
//       <div className="bg-[#e0e0e0] rounded-2xl shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] p-6">
//         <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
//         <button
//           onClick={() => navigate("/updateuserpage")}
//           className="px-4 py-2 bg-[#e0e0e0] rounded-lg shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff] hover:shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff] transition-all duration-300"
//         >
//           Update Now
//         </button>
//       </div>
//     </div>
//   );

// }





import React, { useState, useEffect, useRef } from "react";
import { getSchedule, deleteUser } from "../services/Api";
import { useNavigate } from "react-router-dom";
import { MoreVertical, Bell, Clock, ChevronDown } from "lucide-react";

export default function MainPage() {
  const [schedule, setSchedule] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [alarmTime, setAlarmTime] = useState("");
  const [repeatType, setRepeatType] = useState("once");
  const [alarmSet, setAlarmSet] = useState(false);

  const alarmRef = useRef(null);
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
    localStorage.clear();
    alert("Logged out!");
    navigate("/register");
  };

  const handleDelete = async () => {
    try {
      await deleteUser();
      alert("Account deleted!");
      localStorage.clear();
      navigate("/register");
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete account.");
    }
  };

  // 🕒 Set Alarm Logic
  const handleSetAlarm = () => {
    if (!alarmTime) {
      alert("Please select a time first!");
      return;
    }

    setAlarmSet(true);
    alert(`Alarm set for ${alarmTime} (${repeatType})`);

    if (alarmRef.current) clearInterval(alarmRef.current);

    alarmRef.current = setInterval(() => {
      const now = new Date();
      const [hours, minutes] = alarmTime.split(":").map(Number);

      if (now.getHours() === hours && now.getMinutes() === minutes) {
        playAlarmSound();
        clearInterval(alarmRef.current);

        if (repeatType === "daily") {
          alarmRef.current = setTimeout(() => handleSetAlarm(), 24 * 60 * 60 * 1000);
        } else if (repeatType === "weekly") {
          alarmRef.current = setTimeout(() => handleSetAlarm(), 7 * 24 * 60 * 60 * 1000);
        }
      }
    }, 1000);
  };




  const handleCancelAlarm = () => {
    if (alarmRef.current) clearInterval(alarmRef.current);
    setAlarmSet(false);
    alert("Alarm turned off!");
    navigate("/mood");
  };

  const playAlarmSound = () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(880, audioCtx.currentTime);
    oscillator.connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 1);
  };

  useEffect(() => {
    return () => clearInterval(alarmRef.current);
  }, []);

  return (
    <div className="min-h-screen bg-[#e0e0e0] text-gray-800 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 bg-[#e0e0e0] rounded-full shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff] 
                       hover:shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff] transition-all duration-300"
          >
            <MoreVertical size={20} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-[#e0e0e0] rounded-lg 
                            shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff]">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:shadow-[inset_3px_3px_6px_#bebebe,inset_-3px_-3px_6px_#ffffff] transition-all duration-200 rounded-lg"
              >
                Logout
              </button>
              <button
                onClick={handleDelete}
                className="w-full text-left px-4 py-2 text-red-500 
                           hover:shadow-[inset_3px_3px_6px_#bebebe,inset_-3px_-3px_6px_#ffffff] 
                           transition-all duration-200 rounded-lg"
              >
                Delete Account
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Alarm Section */}
      <div className="bg-[#e0e0e0] rounded-2xl shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] p-6 mb-6">
        <h2 className="text-xl font-semibold mb-5 flex items-center gap-3">
          <Bell /> Set Alarm
        </h2>

        {/* Row: Time Picker + Repeat + Button */}
        <div className="flex flex-row gap-4 items-end">
          {/* Time Picker */}
          <NeomorphicTimePicker
            label="Select Time"
            value={alarmTime}
            onChange={setAlarmTime}
          />

          {/* Repeat Type */}
          <NeomorphicSelect
            label="Repeat"
            name="repeat"
            value={repeatType}
            options={["Once", "Daily", "Weekly"]}
            onChange={(name, value) => setRepeatType(value)}
          />

          {/* Alarm Button */}
          {!alarmSet ? (
            <button
              onClick={handleSetAlarm}
              className="h-[56px] px-4 py-2 rounded-xl font-semibold bg-[#e0e0e0] text-gray-800 
                 shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff] 
                 hover:shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff]
                 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Clock size={18} /> Set Alarm
            </button>
          ) : (
            <button
              onClick={handleCancelAlarm}
              className="h-[56px] px-4 py-2 rounded-xl font-semibold bg-[#e0e0e0] text-red-600 
                 shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff] 
                 hover:shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff]
                 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Stop Alarm
            </button>
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
                className="p-4 bg-[#e0e0e0] rounded-lg flex justify-between 
                           shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff]"
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
          className="px-4 py-2 bg-[#e0e0e0] rounded-lg 
                     shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff] 
                     hover:shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff] 
                     transition-all duration-300"
        >
          Update Now
        </button>
      </div>
    </div>
  );
}

// 🌈 NeomorphicSelect Component
function NeomorphicSelect({ label, name, value, options, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative mb-4 w-full sm:w-40">
      <div
        onClick={() => setOpen(!open)}
        className={`w-full px-4 py-2 flex justify-between items-center rounded-xl bg-[#e0e0e0] text-gray-700
                    cursor-pointer select-none
                    ${open
            ? "shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff]"
            : "shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff]"} 
                    transition-all duration-300`}
      >
        <span>{value.charAt(0).toUpperCase() + value.slice(1) || label}</span>
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

// 🌈 NeomorphicTimePicker Component
function NeomorphicTimePicker({ label, value, onChange }) {
  const [open, setOpen] = useState(false);
  const [tempHour, setTempHour] = useState("00");
  const [tempMinute, setTempMinute] = useState("00");

  useEffect(() => {
    if (value) {
      const [h, m] = value.split(":");
      setTempHour(h);
      setTempMinute(m);
    }
  }, [value]);

  const hourOptions = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0")
  );
  const minuteOptions = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0")
  );

  const selectHour = (h) => {
    setTempHour(h);
  };

  const selectMinute = (m) => {
    setTempMinute(m);
    onChange(`${tempHour}:${m}`);
    setOpen(false); // ✅ Only close after final minute selection
  };

  return (
    <div className="relative w-full sm:w-40 mb-4">
      <div
        onClick={() => setOpen(!open)}
        className={`w-full px-4 py-2 flex justify-between items-center rounded-xl bg-[#e0e0e0] text-gray-700 cursor-pointer select-none
          ${open
            ? "shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff]"
            : "shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff]"
          } transition-all duration-300`}
      >
        <span>{value || label}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </div>

      {open && (
        <div className="absolute left-0 top-full mt-2 w-full rounded-xl bg-[#e0e0e0]
            shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff]
            overflow-hidden z-20 flex max-h-60">

          {/* Hours */}
          <div className="flex-1 overflow-y-auto border-r border-gray-300">
            {hourOptions.map((h) => (
              <div
                key={h}
                onClick={() => selectHour(h)}
                className={`px-4 py-2 cursor-pointer text-gray-700 hover:bg-[#d4d4d4] ${h === tempHour ? "font-bold" : ""
                  }`}
              >
                {h}
              </div>
            ))}
          </div>

          {/* Minutes */}
          <div className="flex-1 overflow-y-auto">
            {minuteOptions.map((m) => (
              <div
                key={m}
                onClick={() => selectMinute(m)}
                className={`px-4 py-2 cursor-pointer text-gray-700 hover:bg-[#d4d4d4] ${m === tempMinute ? "font-bold" : ""
                  }`}
              >
                {m}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
