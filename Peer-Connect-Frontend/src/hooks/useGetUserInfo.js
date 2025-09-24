import { useEffect } from 'react';
import useUserData from '../zustand/useUserData';
import { buildApiUrl } from '../utils/environment';

// Add state to track if we're currently fetching
let isFetching = false;

const useGetUserInfo = () => {
  const { userInfo, setUserInfo } = useUserData();

  const getUserInfo = async () => {
    // Prevent multiple simultaneous calls
    if (isFetching) {
      console.log('Already fetching user info, skipping...');
      return;
    }

    // If we already have user info, don't fetch again unless needed
    if (userInfo?.data?._id) {
      console.log('User info already available, skipping fetch');
      return;
    }

    console.log('Getting user info...');
    isFetching = true;

    try {
      const apiUrl = buildApiUrl('/user/data');
      console.log('🌐 Fetching user info from:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        credentials: 'include',
      });

      const data = await response.json();
      
      console.log('📡 API Response status:', response.status);
      console.log('📡 API Response data:', data);

      if (response.ok && data && !data.error) {
        setUserInfo(data);
        console.log('✅ User info set in store:', data);
      } else {
        console.log('❌ API call failed or returned error:', {
          status: response.status,
          data: data,
          error: data?.error
        });
        setUserInfo(null);
      }
    } catch (error) {
      console.error('Error getting user info:', error);
    } finally {
      isFetching = false;
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
