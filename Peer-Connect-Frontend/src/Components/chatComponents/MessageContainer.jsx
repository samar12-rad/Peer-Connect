import { CgProfile } from 'react-icons/cg';
import { ImCross } from 'react-icons/im';
import { FaLocationArrow } from 'react-icons/fa';
import useConversation from '../../zustand/useConversation';
import { useState } from 'react';
import useSendMessage from '../../hooks/useSendMessage';
import useGetMessages from '../../hooks/useGetMessages';
import LoadingScreen from '../unitComponents/LoadingScreen';

const MessageContainer = () => {
  const { selectedConversation } = useConversation();
  const { loading: sendingLoading, sendMessage } = useSendMessage();
  const { messages, loading: messagesLoading } = useGetMessages();
  const [message, setMessage] = useState('');

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
          <div className="h-[45%] rounded-full bg-white">
            <CgProfile className="h-full w-full" />
          </div>
          <div className="text-2xl text-white">
            {selectedConversation?.name || 'Select a chat'}
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
              {messages?.map((msg, index) => (
                <div
                  key={index}
                  className={`chat ${msg.sender === selectedConversation._id ? 'chat-start' : 'chat-end'}`}
                >
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS chat bubble component"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      />
                    </div>
                  </div>
                  <div className="chat-bubble bg-black">{msg.message}</div>
                </div>
              ))}
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
