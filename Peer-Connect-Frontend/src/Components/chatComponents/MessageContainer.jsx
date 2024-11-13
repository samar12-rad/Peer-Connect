import { CgProfile } from 'react-icons/cg';
import { ImCross } from 'react-icons/im';
import { FaLocationArrow } from 'react-icons/fa';

const MessageContainer = () => {
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
        <div className="my-4 flex flex-col p-4">
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <div className="chat-header">
              Obi-Wan Kenobi
              <time className="text-xs opacity-50">12:45</time>
            </div>
            <div className="chat-bubble bg-slate-600 text-white">
              You were the Chosen One!
            </div>
            <div className="chat-footer opacity-50">Delivered</div>
          </div>
          <div className="chat chat-end">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <div className="chat-header">
              Anakin
              <time className="text-xs opacity-50">12:46</time>
            </div>
            <div className="chat-bubble bg-slate-600 text-white">
              I hate you!
            </div>
            <div className="chat-footer opacity-50">Seen at 12:46</div>
          </div>
        </div>
        <div className="flex h-[10%] w-full items-center justify-between border border-white px-3">
          <FaLocationArrow className="absolute right-6 text-blue-400" />
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered input-primary h-[60%] w-full border-white"
          />
        </div>
      </div>
    </div>
  );
};

export default MessageContainer;
