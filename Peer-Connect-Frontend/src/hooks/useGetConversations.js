import { useState, useEffect } from 'react';
import useConversation from '../zustand/useConversation';
import { apiGet } from '../utils/api';

const useGetConversations = () => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const response = await apiGet('/user/users');
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
