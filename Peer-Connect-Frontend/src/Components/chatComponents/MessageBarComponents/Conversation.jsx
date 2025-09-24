import { CgProfile } from 'react-icons/cg';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import useConversation from '../../../zustand/useConversation';
import { buildApiUrl } from '../../../utils/environment';

const Conversation = ({ conversation }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation === conversation;
  const [peerData, setPeerData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchPeerData = async () => {
      // Don't fetch if conversation is null, undefined, or invalid
      if (!conversation || conversation === 'null' || conversation === 'undefined') {
        setError('Invalid conversation ID');
        return;
      }

      try {
        const response = await fetch(
          buildApiUrl(`/user/peerData/${conversation}`)
        );
        const data = await response.json();
        if (data.data) {
          setPeerData(data.data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        console.error('Error fetching peer data:', error);
        setError(error.message);
      }
    };

    fetchPeerData();
  }, [conversation]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex h-fit w-full py-3">
      <div
        className={`h-15 ${isSelected ? 'bg-green-400' : ''} flex w-full items-center justify-start gap-3 rounded-full border border-white px-4`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className="h-[60%] rounded-full border-4 border-blue-200">
          <CgProfile className="h-full w-full" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold">
            {peerData
              ? `${peerData.firstName} ${peerData.lastName}`
              : 'Loading...'}
          </span>
        </div>
      </div>
    </div>
  );
};

Conversation.propTypes = {
  conversation: PropTypes.string.isRequired, // conversation is actually a string (userId)
};

export default Conversation;
