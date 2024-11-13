import { useState } from 'react';
import peer from '../../assets/Peerlist.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Configure axios defaults
  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/user/login',
        {
          email,
          password,
        }
      );

      if (response.data.sessionId) {
        // Session cookie will be automatically handled by the browser
        // Store any additional user info if needed
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
    navigate('/');
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
        className="bg-black-2 text-black-2 w-72 rounded-lg border border-white p-8 shadow-lg"
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
            className="bg-black-2 w-full rounded border border-gray-300 border-green-400 p-2 text-white placeholder-green-400 focus:outline-none"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="mb-2 block font-bold">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="w-full rounded border border-gray-300 bg-slate-200 p-2 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded bg-blue-500 p-3 text-white hover:bg-blue-700"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <p className="mt-2 text-red-500">{error}</p>}
        <button className="mt-2 w-full rounded bg-blue-500 p-3 text-white hover:bg-blue-700">
          <a
            href="/signup"
            className="mt-1 block text-center text-white hover:underline"
          >
            SignUp
          </a>
        </button>
      </form>
    </div>
  );
};

export default Login;
