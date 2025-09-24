import { CgProfile } from 'react-icons/cg';
import { ImCross } from 'react-icons/im';
import { FaLocationArrow } from 'react-icons/fa';
import useConversation from '../../zustand/useConversation';
import { useEffect, useState, useRef } from 'react';
import useSendMessage from '../../hooks/useSendMessage';
import useGetMessages from '../../hooks/useGetMessages';
import LoadingScreen from '../unitComponents/LoadingScreen';
import useGetUserInfo from '../../hooks/useGetUserInfo';
import { apiGet } from '../../utils/api';

const MessageContainer = () => {
  const { selectedConversation } = useConversation();
  const { userInfo } = useGetUserInfo(); // Remove getUserInfo call from here since it's already called in the hook

  const [peerData, setPeerData] = useState(null);
  useEffect(() => {
    const fetchPeerData = async () => {
      // Don't fetch if no selectedConversation or if it's invalid
      if (!selectedConversation || selectedConversation === 'null' || selectedConversation === 'undefined') {
        setPeerData(null);
        return;
      }

      try {
        const response = await apiGet(`/user/peerData/${selectedConversation}`);
        const data = await response.json();
        if (data.data) {
          setPeerData(data.data);
        }
      } catch (error) {
        console.error('Error fetching peer data:', error);
      }
    };

    fetchPeerData();
  }, [selectedConversation]);

  const { loading: sendingLoading, sendMessage } = useSendMessage();
  const { messages, loading: messagesLoading } = useGetMessages();
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Safety check - ensure messages is always an array
  const safeMessages = Array.isArray(messages) ? messages : [];

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [safeMessages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage('');
  };

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex h-[10%] items-center justify-between border border-white">
        <div className="flex h-full w-full items-center justify-start gap-3 px-7">
          <div className="h-[45%] rounded-full">
            <CgProfile className="h-full w-full" />
          </div>
          <div className="text-2xl text-white">
            {peerData?.firstName || 'Select a chat'}
          </div>
        </div>
        <div className="flex h-full w-[10%] items-center justify-center">
          <ImCross className="h-5 w-5 text-white" />
        </div>
      </div>

      <div className="flex h-[90%] w-full flex-col justify-between">
        {messagesLoading ? (
          <LoadingScreen message="Loading messages..." size="h-16 w-16" />
        ) : selectedConversation ? (
          <>
            <div className="my-4 flex flex-col gap-4 overflow-y-auto p-4">
              {safeMessages.map((msg, index) => (
                <div
                  className={`chat ${msg.sender === userInfo.data._id ? 'chat-end' : 'chat-start'}`}
                  key={index}
                >
                  <div
                    className={`chat-bubble ${
                      msg.sender === userInfo.data._id
                        ? 'bg-secondary font-bold text-black'
                        : 'bg-primary font-bold text-white'
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="flex h-[10%] w-full items-center justify-between border border-white px-3">
              <form
                onSubmit={handleSubmit}
                className="flex h-full w-full items-center justify-between gap-3"
              >
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="input input-bordered input-primary h-[60%] w-full border-white bg-black"
                />
                <button type="submit" disabled={sendingLoading}>
                  {sendingLoading ? (
                    <div className="loading loading-spinner loading-sm"></div>
                  ) : (
                    <FaLocationArrow className="text-blue-400" />
                  )}
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center text-3xl text-white">
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageContainer;
