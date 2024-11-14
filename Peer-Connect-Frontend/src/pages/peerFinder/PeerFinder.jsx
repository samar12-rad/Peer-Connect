import Header from './Header';
import SkillSelector from './SkillSelector';
import { useState } from 'react';
import UserCardWrapper from './UserCardWrapper';

const PeerFinder = () => {
  const [skillsArray, setSkillsArray] = useState([]);
  const [peerData, setPeerData] = useState(null);
  const skillNames = [
    'Frontend',
    'Backend',
    'Fullstack',
    'DSA',
    'Flutter',
    'Python',
    'AIML',
    'HTML',
    'CSS',
    'JS',
    'React',
    'Java',
    'Angular',
    'Ruby',
    'Mongo',
    'SQL',
    'PostgreSQL',
    'SpringBoot',
    'Next',
    'Rust',
    'Golang',
    'GIT',
    'CPP',
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
    console.log(skillsArray);
  };

  const fetchPeers = async (e) => {
    e.preventDefault();
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
      if (response.status === 401) {
        alert('Please login to continue');
        window.location.href = '/login';
      } else {
        setPeerData(data);
      }
    } catch (error) {
      console.error('Error fetching peers:', error);
    }
  };

  return (
    <div className="flex h-fit w-full flex-col items-center p-10">
      <Header />
      <SkillSelector
        skillNames={skillNames}
        onSkillSelect={selectSkill}
        onFindPeers={fetchPeers}
      />
      <UserCardWrapper peerData={peerData} />
    </div>
  );
};

export default PeerFinder;

{
  /* This is the code for the cards wrapper that will be displayed */
  /* <div className="flex h-[80vh] w-[89%] items-center justify-center rounded-2xl bg-slate-700 px-10"></div> */
}
