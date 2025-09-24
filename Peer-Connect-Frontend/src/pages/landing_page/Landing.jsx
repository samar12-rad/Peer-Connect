import { useState, useEffect } from 'react';
import About from './About';
import Faq from './Faq';
import Footer from './Footer';
import Header from './Header';
import Nav from './Nav';
import useGetUserInfo from '../../hooks/useGetUserInfo';

const Landing = () => {
  const { userInfo } = useGetUserInfo();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const hasUserData = userInfo?.data?._id || userInfo?._id || userInfo?.id;
    
    // Also check localStorage as fallback
    if (!hasUserData) {
      const localUser = localStorage.getItem('user');
      if (localUser) {
        try {
          const user = JSON.parse(localUser);
          if (user?._id || user?.id) {
            setIsLoggedIn(true);
            return;
          }
        } catch (e) {
          console.log('Error parsing localStorage user data');
        }
      }
    }
    
    setIsLoggedIn(!!hasUserData);
  }, [userInfo]);

  return (
    <div className={`bg-black-2 flex h-fit w-full flex-col gap-2 ${isLoggedIn ? 'pt-16' : ''}`}>
      {/* Only show landing page Nav if user is NOT logged in */}
      {/* When logged in, the main Navbar from App.jsx will be shown instead */}
      {!isLoggedIn && <Nav />}

      <Header />
      <About />
      <Faq />

      <Footer />
    </div>
  );
};

export default Landing;
