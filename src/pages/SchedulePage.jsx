// import React, { useEffect, useState } from "react";
// import { getSchedule } from "../services/Api";
// import { useNavigate } from "react-router-dom";
// import { Clock, Calendar } from "lucide-react";

// export default function SchedulePage() {
//   const [tasks, setTasks] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await getSchedule();
//         console.log("Schedule response:", res.data);

//         // Backend se aane wala object ka tasks array
//         if (res.data && res.data.length > 0) {
//           setTasks(res.data[0].tasks); // Pehle schedule ke tasks nikalna
//         } else {
//           setTasks([]);
//         }
//       } catch (err) {
//         console.error("Failed to fetch schedule", err);
//         setTasks([]);
//       }
//     })();
//   }, []);

//   return (
//     <div className="min-h-screen bg-[#e0e0e0] p-6 text-gray-800">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-3xl font-extrabold flex items-center gap-2">
//           <Calendar className="w-7 h-7" />
//           Today’s Schedule
//         </h2>
//         <button
//           onClick={() => navigate("/main")}
//           className="px-4 py-2 bg-[#e0e0e0] text-gray-800 rounded-lg shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff] hover:shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff] transition-all duration-300"
//         >
//           Go to Main
//         </button>
//       </div>

//       {/* Schedule Section */}
//       {tasks.length > 0 ? (
//         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//           {tasks.map((task, idx) => (
//             <div
//               key={idx}
//               className="p-5 bg-[#e0e0e0] text-gray-800 rounded-2xl shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] hover:shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff] transform hover:scale-[1.02] transition-all duration-300"
//             >
//               <div className="flex justify-between items-center">
//                 <span className="font-semibold text-lg">{task.title}</span>
//                 <span className="flex items-center text-gray-500 text-sm">
//                   <Clock className="w-4 h-4 mr-1" />
//                   {task.timeOfDay}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-center text-lg text-gray-600">
//           No schedule found for today.
//         </p>
//       )}
//     </div>
//   );

// }





import React, { useEffect, useState } from "react";
import { getSchedule, updateTask, deleteTask, addTask } from "../services/Api";
import { useNavigate } from "react-router-dom";
import { Clock, Calendar, Pencil, Trash2, Plus } from "lucide-react";

