import { CgProfile } from 'react-icons/cg';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import PropTypes from 'prop-types';
import girl from '../../assets/card/girl.jpg';
import boy from '../../assets/card/boy.jpg';

const Card = ({
  firstName,
  lastName,
  city,
  github,
  linkedin,
  email,
  gender,
  skills,
  theme = 1, // Add theme prop with default
}) => {
  // Remove idLevel state and use theme prop directly
  const getBackgroundColor = (level) => {
    switch (level) {
      case 1: // Beginner
        return 'linear-gradient(to top, #FFFFFF, #90EE90)'; // White to light green
      case 2: // Intermediate
        return 'linear-gradient(to top, #FFFFFF, #4169E1)'; // White to blue
      case 3: // Expert
        return 'linear-gradient(to top, #FFFFFF, #FFD700)'; // White to gold
      default:
        return 'linear-gradient(to top, #FFFFFF, #f5f5f5)'; // White to light gray
    }
  };

  return (
    <div
      className="w-94 shadow-6 min-h-[60vh] overflow-hidden rounded-xl border border-white/5 pb-4 text-black shadow-white backdrop-blur-[7.4px]"
      style={{
        background: getBackgroundColor(theme), // Changed from backgroundColor to background
      }}
    >
      <div className="absolute left-[10%] top-[150px] h-24 w-24 translate-y-[-50%] rounded-full border-4 border-blue-200 bg-white">
        <CgProfile className="profile-logo h-full w-full" />
      </div>
      <div
        className={`h-[150px] w-full`}
        style={{
          backgroundImage: `url(${gender === 'female' ? girl : boy})`, // Fix: Use template literal with url()
          backgroundSize: 'cover',
          backgroundPosition: 'bottom',
        }}
      ></div>
      <div className="h-fit w-full">
        <div className="mt-15 flex flex-col justify-center p-2 px-[10%]">
          <h1 className="text-3xl font-bold">
            {firstName} {lastName}
          </h1>
          <p className="text-lg italic">{email}</p>

          {city ? (
            <h2 className="text-xl">
              📍<span className="">{city}</span>
            </h2>
          ) : null}

          <div className="mt-3 flex gap-2">
            {github ? (
              <a>
                <FaGithub className="h-6 w-6" />
              </a>
            ) : null}
            {linkedin ? (
              <a>
                <FaLinkedin className="h-6 w-6" />
              </a>
            ) : null}{' '}
          </div>
          <div className="mt-3 flex h-fit w-full flex-wrap gap-2">
            {skills.map((skill, index) => (
              <div
                className="h-fit w-fit rounded bg-black px-4 py-1 text-white"
                key={index} // Use index since skill is now an array
              >
                {skill[0]} {/* Access first element of nested array */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  github: PropTypes.string,
  linkedin: PropTypes.string,
  email: PropTypes.string,
  gender: PropTypes.oneOf(['male', 'female']).isRequired,
  skills: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.string) // Update to expect nested arrays
  ),
  bio: PropTypes.string,
  onClick: PropTypes.func,
  theme: PropTypes.number,
};

Card.defaultProps = {
  github: '',
  linkedin: '',
  email: '',
  skills: [], // Keep empty array default
  bio: '',
  onClick: () => {}, // Add default empty function
};

export default Card;

// Card use Example Snippet
//  <Card
//    firstName="John"
//    lastName="Doe"
//    city="New York"
//    github="https://github.com/johndoe"
//    linkedin="https://linkedin.com/in/johndoe"
//    email="john@example.com"
//    gender="male"
//    skills={[{ name: 'React' }, { name: 'JavaScript' }]}
//    bio="Full stack developer passionate about web technologies"
//    theme={theme}
//  />;

/* styles.css */
/* Adjust the height a*/
