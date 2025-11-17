import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile, updateUserProfile } from "../services/Api";
import { Pencil, ChevronDown } from "lucide-react";

export default function UpdateUserPage() {
  const [formData, setFormData] = useState({
    username: "",
    mood: "",
    occupation: "",
    workTime: "",
    gender: "",
    ageGroup: "",
  });

  const [editingField, setEditingField] = useState(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getUserProfile(userId);
        setFormData(res.data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        alert("Error fetching profile. Check console.");
      }
    };
    fetchProfile();
  }, [userId]);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveField = async (fieldName) => {
    try {
      await updateUserProfile(userId, formData);
      setEditingField(null);
      alert(`${fieldName} updated!`);
    } catch (err) {
      console.error("Update failed:", err);
      alert("Something went wrong!");
    }
  };

  const fields = [
    { name: "username", label: "Username", type: "text" },
    { name: "mood", label: "Mood", type: "select", options: ["happy", "sad", "anxious", "focused", "tired"] },
    { name: "occupation", label: "Occupation", type: "select", options: ["engineer", "businessman", "lawyer", "teacher", "singer"] },
    { name: "workTime", label: "Work Time", type: "select", options: ["Early_shift", "Regular_shift", "Late_shift"] },
    { name: "gender", label: "Gender", type: "select", options: ["male", "female", "other"] },
    { name: "ageGroup", label: "Age Group", type: "select", options: ["18 to 25", "26 to 40", "41 to 60"] },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#e0e0e0] p-4">
      <div className="w-[500px] p-8 rounded-2xl bg-[#e0e0e0] shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff]">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Update Your Profile</h1>

        {fields.map((field) => (
          <div key={field.name} className="flex items-center gap-3 mb-4">
            <label className="w-28 font-semibold text-gray-700">{field.label}:</label>

            {/* Input or Neumorphic Select */}
            {editingField === field.name ? (
              field.type === "text" ? (
                <input
                  name={field.name}
                  value={formData[field.name]}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-[#e0e0e0] text-gray-800
                  shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff] focus:outline-none"
                />
              ) : (
                <NeomorphicSelect
                  label={`Select ${field.label}`}
                  name={field.name}
                  value={formData[field.name]}
                  options={field.options}
                  onChange={handleChange}
                />
              )
            ) : (
              <div className="flex-1 flex justify-between items-center px-3 py-2 rounded-xl bg-[#e0e0e0] shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff]">
                <span>{formData[field.name] || `No ${field.label}`}</span>
                <Pencil
                  className="w-5 h-5 text-gray-600 hover:text-blue-600 cursor-pointer"
                  onClick={() => setEditingField(field.name)}
                />
              </div>
            )}

            {/* Save Button */}
            {editingField === field.name && (
              <button
                type="button"
                onClick={() => handleSaveField(field.name)}
                className="ml-2 px-3 py-1 rounded-xl bg-[#e0e0e0] text-gray-800 font-semibold
                shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff]
                hover:shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff]
                transition-all duration-300"
              >
                Save
              </button>
            )}
          </div>
        ))}

        <button
          onClick={() => navigate("/main")}
          className="mt-6 w-full py-3 rounded-xl bg-[#e0e0e0] text-gray-800 font-semibold
          shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff]
          hover:shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff]
          transition-all duration-300"
        >
          Back to Main
        </button>
      </div>
    </div>
  );
}

/* 🌈 Custom Neomorphic Dropdown Component */
function NeomorphicSelect({ label, name, value, options, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex-1">
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
              onClick={() => onChange(name, opt)}
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
