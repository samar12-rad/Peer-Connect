import { useState, useEffect } from 'react';
import useConversation from '../zustand/useConversation';
import { buildApiUrl } from '../utils/environment';

const useGetConversations = () => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const response = await fetch(buildApiUrl('/user/users'), {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setConversations(data);
      } catch (error) {
        console.error('Error fetching conversations:', error);
      }
    };

    getConversations();
  }, []);
  return conversations;
};

export default useGetConversations;
