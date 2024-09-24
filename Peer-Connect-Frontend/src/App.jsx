import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from '../Pages/SignUP/SignUp';
import Login from '../Pages/Login/login';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
