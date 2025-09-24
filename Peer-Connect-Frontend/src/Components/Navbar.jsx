import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import peer from '../assets/Peerlist.png';
import useGetUserInfo from '../hooks/useGetUserInfo';
import { buildApiUrl } from '../utils/environment';

const Navbar = () => {
  const location = useLocation();
  
  const isLandingPage = location.pathname === '/landing';
  
  const { userInfo } = useGetUserInfo();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);

  useEffect(() => {
    const checkUserInfo = async () => {
      try {
        console.log('🔍 Navbar - Checking userInfo:', userInfo);
        
        // Check multiple possible structures for user info
        const hasUserData = userInfo?.data?._id || userInfo?._id || userInfo?.id;
        
        console.log('🔍 Navbar - User data found:', !!hasUserData);
        console.log('🔍 Navbar - User ID:', userInfo?.data?._id || userInfo?._id || userInfo?.id);
        
        if (hasUserData) {
          setIsLoggedIn(true);
          console.log('✅ Navbar - User is logged in');
        } else {
          // Check localStorage as fallback
          const localUser = localStorage.getItem('user');
          if (localUser) {
            try {
              const user = JSON.parse(localUser);
              if (user?._id || user?.id) {
                setIsLoggedIn(true);
                console.log('✅ Navbar - User is logged in (from localStorage)');
                return;
              }
            } catch (e) {
              console.log('Error parsing localStorage user data');
            }
          }
          
          setIsLoggedIn(false);
          console.log('❌ Navbar - User is not logged in');
        }
      } catch (error) {
        console.error('Error checking user info:', error);
        setIsLoggedIn(false);
      } finally {
        setAuthChecking(false);
      }
    };

    // Add a small delay to allow userInfo to be fetched
    const timer = setTimeout(() => {
      checkUserInfo();
    }, 100);

    return () => clearTimeout(timer);
  }, [userInfo]); // Remove isLandingPage dependency since we always check auth now

  const handleSignOut = async () => {
    try {
      // Call logout API
      await fetch(buildApiUrl('/user/logout'), {
        method: 'POST',
        credentials: 'include',
      });
      // Clear user info and redirect
      setIsLoggedIn(false);
      window.location.href = '/landing';
    } catch (error) {
      console.error('Error signing out:', error);
      // Even if logout fails, redirect to landing page
      window.location.href = '/landing';
    }
  };

  // Alternative authentication check - direct API call if userInfo is null
  useEffect(() => {
    const directAuthCheck = async () => {
      if (!userInfo && !authChecking) {
        try {
          console.log('🔄 Navbar - Making direct auth check...');
          const response = await fetch(buildApiUrl('/user/data'), {
            method: 'GET',
            credentials: 'include',
          });
          
          if (response.ok) {
            const data = await response.json();
            if (data?.data?._id) {
              setIsLoggedIn(true);
              console.log('✅ Navbar - Direct auth check: User is logged in');
            } else {
              setIsLoggedIn(false);
              console.log('❌ Navbar - Direct auth check: User is not logged in');
            }
          } else {
            setIsLoggedIn(false);
            console.log('❌ Navbar - Direct auth check: API call failed');
          }
        } catch (error) {
          console.error('Direct auth check error:', error);
          setIsLoggedIn(false);
        }
      }
    };

    // Only do direct check if we're on a protected route and don't have user info
    if (['/dashboard', '/profile', '/chat', '/find', '/', '/landing'].includes(location.pathname)) {
      directAuthCheck();
    }
  }, [location.pathname, userInfo, authChecking]);

  // Don't show main navbar on landing page if user is NOT logged in (let landing page show its own Nav)
  if (isLandingPage && !isLoggedIn) {
    return null;
  }

  return (
    <nav className="px-25 z-999999 fixed flex h-fit min-h-[50px] w-full items-center justify-between gap-5 py-5 text-lg font-bold text-[#17A746] backdrop-blur-md bg-black/20 border-b border-gray-800/30">
      <Link to={isLoggedIn ? "/" : "/landing"} className="flex items-center hover:opacity-80">
        <img src={peer} className="h-10" alt="Peer Connect Logo" />
        <p className="text-3xl">Peer Connect</p>
      </Link>
      <div className="flex items-center gap-10">
        <Link to={isLoggedIn ? "/" : "/landing"} className="text-2xl">
          Home
        </Link>
        {isLandingPage ? (
          <button 
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-2xl"
          >
            About
          </button>
        ) : (
          <Link to="/landing" className="text-2xl">
            About
          </Link>
        )}
        <Link to="/find" className="text-2xl">
          Find Peers
        </Link>
        <Link to="/chat" className="text-2xl">
          Chat
        </Link>
        {!isLoggedIn ? (
          <>
            <Link
              to="/login"
              className="hover:text-black-2 rounded-3xl bg-blue-600 from-white to-blue-300 px-5 py-1 text-2xl font-bold text-white duration-300 hover:bg-gradient-to-r"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="hover:text-black-2 rounded-3xl bg-green-600 from-white to-green-300 px-5 py-1 text-2xl font-bold text-white duration-300 hover:bg-gradient-to-r"
            >
              SignUp
            </Link>
          </>
        ) : (
          <>
            <Link to="/profile" className="text-2xl">
              Profile
            </Link>
            <button
              onClick={handleSignOut}
              className="hover:text-black-2 rounded-3xl bg-red-600 from-white to-red-300 px-5 py-1 text-2xl font-bold text-white duration-300 hover:bg-gradient-to-r"
            >
              Sign Out
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
