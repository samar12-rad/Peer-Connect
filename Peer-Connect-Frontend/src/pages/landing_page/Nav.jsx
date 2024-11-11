import { motion } from 'framer-motion';

const Nav = () => {
  return (
    <div className="bg-black-2 px-25 flex h-fit min-h-[50px] w-full items-center justify-between gap-5 py-5 text-lg font-bold text-green-400">
      <div>
        <p className="text-3xl">Peer Connect</p>
      </div>
      <div className="flex items-center gap-10">
        <p className="">ABOUT</p>
        <p>FAQs</p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button className="hover:text-black-2 rounded-3xl bg-green-400 from-white to-green-300 px-5 py-1 font-bold text-white duration-300 hover:bg-gradient-to-r">
            SIGN UP
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Nav;
