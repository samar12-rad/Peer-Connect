import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-200">
      <h1 className="mb-4 text-4xl font-bold text-gray-800">Peer Connect</h1>
      <h2 className="mb-6 text-2xl text-gray-600">Login</h2>

      <form
        className="w-72 rounded-lg bg-slate-200 p-8 shadow-lg"
        onSubmit={handleSubmit}
      >
        <div className="mb-6">
          <label htmlFor="email" className="mb-2 block font-bold">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full rounded border border-gray-300 bg-slate-200 p-2 focus:outline-none"
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
