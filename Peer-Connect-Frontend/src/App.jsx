import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './pages/Signup_old/SignUp';
import Sidebar from './Components/Sidebar';
import { Dashboard } from './pages/dashboard/Dashboard';
import Profile from './pages/Profile/Profile';
import Login from './pages/login/Login';

const App = () => {
  return (
    <Router>
      <div className="bg-[#1d1c21] flex">
        <Sidebar />
        <div className="w-full bg-gradient-to-br from-[#9dbbd4] to-[#d4a5b6] pt-5 rounded-l-3xl rounded-bl-none h-fit shadow-inner-fat-blue rounded-r-[0]">
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
