import { useState } from 'react';
import useConversation from '../zustand/useConversation';

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { selectedConversation, messages, setMessages } = useConversation();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/message/send`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message,
            Id: selectedConversation, // Add receiver ID from selected conversation
          }),
          credentials: 'include',
        }
      );

      const data = await response.json();

      if (data.message) {
        setMessages([
          ...messages,
          {
            sender: data.senderId,
            message: data.message,
          },
        ]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
};

export default useSendMessage;
