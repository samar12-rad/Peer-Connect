import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Dashboard } from './pages/dashboard/Dashboard';
import Profile from './pages/Profile/Profile';
import Login from './pages/login/Login';
import Signup from './pages/Signup/Signup';
import ChatPage from './pages/chat/ChatPage';
import PeerFinder from './pages/peerFinder/PeerFinder';
import EnhancedPeerFinder from './pages/peerFinder/EnhancedPeerFinder';
import Landing from './pages/landing_page/Landing';
import Navbar from './Components/Navbar';
import { ProtectedRoute } from './hooks/useAuth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="bg-black-2 flex">
        <div className="shadow-inner-fat-blue bg-black-2 h-fit min-h-screen w-screen overflow-hidden">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/chat" element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            } />
            <Route path="/find" element={
              <ProtectedRoute>
                <EnhancedPeerFinder />
              </ProtectedRoute>
            } />
            <Route path="/find-basic" element={
              <ProtectedRoute>
                <PeerFinder />
              </ProtectedRoute>
            } />
            
            {/* Legacy route redirect */}
            <Route path="/landing" element={<Landing />} />
            
            {/* 404 Route */}
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
          </Routes>
        </div>
      </div>
      
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        style={{ zIndex: 9999 }}
      />
    </Router>
  );
};

export default App;
