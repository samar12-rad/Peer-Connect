import { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client'; // Add this import
import useGetUserInfo from '../hooks/useGetUserInfo';

export const SocketContext = createContext();

const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { userInfo } = useGetUserInfo();
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    // Initialize socket connection
    const socket = io('https://peer-connect-production.up.railway.app', {
      withCredentials: true,
      query: {
        userId: userInfo?.data._id,
      },
    });

    // Set socket in state
    setSocket(socket);

    // Listen for onlineUsers event
    socket.on('onlineUsers', (users) => {
      setOnlineUsers(users);
    });

    // Cleanup on unmount
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
