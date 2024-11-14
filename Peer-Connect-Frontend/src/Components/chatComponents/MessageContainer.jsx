import { CgProfile } from 'react-icons/cg';
import { ImCross } from 'react-icons/im';
import { FaLocationArrow } from 'react-icons/fa';
import useConversation from '../../zustand/useConversation';
import { useState } from 'react';
import useSendMessage from '../../hooks/useSendMessage';

const MessageContainer = () => {
  const { selectedConversation } = useConversation();
  const { loading, sendMessage } = useSendMessage();
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
          <div className="text-2xl text-white">Name of Recipient</div>
        </div>
        <div className="flex h-full w-[10%] items-center justify-center">
          <ImCross className="h-5 w-5 text-white" />
        </div>
      </div>
      <div className="flex h-[90%] w-full flex-col justify-between">
        {selectedConversation ? (
          <>
            <div className="my-4 flex flex-col p-4">
              <div className="chat chat-start">
                {/* Chat content remains the same */}
              </div>
              <div className="chat chat-end">
                {/* Chat content remains the same */}
              </div>
            </div>
            <div className="flex h-[10%] w-full items-center justify-between border border-white px-3">
              <form
                onSubmit={handleSubmit}
                className="flex h-full w-full items-center justify-between gap-3"
              >
                <button type="submit">
                  {loading ? (
                    <div className="loading loading-spinner"></div>
                  ) : (
                    <FaLocationArrow className="absolute right-6 text-blue-400" />
                  )}
                </button>
                <input
                  type="text"
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type here"
                  className="input input-bordered input-primary h-[60%] w-full border-white bg-black"
                />
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
