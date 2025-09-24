import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import peer from '../../assets/Peerlist.png';

const Nav = () => {
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate('/signup'); // Replace '/about' with the path you want to redirect to
  };

  const handleAboutClick = () => {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
  };

  const handleFaqsClick = () => {
    document.getElementById('faqs').scrollIntoView({ behavior: 'smooth' }); // Your logic for Faqs button click
  };

  return (
    <div className="px-25 z-999999 fixed flex h-fit min-h-[50px] w-full items-center justify-between gap-5 py-5 text-lg font-bold text-[#17A746] backdrop-blur-md bg-black/20 border-b border-gray-800/30">
      <div className="flex items-center">
        <img src={peer} className="h-10" alt="Peer Connect Logo" />
        <p className="text-3xl">Peer Connect</p>
      </div>
      <div className="flex items-center gap-10">
        <p className="text-2xl">
          <button onClick={handleAboutClick}>About</button>
        </p>
        <p className="text-2xl">
          <button onClick={handleFaqsClick}>Faqs</button>
        </p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={handleRedirect}
            className="hover:text-black-2 rounded-3xl bg-green-600 from-white to-green-300 px-5 py-1 text-2xl font-bold text-white duration-300 hover:bg-gradient-to-r"
          >
            SignUp
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Nav;
