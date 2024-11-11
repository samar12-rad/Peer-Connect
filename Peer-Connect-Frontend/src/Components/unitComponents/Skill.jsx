import frontend from '../../assets/skillsLogo/frontend.png';
import backend from '../../assets/skillsLogo/backend.png';
import fullstack from '../../assets/skillsLogo/fullstack.png';
import dsa from '../../assets/skillsLogo/dsa.png';
import flutter from '../../assets/skillsLogo/flutter.png';
import python from '../../assets/skillsLogo/python.png';
import aiml from '../../assets/skillsLogo/aiml.png';
import html from '../../assets/skillsLogo/html.png';
import css from '../../assets/skillsLogo/css.png';
import js from '../../assets/skillsLogo/js.png';
import react from '../../assets/skillsLogo/react.png';
import java from '../../assets/skillsLogo/java.png';
import angular from '../../assets/skillsLogo/angular.png';
import ruby from '../../assets/skillsLogo/ruby.png';
import mongo from '../../assets/skillsLogo/mongo.png';
import sql from '../../assets/skillsLogo/sql.png';
import postgresql from '../../assets/skillsLogo/postgresql.png';
import springboot from '../../assets/skillsLogo/springboot.png';
import next from '../../assets/skillsLogo/next.png';
import rust from '../../assets/skillsLogo/rust.png';
import golang from '../../assets/skillsLogo/golang.png';
import git from '../../assets/skillsLogo/git.png';
import cpp from '../../assets/skillsLogo/cpp.png';
import node from '../../assets/skillsLogo/node.png';
import PropTypes from 'prop-types';

const skillImages = {
  frontend,
  backend,
  fullstack,
  dsa,
  flutter,
  python,
  aiml,
  html,
  css,
  js,
  react,
  java,
  node,
  angular,
  ruby,
  mongo,
  sql,
  postgresql,
  next,
  springboot,
  rust,
  golang,
  git,
  cpp,
};

const Skill = ({ name, onClick }) => {
  return (
    <div>
      <button
        id={name}
        name={name}
        onClick={onClick}
        className="min-w-35 flex flex-wrap items-center justify-center gap-2 rounded border border-gray-300 bg-transparent p-2 text-lg text-gray-700 placeholder-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <img src={skillImages[name]} alt={name} className="h-9 w-9" />
        {name}
      </button>
    </div>
  );
};

Skill.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

Skill.defaultProps = {
  onClick: () => {},
};

export default Skill;
