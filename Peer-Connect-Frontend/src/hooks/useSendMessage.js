import { useState } from 'react';
import useConversation from '../zustand/useConversation';
import { useSocketContext } from '../context/SocketContext';
import useGetUserInfo from './useGetUserInfo';
import { buildApiUrl } from '../utils/environment';

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { selectedConversation, messages, setMessages } = useConversation();
  const { socket } = useSocketContext();
  const { userInfo } = useGetUserInfo();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      // Send via HTTP to save to database
      const apiUrl = buildApiUrl('/message/send');
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          Id: selectedConversation, // Add receiver ID from selected conversation
        }),
        credentials: 'include',
      });

      const data = await response.json();

      if (data.message) {
        // Add message to local state immediately for the sender
        const newMessage = {
          sender: data.senderId,
          message: data.message,
        };
        
        setMessages([...messages, newMessage]);

        // Also emit via socket for real-time delivery
        if (socket) {
          socket.emit('sendMessage', {
            senderId: data.senderId,
            receiverId: selectedConversation,
            message: data.message,
          });
        }
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
