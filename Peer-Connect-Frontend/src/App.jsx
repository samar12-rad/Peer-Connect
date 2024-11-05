import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpOld from './pages/Signup_old/SignUpOld';
import { Dashboard } from './pages/dashboard/Dashboard';
import Profile from './pages/Profile/Profile';
import Login from './pages/login/Login';
import Signup from './pages/Signup/Signup';
import Landing from './pages/landing_page/Landing';
import ChatPage from './pages/chat/ChatPage';
import PeerFinder from './pages/peerFinder/PeerFinder';
import Hello from './pages/Hello/Hello';

const App = () => {
  return (
    <Router>
      <div className="flex">
        <div className="shadow-inner-fat-blue h-fit min-h-screen w-full bg-gradient-to-br from-[#9dbbd4] to-[#d4a5b6]">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signupold" element={<SignUpOld />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Landing />} />
            <Route path="/find" element={<PeerFinder />} />
            <Route path="/" element={<Hello />} />
            <Route
              path="*"
              element={
                <div className="flex h-screen w-full flex-col items-center justify-center text-center text-5xl">
                  <div className="items-center justify-center text-center text-red-900">
                    404
                  </div>
                  Check your URL
                </div>
              }
            />
            <Route path="/chat" element={<ChatPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
