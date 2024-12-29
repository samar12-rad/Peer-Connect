import Conversations from './Conversations';
import SearchInput from './SearchInput';

const MessagesBar = () => {
  return (
    <div className="flex h-full min-w-[25vw] flex-col gap-3 pb-3">
      <SearchInput />
      <Conversations />
    </div>
  );
};

export default MessagesBar;
