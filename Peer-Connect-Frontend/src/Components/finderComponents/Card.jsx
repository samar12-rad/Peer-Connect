import { useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { FaGithub } from 'react-icons/fa';

import { FaLinkedin } from 'react-icons/fa';

const Card = () => {
  const skillsArray = [
    { name: 'React' },
    { name: 'NodeJS' },
    { name: 'Express' },
    { name: 'MongoDB' },
    { name: 'Python' },
  ];

  const [idLevel, setIdLevel] = useState(0);
  if (idLevel === 0) {
    setIdLevel(3);
  }
  console.log(idLevel);
  const getBackgroundColor = (level) => {
    switch (level) {
      case 1:
        return 'lightblue';
      case 2:
        return 'lightgreen';
      case 3:
        return 'lightcoral';
      default:
        return 'white';
    }
  };

  return (
    <div className="h-fit w-screen p-5">
      <div className="h-full w-full rounded-lg bg-black">
        <div className="pt-18 relative h-screen w-[70vw] p-3">
          <div
            className="w-94 shadow-6 fixed col-span-4 row-span-3 h-[60vh] overflow-hidden rounded-xl border border-white/5 shadow-white backdrop-blur-[7.4px]"
            style={{
              backgroundColor: getBackgroundColor(idLevel),
            }}
          >
            <div className="h-30 w-30 absolute left-[10%] top-[30%] translate-y-[-50%] rounded-full border-4 border-blue-200 bg-white">
              <CgProfile className="h-full w-full" />
            </div>
            <div className="h-[30%] w-full bg-pink-600"></div>
            <div className="h-[70%] w-full">
              <div className="mt-15 flex flex-col justify-center p-2 pl-[10%]">
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
      </div>
    </div>
  );
};

export default Card;
