import Frontend from '../../assets/skillsLogo/frontend.png';
import Backend from '../../assets/skillsLogo/backend.png';
import Fullstack from '../../assets/skillsLogo/fullstack.png';
import DSA from '../../assets/skillsLogo/dsa.png';
import Flutter from '../../assets/skillsLogo/flutter.png';
import Python from '../../assets/skillsLogo/python.png';
import AIML from '../../assets/skillsLogo/aiml.png';
import HTML from '../../assets/skillsLogo/html.png';
import CSS from '../../assets/skillsLogo/css.png';
import JS from '../../assets/skillsLogo/js.png';
import React from '../../assets/skillsLogo/react.png';
import Java from '../../assets/skillsLogo/java.png';
import Angular from '../../assets/skillsLogo/angular.png';
import Ruby from '../../assets/skillsLogo/ruby.png';
import Mongo from '../../assets/skillsLogo/mongo.png';
import SQL from '../../assets/skillsLogo/sql.png';
import PostgreSQL from '../../assets/skillsLogo/postgresql.png';
import SpringBoot from '../../assets/skillsLogo/springboot.png';
import Next from '../../assets/skillsLogo/next.png';
import Rust from '../../assets/skillsLogo/rust.png';
import Golang from '../../assets/skillsLogo/golang.png';
import GIT from '../../assets/skillsLogo/git.png';
import CPP from '../../assets/skillsLogo/cpp.png';
import Node from '../../assets/skillsLogo/node.png';
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
