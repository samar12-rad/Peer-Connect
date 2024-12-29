// src/Components/finderComponents/SkillSelector.jsx
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Skill from '../../Components/unitComponents/Skill';

const SkillSelector = ({ skillNames, onSkillSelect, onFindPeers }) => {
  return (
    <div className="mt-[20vh] flex h-fit w-fit flex-col items-center justify-center px-10">
      <h1 className="tracking-normal">
        Just tell us the skills you&apos;re looking for in your partner and we
        will find them for you :)
      </h1>
      <div className="flex h-fit w-full flex-col items-center gap-10">
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          {skillNames.map((skillName) => (
            <Skill key={skillName} name={skillName} onClick={onSkillSelect} />
          ))}
        </div>
        <motion.button
          onClick={onFindPeers}
          className="w-fit rounded-full bg-green-500 px-6 py-3 text-4xl font-bold tracking-tighter text-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Find Peers
        </motion.button>
      </div>
    </div>
  );
};

SkillSelector.propTypes = {
  skillNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSkillSelect: PropTypes.func.isRequired,
  onFindPeers: PropTypes.func.isRequired,
};

export default SkillSelector;
