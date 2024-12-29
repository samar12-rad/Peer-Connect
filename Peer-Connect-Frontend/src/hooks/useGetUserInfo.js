import { useEffect } from 'react';
import useUserData from '../zustand/useUserData';

const useGetUserInfo = () => {
  const { userInfo, setUserInfo } = useUserData();

  const getUserInfo = async () => {
    console.log('Getting user info...');

    try {
      const response = await fetch(
        `https://peer-connect-production.up.railway.app/api/v1/user/data`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();

      if (data) {
        setUserInfo(data);
        console.log('User info:', data);
      }
    } catch (error) {
      console.error('Error getting user info:', error);
    }
  };

  useEffect(() => {
    getUserInfo();

    return () => {
      // Cleanup if needed
    };
  }, []); // Empty dependency array means it runs once on mount

  return { userInfo, getUserInfo };
};

export default useGetUserInfo;
