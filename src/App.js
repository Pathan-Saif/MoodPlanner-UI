import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import DashboardPage from "./pages/DashboardPage";
import MoodInputPage from "./pages/MoodInputPage";
import SchedulePage from "./pages/SchedulePage";
import UpdateUserPage from "./pages/UpdateUserPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/mood" element={<MoodInputPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/updateuserpage" element={<UpdateUserPage />} />
      </Routes>
    </Router>
  );
}

export default App;
