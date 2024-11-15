import { useEffect, useState } from 'react';

const useGetConversations = () => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const response = await fetch(
          'http://localhost:3000/api/v1/user/users',
          {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
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
