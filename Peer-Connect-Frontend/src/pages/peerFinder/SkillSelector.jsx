// src/Components/finderComponents/SkillSelector.jsx
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Skill from '../../Components/unitComponents/Skill';

const SkillSelector = ({ skillNames, onSkillSelect, onFindPeers, loading = false, selectedSkillsCount = 0 }) => {
  return (
    <div className="mt-[5vh] flex h-fit w-fit flex-col items-center justify-center px-10">
      <div className="flex h-fit w-full flex-col items-center gap-10">
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          {skillNames.map((skillName) => (
            <Skill key={skillName} name={skillName} onClick={onSkillSelect} />
          ))}
        </div>
        
        <motion.button
          onClick={onFindPeers}
          disabled={loading || selectedSkillsCount === 0}
          className={`w-fit rounded-full px-6 py-3 text-4xl font-bold tracking-tighter text-white transition-all border-2 ${
            loading || selectedSkillsCount === 0
              ? 'bg-gray-500 cursor-not-allowed opacity-50 border-gray-400'
              : 'bg-green-500 hover:bg-green-600 border-green-600 hover:border-green-700'
          }`}
          whileHover={!loading && selectedSkillsCount > 0 ? { scale: 1.05 } : {}}
          whileTap={!loading && selectedSkillsCount > 0 ? { scale: 0.95 } : {}}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              Finding...
            </div>
          ) : (
            'Find Peers'
          )}
        </motion.button>
        
        {selectedSkillsCount === 0 && (
          <p className="text-sm text-gray-400 text-center max-w-md">
            Select at least one skill to start finding peers with diverse approaches!
          </p>
        )}
      </div>
    </div>
  );
};

SkillSelector.propTypes = {
  skillNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSkillSelect: PropTypes.func.isRequired,
  onFindPeers: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  selectedSkillsCount: PropTypes.number,
};

export default SkillSelector;
