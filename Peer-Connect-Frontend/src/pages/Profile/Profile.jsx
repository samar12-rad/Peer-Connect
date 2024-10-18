import photu from '../../assets/user-profile-icon-free-vector.jpg';

const Profile = () => {
  const dummyData = {
    name: 'Ishika Verma',
    username: 'ishika',
    bio: 'I am a student at IIPS DAVV, passionate about coding, web development, and learning new technologies.',
    pronouns: 'She/Her',
    portfolio: 'www.ishikaportfolio.com',
    projects: 'Project1, Project2, Project3',
    skills: [
      {
        skill: 'JavaScript',
        color: 'yellow-500',
      },
      {
        skill: 'ReactJS',
        color: 'blue-500',
      },
      {
        skill: 'NodeJS',
        color: 'green-500',
      },
    ],
    socials: {
      github: 'github.com/ishika123',
      linkedin: 'linkedin.com/in/ishikaverma',
      leetcode: 'leetcode.com/ishikaverma',
      instagram: '@ishikaverma',
      whatsapp: '+1234567890',
      telegram: '@ishikaverma',
      twitter: '@ishika_tweets',
    },
    codingInterests: 'Web Development',
    hobbies: 'Reading, Painting, Music',
    language: 'English',
    preferredTime: 'Morning',
  };

  return (
    <div className="max-fit w-full flex flex-col gap-4 shadow-xl relative overflow-hidden">
      <div className="text-black justify-evenly flex text-2xl">
        <h1>PROFILE</h1>
      </div>

      <div className="grid h-full w-full grid-cols-6 grid-rows-8 gap-3 px-10">
        <div className="col-span-2 row-span-5 flex flex-col items-center px-15 pt-10  relative overflow-hidden bg-opacity-50 rounded-[16px] shadow-6 shadow-white backdrop-blur-[7.4px] border border-white/5">
          <div className="absolute inset-0 opacity-15 rounded-xl" />{' '}
          {/* Enhanced overlay for more frosted look */}
          <img src={photu} alt="Profile" className="w-40 h-40 rounded-full" />
          <div className="pt-20">
            <p className="pb-4">Name: {dummyData.name}</p>
            <p className="pb-4">User Name: {dummyData.username}</p>
            <p className="pb-4">Bio: {dummyData.bio}</p>
            <p className="pb-4">Pronouns: {dummyData.pronouns}</p>
            <div className="flex justify-end">
              <button className="mt-6 h-7 ml-20 mb-5 w-30 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-[16px]">
                edit                                  
              </button             >
            </div>
          </div>
        </div>

        <div className="col-span-4 row-span-3 rounded-xl pt-5 pl-10 pr-10 bg-opacity-50 shadow-6 shadow-white backdrop-blur-[7.4px] border border-white/5">
          <div className="flex justify-between w-full px-[10%]">
            <p className="text-center  font-bold text-xl">SKILLS</p>
            <button className="h-7 w-30 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-[16px]">
              edit
            </button>
          </div>
          <div className="pt-15 pl-5">
            <div className="flex gap-7">
              <h1 className="pb-3 text-black-2 text-xl">Portfolio website:</h1>
              <p className="text-black text-xl"> {dummyData.portfolio}</p>
            </div>
            <div className="flex gap-7">
              <h1 className="pb-3 text-black-2 text-xl">Projects:</h1>
              <p className="text-black text-xl"> {dummyData.projects}</p>
            </div>
            <div className="flex gap-7">
              <h1 className="pb-3 text-black-2 text-xl">Skills:</h1>{' '}
              <p className="text-black text-xl"></p>
            </div>
          </div>
        </div>

        <div className="col-span-2 row-span-4 rounded-xl pt-5 pl-10 pr-10 bg-opacity-50 shadow-6 shadow-white backdrop-blur-[7.4px] border border-white/5">
          <div className="flex justify-between w-full px-[10%]">
            <p className="text-center  font-bold text-xl">SOCIALS</p>
            <button className="h-7 w-30 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-[16px]">
              edit
            </button>
          </div>
          <div className="pt-15 pl-5">
            <div className="flex gap-7">
              <h1 className="pb-3 text-black-2 text-xl">GitHub:</h1>{' '}
              <p className="text-black text-xl">{dummyData.socials.github}</p>
            </div>
            <div className="flex gap-7">
              <h1 className="pb-3 text-black-2 text-xl">Linked In: </h1>
              <p className="text-black text-xl">
                {' '}
                {dummyData.socials.linkedin}
              </p>
            </div>
            <div className="flex gap-7">
              <h1 className="pb-3 text-black-2 text-xl">Leetcode:</h1>{' '}
              <p className="text-black text-xl">
                {' '}
                {dummyData.socials.leetcode}
              </p>
            </div>
            <div className="flex gap-7">
              <h1 className="pb-3 text-black-2 text-xl">Instagram:</h1>{' '}
              <p className="text-black text-xl">
                {' '}
                {dummyData.socials.instagram}
              </p>
            </div>
            <div className="flex gap-7">
              <h1 className="pb-3 text-black-2 text-xl">Whatsapp: </h1>{' '}
              <p className="text-black text-xl">{dummyData.socials.whatsapp}</p>
            </div>
            <div className="flex gap-7">
              <h1 className="pb-3 text-black-2 text-xl">Telegram: </h1>
              <p className="text-black text-xl">{dummyData.socials.telegram}</p>
            </div>
            <div className="flex gap-7">
              <h1 className="pb-3 text-black-2 text-xl">Twitter: </h1>
              <p className="text-black text-xl">{dummyData.socials.twitter}</p>
            </div>
          </div>
        </div>

        <div className="col-span-2 row-span-2 pt-5 pl-10 pr-10 bg-opacity-50 rounded-[16px] shadow-6 shadow-white backdrop-blur-[7.4px] border border-white/5">
          <div className="flex justify-between w-full px-[10%]">
            <p className="text-center  font-bold text-xl">CODING</p>
            <button className="h-7 w-30 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-[16px]">
              edit{' '}
            </button>
          </div>
          <div className="pt-15 pl-5">
            <div className="flex gap-7">
              <h1 className="text-black-2 text-xl pb-3">Interests:</h1>
              <p className="text-black text-xl">{dummyData.codingInterests}</p>
            </div>
            <div className="flex gap-7">
              <h1 className="text-black-2 text-xl pb-3">
                Hobbies Outside Coding:
              </h1>
              <p className="text-black text-xl">{dummyData.hobbies}</p>
            </div>
          </div>
        </div>

        <div className="col-span-2 row-span-2 pt-5 pl-10 pr-10 bg-opacity-50 rounded-[16px] shadow-6 shadow-white backdrop-blur-[7.4px] border border-white/5">
          <div className="flex justify-between w-full px-[5%]">
            <p className="text-center font-bold text-xl">PREFERENCES</p>
            <button className="h-7 w-30 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-[16px]">
              edit
            </button>
          </div>
          <div className="pt-15 pl-5">
            <div className="flex gap-7">
              <h1 className="pb-3 text-black-2 text-xl">Language: </h1>
              <p className="text-black text-xl">{dummyData.language}</p>
            </div>
            <div className="flex gap-7">
              <h1 className="pb-3 text-black-2 text-xl">Time: </h1>
              <p className="text-black text-xl">{dummyData.preferredTime}</p>
            </div>
          </div>
        </div>

        <div className="col-span-2 row-span-2 pt-5 pl-10 pr-10 bg-opacity-50 rounded-[16px] shadow-6 shadow-white backdrop-blur-[7.4px] border border-white/5">
          <div className="flex justify-between w-full gap-3 px-[5%]">
            <p className="text-center font-bold text-xl">LETS WORK TOGETHER</p>
            <button className="h-7 w-30 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-[16px]">
              edit
            </button>
          </div>
          <div className="flex-grow flex-col justify-center pt-7 items-center">
            <p className="text-black text-xl">Email Me.</p>
            <p className="text-black text-xl">Schedule a Call.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
