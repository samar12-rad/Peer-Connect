import './Conversations.css';
import Conversation from './Conversation';

const Conversations = () => {
  return (
    <div className="scroll-container flex h-full w-full flex-col overflow-y-scroll px-4 pb-3">
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
    </div>
  );
};

export default Conversations;
