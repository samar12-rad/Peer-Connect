import { createContext, useEffect, useState, useContext } from 'react';
import { io } from 'socket.io-client'; // Add this import
import useGetUserInfo from '../hooks/useGetUserInfo';
import { getSocketUrl } from '../utils/environment';

export const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { userInfo } = useGetUserInfo();
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (userInfo?.data?._id) {
      // Initialize socket connection with environment-aware URL
      const socketUrl = getSocketUrl();
      console.log('🔌 Connecting to socket:', socketUrl);
      
      const newSocket = io(socketUrl, {
        withCredentials: true,
        query: {
          userId: userInfo.data._id,
        },
      });

      // Set socket in state
      setSocket(newSocket);

      // Listen for onlineUsers event
      newSocket.on('onlineUsers', (users) => {
        setOnlineUsers(users);
      });

      // Cleanup on unmount
      return () => {
        if (newSocket) {
          newSocket.disconnect();
        }
      };
    } else {
      // Clear socket if no user
      setSocket(null);
    }
  }, [userInfo?.data?._id]);

  const sendMessage = (messageData) => {
    if (socket) {
      socket.emit('sendMessage', messageData);
    }
  };

  return (
    <SocketContext.Provider value={{ socket, onlineUsers, sendMessage }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
