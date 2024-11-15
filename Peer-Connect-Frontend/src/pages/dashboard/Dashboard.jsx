import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import profile from '../../assets/dashboardLogo/profile.png';
import msg from '../../assets/dashboardLogo/msg.png';
import finder from '../../assets/dashboardLogo/finder.png';
import profileHover from '../../assets/dashboardLogo/profile_copy.png';
import msgHover from '../../assets/dashboardLogo/chat.png';
import find from '../../assets/dashboardLogo/find.png';
import LoadingScreen from '../../Components/unitComponents/LoadingScreen';

export const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/user/data', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          navigate('/login');
        }
        const data = await response.json();
        setUserData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <LoadingScreen message="Loading Dashboard..." />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex h-fit w-full flex-col items-center justify-start gap-2 overflow-hidden">
      <div className="HEADER flex w-fit flex-col items-center justify-center pt-20">
        <div className="flex flex-col items-center gap-2">
          <h1 className="items-center justify-center text-6xl">Hey!</h1>
          <h2 className="items-center justify-center whitespace-nowrap text-6xl font-bold">
            {error ? error : userData?.data.firstName}
          </h2>
        </div>
        <p className="items-center justify-center whitespace-nowrap pt-4 text-2xl font-bold text-green-500">
          Swipe. Connect. Code. – Find your perfect coding partner and build
          together!
        </p>
      </div>
      <div className="CARDS flex h-fit w-full flex-col items-center justify-evenly pt-20">
        <div className="CARD-WRAPPER gap-15 flex w-full flex-wrap justify-center">
          <div
            className="hover:h-100 hover:w-100 flex h-80 w-80 flex-col items-center justify-center rounded-lg bg-gray-800 bg-slate-200 p-4 text-black transition-all duration-1000"
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => setHoveredCard('finder')}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => navigate('/find')}
          >
            {hoveredCard === 'finder' ? (
              <img
                src={find}
                className="h-50 mb-5 rounded-lg transition-all duration-1000"
              />
            ) : (
              <img
                src={finder}
                alt="peer finder"
                className="duration-2 h-11 w-11 transition-all"
              />
            )}
            <h3
              className={`font-bold ${hoveredCard === 'finder' ? 'text-4xl' : 'text-2xl'} transition-all duration-1000`}
            >
              Peer Finder
            </h3>
            <p className="text-center text-sm transition-all duration-1000">
              Discover coders with similar interests.
            </p>
          </div>

          <div
            className="hover:h-100 hover:w-100 flex h-80 w-80 flex-col items-center justify-center rounded-lg bg-gray-800 bg-slate-200 p-4 text-black transition-all duration-1000"
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => setHoveredCard('message')}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => navigate('/chat')}
          >
            {hoveredCard === 'message' ? (
              <img
                src={msgHover}
                className="h-50 mb-5 rounded-lg transition-all duration-1000"
              />
            ) : (
              <img
                src={msg}
                alt="message"
                className="duration-2 h-11 w-11 transition-all"
              />
            )}
            <h3
              className={`font-bold ${hoveredCard === 'message' ? 'text-4xl' : 'text-2xl'} transition-all duration-1000`}
            >
              Messages
            </h3>
            <p className="text-center text-sm transition-all duration-1000">
              Chat with your coding partners.
            </p>
          </div>

          <div
            className="hover:h-100 hover:w-100 flex h-80 w-80 flex-col items-center justify-center rounded-lg bg-gray-800 bg-slate-200 p-4 text-black transition-all duration-1000"
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => setHoveredCard('profile')}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => navigate('/profile')}
          >
            {hoveredCard === 'profile' ? (
              <img
                src={profileHover}
                className="h-50 mb-5 rounded-lg transition-all duration-1000"
              />
            ) : (
              <img
                src={profile}
                alt="profile"
                className="duration-2 h-11 w-11 transition-all"
              />
            )}
            <h3
              className={`font-bold ${hoveredCard === 'profile' ? 'text-4xl' : 'text-2xl'} transition-all duration-1000`}
            >
              Profile
            </h3>
            <p className="text-center text-sm transition-all duration-1000">
              View and edit your profile.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
