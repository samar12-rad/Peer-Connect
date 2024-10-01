import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './pages/Signup_old/SignUp';
import Sidebar from './Components/Sidebar';
import { GridBackgroundDemo } from './Components/GridBackground';
import { Dashboard } from './pages/dashboard/Dashboard';

const App = () => {
  return (
    <Router>
      <div className="bg-[#1d1c21] flex">
        <Sidebar />
        <div className="w-full bg-[#000000] pl-5 pt-5 rounded-l-3xl rounded-bl-none h-fit shadow-inner-fat-blue rounded-r-[0]">
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/grid" element={<GridBackgroundDemo />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
