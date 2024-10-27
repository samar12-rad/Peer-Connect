import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaHome,
  FaInfoCircle,
  FaServicestack,
  FaPhone,
  FaSignOutAlt,
  FaComments,
} from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const sidebarVariants = {
    open: { width: '320px', transition: { duration: 0.3 } },
    closed: { width: '80px', transition: { duration: 0.3 } },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="flex h-screen bg-[#1d1c21] text-[#B8B8B8]"
      initial="closed"
      animate={isOpen ? 'open' : 'closed'}
      variants={sidebarVariants}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="fixed flex h-screen flex-col justify-between py-4 pl-[25px]">
        <div className="logo flex items-center py-4">
          {isOpen ? (
            <motion.h2
              className="text-4xl font-bold text-[#B8B8B8]"
              initial="hidden"
              animate="visible"
              variants={textVariants}
            >
              PeerConnect
            </motion.h2>
          ) : (
            <FaComments size={40} className="-translate-x-2 text-[#B8B8B8]" />
          )}
        </div>

        <nav className="flex flex-col gap-4">
          <a
            href="/dashboard"
            className="flex w-full items-center gap-4 py-2 hover:bg-gray-700"
          >
            <FaHome size={24} className="text-[#B8B8B8]" />
            {isOpen && (
              <motion.span
                className="text-[#B8B8B8]"
                initial="hidden"
                animate="visible"
                variants={textVariants}
              >
                Dashboard
              </motion.span>
            )}
          </a>
          <a
            href="/grid"
            className="flex w-full items-center gap-4 py-2 hover:bg-gray-700"
          >
            <FaInfoCircle size={24} className="text-[#B8B8B8]" />
            {isOpen && (
              <motion.span
                className="text-[#B8B8B8]"
                initial="hidden"
                animate="visible"
                variants={textVariants}
              >
                About
              </motion.span>
            )}
          </a>
          <a
            href="#"
            className="flex w-full items-center gap-4 py-2 hover:bg-gray-700"
          >
            <FaServicestack size={24} className="text-[#B8B8B8]" />
            {isOpen && (
              <motion.span
                className="text-[#B8B8B8]"
                initial="hidden"
                animate="visible"
                variants={textVariants}
              >
                Services
              </motion.span>
            )}
          </a>
          <a
            href="#"
            className="flex w-full items-center gap-4 py-2 hover:bg-gray-700"
          >
            <FaPhone size={24} className="text-[#B8B8B8]" />
            {isOpen && (
              <motion.span
                className="text-[#B8B8B8]"
                initial="hidden"
                animate="visible"
                variants={textVariants}
              >
                Contact
              </motion.span>
            )}
          </a>
        </nav>
        <div className="py-4">
          <div className="flex items-center gap-4">
            <FaSignOutAlt size={24} className="text-[#B8B8B8]" />
            {isOpen && (
              <motion.span
                className="text-[#B8B8B8]"
                initial="hidden"
                animate="visible"
                variants={textVariants}
              >
                Log Out
              </motion.span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
