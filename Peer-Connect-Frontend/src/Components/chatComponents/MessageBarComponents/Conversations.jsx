import './Conversations.css';
import Conversation from './Conversation';
import useGetConversations from '../../../hooks/useGetConversations';

const Conversations = () => {
  const conversations = useGetConversations();
  console.log(conversations.data);
  // Handle loading state
  if (!conversations) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        Loading...
      </div>
    );
  }

  // Ensure conversations is an array
  const conversationsList = conversations.data || [];

  return (
    <div className="scroll-container flex h-full w-full flex-col overflow-y-scroll px-4 pb-3">
      {conversationsList.map((conversation) => (
        <Conversation key={conversation} conversation={conversation} />
      ))}
    </div>
  );
};

export default Conversations;
