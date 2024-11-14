import PropTypes from 'prop-types';
import { FaCheck, FaTimes } from 'react-icons/fa';

const CardButtons = ({ handleCardAccept, handleCardReject }) => {
  return (
    <div className="mt-4 flex w-full gap-4">
      <button
        className="group relative flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-green-400 to-green-600 px-6 py-2 text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]"
        onClick={handleCardAccept}
      >
        <FaCheck className="transition-transform duration-300 group-hover:rotate-12" />
        Connect
      </button>

      <button
        className="group relative flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-red-400 to-red-600 px-6 py-2 text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(239,68,68,0.5)]"
        onClick={handleCardReject}
      >
        <FaTimes className="transition-transform duration-300 group-hover:rotate-12" />
        Find Me Another Peer
      </button>
    </div>
  );
};

CardButtons.propTypes = {
  handleCardAccept: PropTypes.func.isRequired,
  handleCardReject: PropTypes.func.isRequired,
};

export default CardButtons;
