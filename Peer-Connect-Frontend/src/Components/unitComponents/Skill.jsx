import Backend from '../../assets/skillsLogo/Backend.png';
import Fullstack from '../../assets/skillsLogo/Fullstack.png';
import DSA from '../../assets/skillsLogo/DSA.png';
import Flutter from '../../assets/skillsLogo/Flutter.png';
import Python from '../../assets/skillsLogo/Python.png';
import AIML from '../../assets/skillsLogo/AIML.png';
import Frontend from '../../assets/skillsLogo/Frontend.png';
import HTML from '../../assets/skillsLogo/HTML.png';
import CSS from '../../assets/skillsLogo/CSS.png';
import JS from '../../assets/skillsLogo/JS.png';
import React from '../../assets/skillsLogo/React.png';
import Java from '../../assets/skillsLogo/Java.png';
import Angular from '../../assets/skillsLogo/Angular.png';
import Ruby from '../../assets/skillsLogo/Ruby.png';
import Mongo from '../../assets/skillsLogo/Mongo.png';
import SQL from '../../assets/skillsLogo/SQL.png';
import PostgreSQL from '../../assets/skillsLogo/PostgreSQL.png';
import SpringBoot from '../../assets/skillsLogo/SpringBoot.png';
import Next from '../../assets/skillsLogo/Next.png';
import Rust from '../../assets/skillsLogo/Rust.png';
import Golang from '../../assets/skillsLogo/Golang.png';
import GIT from '../../assets/skillsLogo/GIT.png';
import CPP from '../../assets/skillsLogo/CPP.png';
import Node from '../../assets/skillsLogo/Node.png';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const skillImages = {
  Frontend,
  Backend,
  Fullstack,
  DSA,
  Flutter,
  Python,
  AIML,
  HTML,
  CSS,
  JS,
  React,
  Java,
  Node,
  Angular,
  Ruby,
  Mongo,
  SQL,
  PostgreSQL,
  Next,
  SpringBoot,
  Rust,
  Golang,
  GIT,
  CPP,
};

const Skill = ({ name, onClick, className }) => {
  return (
    <div>
      <motion.button
        id={name}
        name={name}
        onClick={onClick}
        className={`min-w-35 flex flex-wrap items-center justify-center gap-2 rounded-lg border border-gray-300 p-2 text-lg placeholder-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${className}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <img src={skillImages[name]} alt={name} className="h-9 w-9" />
        {name}
      </motion.button>
    </div>
  );
};

Skill.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

Skill.defaultProps = {
  onClick: () => {},
};

export default Skill;
