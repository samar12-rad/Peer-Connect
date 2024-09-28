import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import SignUp from "./pages/Signup_old/SignUp";
import Sidebar from "./Components/Sidebar";
import { Dashboard } from "./pages/dashboard/Dashboard";

const App = () => {
  return (
    <Router>
      <div className="bg-[#1d1c21] flex gap-0 p-0 m-0">
        <Sidebar />
        <div className="w-full bg-[#000000] pl-5 pt-5 rounded-l-3xl rounded-bl-none h-fit shadow-inner-fat-blue rounded-r-[0]">
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
