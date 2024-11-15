import { useEffect } from 'react';
import useUserData from '../zustand/useUserData';

const useGetUserInfo = () => {
  const { userInfo, setUserInfo } = useUserData();

  const getUserInfo = async () => {
    console.log('Getting user info...');

    try {
      const response = await fetch(`http://localhost:3000/api/v1/user/data`, {
        method: 'GET',
        credentials: 'include',
      });

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
