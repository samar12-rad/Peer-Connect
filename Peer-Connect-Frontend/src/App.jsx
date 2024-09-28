import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/login/Login';
//import SignUp from './Components/Signup/SignUp';
import Signup from './Components/Signup_old/SignUp';
import Profile from './Profile/Profile';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} ></Route>
      </Routes>
    </Router>
  );
};

export default App;
