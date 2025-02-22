import { useState, useRef } from 'react';
import Header from './Header';
import SkillSelector from './SkillSelector';
import UserCardWrapper from './UserCardWrapper';
import axios from 'axios';

const PeerFinder = () => {
  const [skillsArray, setSkillsArray] = useState([]);
  const [peerData, setPeerData] = useState(null);
  const userCardWrapperRef = useRef(null); // Create a ref for UserCardWrapper

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
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/api/v1/user/fetchUsers`,
        {
          skills: skillsArray.map((skill) => skill.name), // Extract skill names
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // Important for session cookie
        }
      );

      const data = response.data;
      if (response.status === 401) {
        alert('Please login to continue');
        window.location.href = '/login';
      } else {
        setPeerData(data);
        userCardWrapperRef.current.scrollIntoView({ behavior: 'smooth' }); // Scroll to UserCardWrapper
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
      <div className="w-full" ref={userCardWrapperRef}>
        <UserCardWrapper peerData={peerData} />
      </div>
    </div>
  );
};

export default PeerFinder;
