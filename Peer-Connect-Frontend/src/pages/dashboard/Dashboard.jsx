import { useState } from 'react';
import profile from '../../assets/dashboardLogo/profile.png';
import msg from '../../assets/dashboardLogo/msg.png';
import finder from '../../assets/dashboardLogo/finder.png';
import profileHover from '../../assets/dashboardLogo/profile_copy.png';
import msgHover from '../../assets/dashboardLogo/chat.png';
import find from '../../assets/dashboardLogo/find.png';

export const Dashboard = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="flex h-fit w-full flex-col items-center justify-start gap-2">
      <div className="HEADER flex w-fit flex-col items-center justify-center pt-20">
        <h1 className="items-center justify-center text-6xl">Hey!,</h1>
        <h2 className="items-center justify-center whitespace-nowrap text-6xl font-bold">
          Ishika Verma
        </h2>
        <p className="items-center justify-center whitespace-nowrap pt-4 text-2xl font-bold">
          Swipe, Connect, Code – Find your perfect coding partner and build
          together!
        </p>
      </div>
      <div className="CARDS flex h-fit w-full flex-col items-center justify-evenly pt-20">
        <div className="CARD-WRAPPER gap-15 flex w-full flex-wrap justify-center">
          <div
            className="hover:h-100 hover:w-100 flex h-80 w-80 flex-col items-center justify-center rounded-lg bg-gray-800 bg-slate-200 p-4 text-black transition-all duration-1000"
            onMouseEnter={() => setHoveredCard('finder')}
            onMouseLeave={() => setHoveredCard(null)}
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
            onMouseEnter={() => setHoveredCard('msg')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {hoveredCard === 'msg' ? (
              <img
                src={msgHover}
                className="h-50 mb-5 rounded transition-all duration-1000"
              />
            ) : (
              <img
                src={msg}
                alt="message"
                className="duration-2 h-11 w-11 transition-all"
              />
            )}
            <h3
              className={`text-2xl font-bold ${hoveredCard === 'msg' ? 'text-4xl' : 'text-2xl'} transition-all duration-1000`}
            >
              Message
            </h3>
            <p className="text-center text-sm transition-all duration-1000">
              Build connections with like-minded developers.
            </p>
          </div>

          <div
            className="hover:h-100 hover:w-100 flex h-80 w-80 flex-col items-center justify-center rounded-lg bg-gray-800 bg-slate-200 p-4 text-black transition-all duration-1000"
            onMouseEnter={() => setHoveredCard('profile')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {hoveredCard === 'profile' ? (
              <img
                src={profileHover}
                className="h-50 mb-5 rounded transition-all duration-1000"
              />
            ) : (
              <img
                src={profile}
                alt="profile"
                className="duration-2 h-11 w-11 transition-all"
              />
            )}
            <h3
              className={`text-2xl font-bold ${hoveredCard === 'profile' ? 'text-4xl' : 'text-2xl'} transition-all duration-1000`}
            >
              Profile
            </h3>
            <p className="text-center text-sm transition-all duration-1000">
              Show your skills and connect with coders.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
