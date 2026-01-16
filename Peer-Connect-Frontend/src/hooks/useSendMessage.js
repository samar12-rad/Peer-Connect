import { useState } from 'react';
import useConversation from '../zustand/useConversation';
import { useSocketContext } from '../context/SocketContext';
import useGetUserInfo from './useGetUserInfo';
import { apiPost } from '../utils/api';

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { selectedConversation, messages, setMessages } = useConversation();
  const { socket } = useSocketContext();
  const { userInfo } = useGetUserInfo();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      // Send via HTTP to save to database
      const response = await apiPost('/message/send', {
        message,
        Id: selectedConversation, // Add receiver ID from selected conversation
      });

      const data = await response.json();

      if (data.message) {
        // Add message to local state immediately for the sender
        const newMessage = {
          sender: data.senderId,
          message: data.message,
        };

        setMessages([...messages, newMessage]);

        // Socket emission is now handled by the backend controller
        // if (socket) {
        //   socket.emit('sendMessage', {
        //     senderId: data.senderId, // Note: data.senderId might be undefined based on controller response structure
        //     receiverId: selectedConversation,
        //     message: data.message,
        //   });
        // }
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
