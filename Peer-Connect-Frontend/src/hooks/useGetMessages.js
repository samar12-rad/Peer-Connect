import { useState, useEffect } from 'react';
import useConversation from '../zustand/useConversation';
import { useSocketContext } from '../context/SocketContext';
import { buildApiUrl } from '../utils/environment';

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { selectedConversation, messages, setMessages } = useConversation();
  const { socket } = useSocketContext();

  useEffect(() => {
    // Only run if there's a selected conversation
    if (!selectedConversation) {
      setMessages([]); // Clear messages when no conversation is selected
      return;
    }

    const getMessages = async () => {
      setLoading(true);
      try {
        const apiUrl = buildApiUrl('/message/getMessages');
        
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ Id: selectedConversation }),
          credentials: 'include',
        });
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        // Ensure we always set an array - data might be an object with messages property
        const messagesArray = Array.isArray(data) ? data : (Array.isArray(data.messages) ? data.messages : []);
        setMessages(messagesArray);
      } catch (error) {
        console.error('Error fetching messages:', error);
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, [selectedConversation, setMessages]);

  // Listen for real-time messages
  useEffect(() => {
    if (!socket || !selectedConversation) return;

    const handleNewMessage = (messageData) => {
      try {
        const { senderId, message, receiverId } = messageData;
        
        // Only add message if it's relevant to current conversation
        if (senderId === selectedConversation || receiverId === selectedConversation) {
          setMessages((prevMessages) => {
            // Ensure prevMessages is always an array
            const currentMessages = Array.isArray(prevMessages) ? prevMessages : [];
            
            // Prevent duplicate messages
            const messageExists = currentMessages.some(
              (msg) => msg.sender === senderId && 
                      msg.message === message && 
                      Math.abs(Date.now() - new Date(msg.createdAt || Date.now()).getTime()) < 1000
            );
            
            if (messageExists) return currentMessages;
            
            return [
              ...currentMessages,
              {
                sender: senderId,
                message: message,
                createdAt: new Date(),
              },
            ];
          });
        }
      } catch (error) {
        console.error('Error handling new message:', error);
      }
    };

    socket.on('newMessage', handleNewMessage);

    // Cleanup listener on unmount
    return () => {
      socket.off('newMessage', handleNewMessage);
    };
  }, [socket, setMessages, selectedConversation]);

  // Debug logging - only log if messages is actually problematic (not null/undefined)
  if (messages !== null && messages !== undefined && !Array.isArray(messages)) {
    console.error('useGetMessages: Messages is not an array:', {
      messages,
      type: typeof messages,
      isFunction: typeof messages === 'function',
      selectedConversation
    });
  }

  return { messages: Array.isArray(messages) ? messages : [], loading };
};

export default useGetMessages;
