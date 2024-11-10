import Header from './Header';
import Skill from '../../Components/unitComponents/Skill';
import { useState } from 'react';

const PeerFinder = () => {
  const [skillsArray, setSkillsArray] = useState([]);
  console.log(skillsArray);
  const skillNames = [
    'frontend',
    'backend',
    'fullstack',
    'dsa',
    'flutter',
    'python',
    'aiml',
    'html',
    'css',
    'js',
    'react',
    'java',
    'angular',
    'ruby',
    'mongo',
    'sql',
    'postgresql',
    'springboot',
    'next',
    'rust',
    'golang',
    'git',
    'cpp',
  ];

  const selectSkill = (e) => {
    // Handle both button element and custom Skill component
    const skill = e.currentTarget || e.target;
    const skillName = skill.name || skill.getAttribute('name');

    const isSelected = skill.classList.contains('bg-green-500');

    if (!isSelected) {
      // Select skill
      skill.classList.remove('bg-transparent');
      skill.classList.add('bg-green-500');
      setSkillsArray((prev) => [...prev, { name: skillName }]);
    } else {
      // Deselect skill
      skill.classList.remove('bg-green-500');
      skill.classList.add('bg-transparent');
      setSkillsArray((prev) => prev.filter((s) => s.name !== skillName));
    }
  };

  const fetchPeers = async () => {
    try {
      const response = await fetch(
        'http://localhost:3000/api/v1/user/fetchUsers',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            skills: skillsArray.map((skill) => skill.name), // Extract skill names
          }),
          credentials: 'include', // Important for session cookie
        }
      );

      const data = await response.json();
      console.log('Fetched peers:', data);
    } catch (error) {
      console.error('Error fetching peers:', error);
    }
  };

  return (
    <div className="flex h-fit w-full flex-col items-center p-10">
      <Header />
      <div className="mt-[20vh] flex h-fit w-fit flex-col items-center justify-center px-10">
        <h1 className="tracking-normal">
          Just tell us the skills you&apos;re looking for in your partner and we
          will find them for you :)
        </h1>
        <div className="flex h-fit w-full flex-col items-center gap-10">
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            {skillNames.map((skillName) => (
              <Skill key={skillName} name={skillName} onClick={selectSkill} />
            ))}
          </div>
          <button
            onClick={fetchPeers}
            className="w-fit rounded-full bg-green-500 px-6 py-3 text-4xl font-bold tracking-tighter text-white"
          >
            Find Peers
          </button>
        </div>
      </div>
    </div>
  );
};

export default PeerFinder;

{
  /* This is the code for the cards wrapper that will be displayed */
  /* <div className="flex h-[80vh] w-[89%] items-center justify-center rounded-2xl bg-slate-700 px-10"></div> */
}
