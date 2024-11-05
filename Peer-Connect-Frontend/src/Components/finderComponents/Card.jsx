import { useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { FaGithub } from 'react-icons/fa';
import girl from '../../assets/card/girl.jpg';
import boy from '../../assets/card/boy.jpg';
import { FaLinkedin } from 'react-icons/fa';

const Card = () => {
  const skillsArray = [
    { name: 'React' },
    { name: 'NodeJS' },
    { name: 'Express' },
    { name: 'MongoDB' },
    { name: 'Python' },
    { name: 'Django' },
    { name: 'Java' },
    { name: 'C++' },
    { name: 'C#' },
    { name: 'HTML' },
    { name: 'CSS' },
    { name: 'JavaScript' },
    { name: 'TypeScript' },
    { name: 'SQL' },
    { name: 'NoSQL' },
    { name: 'GraphQL' },
    { name: 'REST' },
    { name: 'API' },
    { name: 'Git' },
    { name: 'GitHub' },
    { name: 'Heroku' },
    { name: 'Netlify' },
    { name: 'AWS' },
    { name: 'Azure' },
    { name: 'GCP' },
  ];

  const [idLevel, setIdLevel] = useState(0);
  const [gender] = useState('female'); // or 'male'
  console.log(gender);
  if (idLevel === 0) {
    setIdLevel(3);
  }
  console.log(idLevel);
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
    <div className="h-fit w-fit rounded-lg">
      <div
        className="w-94 shadow-6 min-h-[60vh] overflow-hidden rounded-xl border border-white/5 pb-4 shadow-white backdrop-blur-[7.4px]"
        style={{
          background: getBackgroundColor(idLevel), // Changed from backgroundColor to background
        }}
      >
        <div className="h-30 w-30 absolute left-[10%] top-[150px] translate-y-[-50%] rounded-full border-4 border-blue-200 bg-white">
          <CgProfile className="h-full w-full" />
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
            <h1 className="text-3xl font-bold">firstName lastName</h1>
            <p className="text-lg italic">email@email.com</p>

            <h2 className="text-xl">
              📍<span className="">city</span>
            </h2>

            <div className="mt-3 flex gap-2">
              <a>
                <FaGithub className="h-6 w-6" />
              </a>

              <a>
                <FaLinkedin className="h-6 w-6" />
              </a>
            </div>
            <div className="mt-3 flex h-fit w-full flex-wrap gap-3">
              {skillsArray.map((skill) => (
                <div
                  className="h-fit w-fit rounded bg-black px-2 text-white"
                  key={skill.name}
                >
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
