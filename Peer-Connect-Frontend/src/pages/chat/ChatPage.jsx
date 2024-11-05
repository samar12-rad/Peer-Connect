import MessageContainer from '../../Components/chatComponents/MessageContainer';
import MessagesBar from '../../Components/chatComponents/MessageBarComponents/MessagesBar';

const ChatPage = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-start gap-4 pt-5">
      <h1 className="pb-5 text-center text-7xl font-bold">
        <span className="text-yellow-200">Great! </span>
        <span className="bg-gradient-to-b from-neutral-200 to-neutral-100 bg-clip-text text-transparent">
          Now chat with your peers Here
        </span>
        🥂
      </h1>
      <div className="shadow-3d-effect flex h-[80vh] w-[90vw] gap-3 overflow-clip rounded-2xl border border-white/5 shadow-white backdrop-blur-[7.4px]">
        <MessagesBar />
        <MessageContainer />
      </div>
    </div>
  );
};

export default ChatPage;
