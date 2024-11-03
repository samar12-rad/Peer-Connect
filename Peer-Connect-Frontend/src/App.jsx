import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpOld from './pages/Signup_old/SignUpOld';

import { Dashboard } from './pages/dashboard/Dashboard';
import Profile from './pages/Profile/Profile';
import Login from './pages/login/Login';
import Signup from './pages/Signup/Signup';
import Landing from './pages/landing_page/Landing';

const App = () => {
  return (
    <Router>
      <div className="flex bg-[#1d1c21]">
        <div className="shadow-inner-fat-blue h-fit w-full rounded-l-3xl rounded-r-[0] rounded-bl-none bg-gradient-to-br from-[#9dbbd4] to-[#d4a5b6] pt-5">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signupold" element={<SignUpOld />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Landing />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
