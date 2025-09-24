import { useState } from 'react';
import peer from '../../assets/Peerlist.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { buildApiUrl } from '../../utils/environment';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext.jsx';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { refreshAuth, setIsAuthenticated } = useAuth();

  // Configure axios defaults
  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const loginUrl = buildApiUrl('/user/login');
      console.log('🔑 Login URL:', loginUrl);
      
      const response = await axios.post(loginUrl, {
        email,
        password,
      });

      console.log('🔑 Login response received:', response);
      console.log('🔑 Login response status:', response.status);
      console.log('🔑 Login response data:', response.data);

      if (response.status === 200 && response.data && (response.data.message === 'Login successful' || response.data.sessionId)) {
        // Session cookie will be automatically handled by the browser
        // Store any additional user info if needed
        localStorage.setItem('user', JSON.stringify(response.data.user));
        toast.success('Login successful! Welcome back!', {
          position: "top-right",
          autoClose: 3000,
        });
        
        console.log('🔑 Login successful, setting auth state and navigating...');
        
        // Immediately set authentication to true since login was successful
        setIsAuthenticated(true);
        
        // Navigate using React Router
        navigate('/dashboard');
      } else {
        console.log('❌ Login response condition not met');
        console.log('❌ Response status:', response.status);
        console.log('❌ Response data:', response.data);
        toast.error('Login response was unexpected. Please try again.');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      setError(errorMessage);
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black-2 flex h-screen flex-col items-center justify-center">
      <div className="mb-5 flex items-center justify-center">
        <img className="h-9" src={peer}></img>

        <h1 className="text-4xl font-bold text-gray-800 text-green-400">
          Peer Connect
        </h1>
      </div>
      <h2 className="mb-6 text-2xl text-gray-600">Login</h2>

      <form
        className="bg-black-2 text-black-2 w-90 rounded-lg border border-white p-8 shadow-lg"
        onSubmit={handleSubmit}
      >
        <div className="mb-6">
          <label htmlFor="email" className="mb-2 block font-bold text-white">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="bg-black-2 w-full rounded border border-gray-300 border-green-400 p-2 text-white focus:outline-none"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="mb-2 block font-bold text-white">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="bg-black-2 w-full rounded border border-green-400 p-2 text-white focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded bg-green-500 p-3 font-bold text-white hover:bg-green-600"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <p className="mt-2 text-red-500">{error}</p>}
        <button className="mt-2 w-full rounded bg-green-500 p-3 font-bold text-white hover:bg-green-600">
          <a
            href="/signup"
            className="mt-1 block text-center text-white hover:underline"
          >
            Create An Account
          </a>
        </button>
      </form>
    </div>
  );
};

export default Login;
