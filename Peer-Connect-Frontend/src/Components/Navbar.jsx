import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import peer from '../assets/Peerlist.png';
import useGetUserInfo from '../hooks/useGetUserInfo';
// Adjust the import path as needed

const Navbar = () => {
  const { userInfo } = useGetUserInfo();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUserInfo = async () => {
      try {
        if (userInfo) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    checkUserInfo();
  }, []);

  return (
    <nav className="px-25 z-999999 fixed flex h-fit min-h-[50px] w-full items-center justify-between gap-5 py-5 text-lg font-bold text-[#17A746]">
      <div className="flex items-center">
        <img src={peer} className="h-10" alt="Peer Connect Logo" />
        <p className="text-3xl">Peer Connect</p>
      </div>
      <div className="flex items-center gap-10">
        <Link to="/" className="text-2xl">
          Home
        </Link>
        <Link to="/landing" className="text-2xl">
          About
        </Link>
        <Link to="/find" className="text-2xl">
          Find Peers
        </Link>
        <Link to="/chat" className="text-2xl">
          Chat
        </Link>
        {!isLoggedIn && (
          <Link
            to="/signup"
            className="hover:text-black-2 rounded-3xl bg-green-600 from-white to-green-300 px-5 py-1 text-2xl font-bold text-white duration-300 hover:bg-gradient-to-r"
          >
            SignUp
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
