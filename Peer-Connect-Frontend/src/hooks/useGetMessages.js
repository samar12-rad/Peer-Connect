import { useState, useEffect } from 'react';
import useConversation from '../zustand/useConversation';

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { selectedConversation, messages, setMessages } = useConversation();

  useEffect(() => {
    // Only run if there's a selected conversation
    if (!selectedConversation) {
      return;
    }

    const getMessages = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://peer-connect-production.up.railway.app/api/v1/message/getMessages`,
          {
            method: 'POST',
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
  }, [selectedConversation, setMessages]);

  return { messages, loading };
};

export default useGetMessages;