export default function SchedulePage() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [updatedTask, setUpdatedTask] = useState({ title: "", timeOfDay: "" });
  const [addingTask, setAddingTask] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", timeOfDay: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await getSchedule();
        if (res.data && res.data.length > 0) {
          setTasks(res.data[0].tasks);
        } else {
          setTasks([]);
        }
      } catch (err) {
        console.error("Failed to fetch schedule", err);
        setTasks([]);
      }
    })();
  }, []);

  const handleEditClick = (task) => {
    setEditingTask(task);
    setUpdatedTask({ title: task.title, timeOfDay: task.timeOfDay });
  };

  const handleDeleteClick = async (taskTitle) => {
    if (!window.confirm(`Are you sure you want to delete "${taskTitle}"?`))
      return;

    try {
      const userId = localStorage.getItem("userId");
      await deleteTask(userId, taskTitle);
      setTasks(tasks.filter((t) => t.title !== taskTitle));
      alert("Task deleted successfully!");
    } catch (err) {
      console.error("Error deleting task:", err);
      alert("Failed to delete task!");
    }
  };

  const handleSaveChanges = async () => {
    if (!editingTask) return;
    setLoading(true);
    try {
      const userId = localStorage.getItem("userId");
      const oldTitle = editingTask.title;
      await updateTask(userId, oldTitle, updatedTask);

      const newData = tasks.map((t) =>
        t.title === oldTitle ? updatedTask : t
      );

      setTasks(newData);
      alert("Task updated successfully!");
      setEditingTask(null);
    } catch (err) {
      console.error("Error updating task:", err);
      alert("Failed to update task!");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async () => {
    if (!newTask.title) {
      alert("Please enter a task title!");
      return;
    }
    setLoading(true);
    try {
      const userId = localStorage.getItem("userId");
      await addTask(userId, newTask);

      setTasks([...tasks, newTask]);
      setNewTask({ title: "", timeOfDay: "" });
      setAddingTask(false);
      alert("Task added successfully!");
    } catch (err) {
      console.error("Error adding task:", err);
      alert("Failed to add task!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#e0e0e0] p-6 text-gray-800">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-extrabold flex items-center gap-2">
          <Calendar className="w-7 h-7" />
          Today’s Schedule
        </h2>
        <div className="flex gap-3">
          <button
            onClick={() => setAddingTask(true)}
            className="px-4 py-2 bg-[#e0e0e0] text-gray-800 rounded-xl shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff] hover:shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff] transition-all duration-300 flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            Add Task
          </button>
          <button
            onClick={() => navigate("/main")}
            className="px-4 py-2 bg-[#e0e0e0] text-gray-800 rounded-xl shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff] hover:shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff] transition-all duration-300"
          >
            Go to Main
          </button>
        </div>
      </div>

      {/* Schedule Section */}
      {tasks.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task, idx) => (
            <div
              key={idx}
              className="p-5 bg-[#e0e0e0] text-gray-800 rounded-2xl shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] hover:shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff] transform hover:scale-[1.02] transition-all duration-300 relative"
            >
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-semibold text-lg">{task.title}</span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {task.timeOfDay}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleEditClick(task)}
                    className="text-gray-600 hover:text-blue-600 transition"
                    title="Edit Task"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => handleDeleteClick(task.title)}
                    className="text-gray-600 hover:text-red-600 transition"
                    title="Delete Task"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-600">
          No schedule found for today.
        </p>
      )}

      {/* Edit Modal */}
      {editingTask && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-[#e0e0e0] p-6 rounded-2xl w-96 shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff]">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Edit Task</h3>

            <input
              type="text"
              value={updatedTask.title}
              onChange={(e) =>
                setUpdatedTask({ ...updatedTask, title: e.target.value })
              }
              className="w-full px-4 py-2 mb-3 rounded-xl bg-[#e0e0e0] shadow focus:outline-none text-gray-700"
              placeholder="Task Title"
            />

            <input
              type="text"
              value={updatedTask.timeOfDay}
              onChange={(e) =>
                setUpdatedTask({ ...updatedTask, timeOfDay: e.target.value })
              }
              className="w-full px-4 py-2 mb-4 rounded-xl bg-[#e0e0e0] shadow focus:outline-none text-gray-700"
              placeholder="Time of Day"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditingTask(null)}
                className="px-4 py-2 rounded-xl bg-[#e0e0e0] text-gray-800 shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff] hover:shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff] transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                disabled={loading}
                className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                  loading
                    ? "bg-gray-400 text-white shadow-none"
                    : "bg-[#e0e0e0] text-gray-800 shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff] hover:shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff]"
                }`}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Task Modal */}
      {addingTask && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-[#e0e0e0] p-6 rounded-2xl w-96 shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff]">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Add New Task</h3>

            <input
              type="text"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              className="w-full px-4 py-2 mb-3 rounded-xl bg-[#e0e0e0] shadow focus:outline-none text-gray-700"
              placeholder="Task Title"
            />

            <input
              type="text"
              value={newTask.timeOfDay}
              onChange={(e) =>
                setNewTask({ ...newTask, timeOfDay: e.target.value })
              }
              className="w-full px-4 py-2 mb-4 rounded-xl bg-[#e0e0e0] shadow focus:outline-none text-gray-700"
              placeholder="Time of Day"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setAddingTask(false)}
                className="px-4 py-2 rounded-xl bg-[#e0e0e0] text-gray-800 shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff] hover:shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff] transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                disabled={loading}
                className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                  loading
                    ? "bg-gray-400 text-white shadow-none"
                    : "bg-[#e0e0e0] text-gray-800 shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff] hover:shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff]"
                }`}
              >
                {loading ? "Adding..." : "Add Task"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
