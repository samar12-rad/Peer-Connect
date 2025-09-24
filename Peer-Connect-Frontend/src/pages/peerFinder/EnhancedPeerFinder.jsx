import Header from './Header';
import SkillSelector from './SkillSelector';
import { useState, useEffect, useRef } from 'react';
import EnhancedUserCardWrapper from './EnhancedUserCardWrapper';
import { buildApiUrl } from '../../utils/environment';
import { toast } from 'react-toastify';

const EnhancedPeerFinder = () => {
  const [skillsArray, setSkillsArray] = useState([]);
  const [peerData, setPeerData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const cardsRef = useRef(null);
  
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
  };

  const fetchPeers = async (e, setNumber = 1) => {
    e?.preventDefault();
    
    if (skillsArray.length === 0) {
      toast.error('Please select at least one skill to find peers!');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        buildApiUrl('/user/fetchUsersEnhanced'),
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            skills: skillsArray.map((skill) => skill.name),
            setNumber: setNumber,
          }),
          credentials: 'include',
        }
      );

      const data = await response.json();
      
      if (response.status === 401) {
        toast.error('Please login to continue');
        window.location.href = '/login';
        return;
      }
      
      if (response.ok) {
        setPeerData(data);
        if (data.filteredUsers.length === 0) {
          setError('No peers found with the selected skills. Try different skills or check back later!');
        } else {
          toast.success(`Found ${data.totalMatches} peers! Showing set ${data.setNumber} of ${data.totalSets}`);
          // Scroll to cards section after successful peer finding
          setTimeout(() => {
            if (cardsRef.current) {
              cardsRef.current.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
              });
            }
          }, 100); // Small delay to ensure DOM is updated
        }
      } else {
        throw new Error(data.error || 'Failed to fetch peers');
      }
    } catch (error) {
      console.error('Error fetching peers:', error);
      const errorMessage = 'Failed to fetch peers. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleNewSetLoad = (newSetData) => {
    setPeerData(newSetData);
  };

  const resetSearch = () => {
    setPeerData(null);
    setError(null);
    setSkillsArray([]);
    
    // Reset all skill buttons
    const skillButtons = document.querySelectorAll('[name]');
    skillButtons.forEach(button => {
      button.classList.remove('bg-green-500');
      button.classList.add('bg-transparent');
    });
  };



  return (
    <div className="flex h-fit w-full flex-col items-center p-10 pt-24 relative">
      <Header showSlideshow={!peerData && !loading} />
      
      {/* Enhanced Stats Display */}
      {peerData && (
        <div className="absolute translate-y-54 mb-6 p-4 bg-gradient-to-r from-blue-900 to-green-900 rounded-lg text-white text-center" >
          <div className="flex justify-center gap-6 text-sm">
            <span>🎯 Total Matches: {peerData.totalMatches}</span>
            <span>📦 Current Set: {peerData.setNumber} of {peerData.totalSets}</span>
            <span>🔍 Selected Skills: {skillsArray.length}</span>
          </div>
          {peerData.metadata?.hasMoreSets && (
            <div className="mt-2 text-xs opacity-80">
              💡 More sets available! Use navigation to explore different peer recommendations.
            </div>
          )}
        </div>
      )}

      <SkillSelector
        skillNames={skillNames}
        onSkillSelect={selectSkill}
        onFindPeers={fetchPeers}
        loading={loading}
        selectedSkillsCount={skillsArray.length}
      />

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-900 text-white rounded-lg text-center max-w-md">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="mb-6 p-4 bg-blue-900 text-white rounded-lg text-center">
          🔍 Finding diverse peers for you...
        </div>
      )}



      <div ref={cardsRef} className='w-full'>
        <EnhancedUserCardWrapper 
          peerData={peerData} 
          selectedSkills={skillsArray.map(skill => skill.name)}
          onLoadNewSet={handleNewSetLoad}
        />
      </div>
    </div>
  );
};

export default EnhancedPeerFinder;