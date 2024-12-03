import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Dashboard } from './pages/dashboard/Dashboard';
import Profile from './pages/Profile/Profile';
import Login from './pages/login/Login';
import Signup from './pages/Signup/Signup';
import ChatPage from './pages/chat/ChatPage';
import PeerFinder from './pages/peerFinder/PeerFinder';
import Landing from './pages/landing_page/Landing';
import Navbar from './Components/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="bg-black-2 flex">
        <div className="shadow-inner-fat-blue bg-black-2 mt-10 h-fit min-h-screen w-screen overflow-hidden">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/find" element={<PeerFinder />} />
            <Route path="/landing" element={<Landing />} />
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
