import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:8080", // spring boot backend
// });

const API = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});


// Har request pe token add karne ke liye
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// User Auth
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);

// Schedule
export const createSchedule = () => API.post("/api/schedule");
export const getSchedule = () => API.get("/api/schedule");

export const updateSchedule = (userId, mood) =>
  API.put(`/api/schedule/${userId}`, { mood });

// updateUserProfile
export const updateUserProfile = (userId, updateData) => {
  return API.put(`/api/schedule/${userId}`, updateData);
};

// delete user
export const deleteUser = () => API.delete("/auth/delete");

// Fetch user profile
export const getUserProfile = (userId) => API.get(`/auth/${userId}`);

// Update user profile
export const updateUserProfil = (userId, data) => API.put(`/auth/${userId}`, data);


// New Password APIs
export const forgotPassword = (data) => API.post("/auth/forgot-password", data);
export const resetPassword = (data) => API.post("/auth/reset-password", data);


// 🔹 Task Update API
export const updateTask = (userId, oldTitle, updatedTask) => {
  return API.put(`/api/schedule/${userId}/update-task/${encodeURIComponent(oldTitle)}`, updatedTask);
};


// Delete OneTask
export const deleteTask = (userId, title) => {
  return API.delete(`/api/schedule/${userId}/delete-task/${encodeURIComponent(title)}`);
};


// Add a new task
export const addTask = (userId, task) => {
  return API.post(`/api/schedule/${userId}/add-task`, task);
};
