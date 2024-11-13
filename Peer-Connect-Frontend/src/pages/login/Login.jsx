import { useState } from 'react';
import peer from '../../assets/Peerlist.png';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
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
          Login
        </button>
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
