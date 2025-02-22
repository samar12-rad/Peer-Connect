import { useEffect } from 'react';
import axios from 'axios';
import useUserData from '../zustand/useUserData';

const useGetUserInfo = () => {
  const { userInfo, setUserInfo } = useUserData();

  const getUserInfo = async () => {
    // Check if the 'connect.sid' cookie is present
    const cookies = document.cookie.split(';').map((cookie) => cookie.trim());
    const connectSidCookie = cookies.find((cookie) =>
      cookie.startsWith('connect.sid=')
    );

    if (!connectSidCookie) {
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/api/v1/user/data`,
        {
          withCredentials: true, // Include cookies for authentication
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status !== 200) {
        throw new Error(`Error: ${response.status}`);
      }

      if (!response.data) {
        throw new Error('No data received');
      }

      const data = response.data;

      if (data) {
        setUserInfo(data);
      }
    } catch (error) {
      console.log('Error fetching user info:', error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return { userInfo, getUserInfo };
};

export default useGetUserInfo;
