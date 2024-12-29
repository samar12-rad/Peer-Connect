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
          credentials: 'include', // Include cookies for authentication
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      if (data) {
        setUserInfo(data);
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
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
