import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
// import DashboardPage from "./pages/DashboardPage";
import MoodInputPage from "./pages/MoodInputPage";
import SchedulePage from "./pages/SchedulePage";
import UpdateUserPage from "./pages/UpdateUserPage";
import VerifyEmail from "./pages/VerifyEmail";
import VerifiedSuccess from "./pages/VerifiedSuccess";
import VerifyFailed from "./pages/VerifyFailed";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* <Route path="/verified-success" element={<VerifiedSuccess />} />
        <Route path="/verify-failed" element={<VerifyFailed />} /> */}

        <Route path="/login" element={<LoginPage />} />
        <Route path="/mood" element={<MoodInputPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/updateuserpage" element={<UpdateUserPage />} />

        <Route path="/verify" element={<VerifyEmail />} />
        <Route path="/verified-success" element={<VerifiedSuccess />} />
        <Route path="/verify-failed" element={<VerifyFailed />} />

      </Routes>
    </Router>
  );
}

export default App;
