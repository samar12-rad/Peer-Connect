import { useState, useEffect } from 'react';
import useConversation from '../zustand/useConversation';

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { selectedConversation, messages, setMessages } = useConversation();

  useEffect(() => {
    console.log('inside UE of useGetMessages', selectedConversation);
    const getMessages = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/message/getMessages`,
          {
            method: 'POST', // Changed to POST as backend expects body
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Id: selectedConversation }),
            credentials: 'include',
          }
        );
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, [selectedConversation]);

  return { messages, loading };
};

export default useGetMessages;
