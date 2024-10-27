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
    <div className="max-fit relative flex w-full flex-col gap-4 overflow-hidden pb-9 shadow-xl">
      <div className="flex justify-evenly text-2xl text-black">
        <h1>PROFILE</h1>
      </div>

      <div className="grid h-full w-full grid-cols-6 grid-rows-7 gap-3 px-10">
        <div className="px-15 shadow-6 relative col-span-2 row-span-5 flex flex-col items-center overflow-hidden rounded-[16px] border border-white/5 bg-opacity-50 pt-10 shadow-white backdrop-blur-[7.4px]">
          <div className="absolute inset-0 rounded-xl opacity-15" />{' '}
          {/* Enhanced overlay for more frosted look */}
          <img src={photu} alt="Profile" className="h-40 w-40 rounded-full" />
          <div className="pt-20">
            <p className="pb-4">Name: {dummyData.name}</p>
            <p className="pb-4">User Name: {dummyData.username}</p>
            <p className="pb-4">Bio: {dummyData.bio}</p>
            <p className="pb-4">Pronouns: {dummyData.pronouns}</p>
            <div className="flex justify-end">
              <button className="w-30 mb-5 ml-20 mt-6 h-7 rounded-lg bg-blue-900 text-[16px] text-white hover:bg-blue-800">
                edit
              </button>
            </div>
          </div>
        </div>

        <div className="shadow-6 col-span-4 row-span-3 rounded-xl border border-white/5 bg-opacity-50 pl-10 pr-10 pt-5 shadow-white backdrop-blur-[7.4px]">
          <div className="flex w-full justify-between px-[10%]">
            <p className="text-center text-xl font-bold">SKILLS</p>
            <button className="w-30 h-7 rounded-lg bg-blue-900 text-[16px] text-white hover:bg-blue-800">
              edit
            </button>
          </div>
          <div className="pt-15 pl-5">
            <div className="flex gap-7">
              <h1 className="text-black-2 pb-3 text-xl">Portfolio website:</h1>
              <p className="text-xl text-black"> {dummyData.portfolio}</p>
            </div>
            <div className="flex gap-7">
              <h1 className="text-black-2 pb-3 text-xl">Projects:</h1>
              <p className="text-xl text-black"> {dummyData.projects}</p>
            </div>
            <div className="flex gap-7">
              <h1 className="text-black-2 pb-3 text-xl">Skills:</h1>{' '}
              <p className="text-xl text-black"></p>
            </div>
          </div>
        </div>

        <div className="shadow-6 col-span-2 row-span-4 rounded-xl border border-white/5 bg-opacity-50 pl-10 pr-10 pt-5 shadow-white backdrop-blur-[7.4px]">
          <div className="flex w-full justify-between px-[10%]">
            <p className="text-center text-xl font-bold">SOCIALS</p>
            <button className="w-30 h-7 rounded-lg bg-blue-900 text-[16px] text-white hover:bg-blue-800">
              edit
            </button>
          </div>
          <div className="pt-15 pl-5">
            <div className="flex gap-7">
              <h1 className="text-black-2 pb-3 text-xl">GitHub:</h1>{' '}
              <p className="text-xl text-black">{dummyData.socials.github}</p>
            </div>
            <div className="flex gap-7">
              <h1 className="text-black-2 pb-3 text-xl">Linked In: </h1>
              <p className="text-xl text-black">
                {' '}
                {dummyData.socials.linkedin}
              </p>
            </div>
            <div className="flex gap-7">
              <h1 className="text-black-2 pb-3 text-xl">Leetcode:</h1>{' '}
              <p className="text-xl text-black">
                {' '}
                {dummyData.socials.leetcode}
              </p>
            </div>
            <div className="flex gap-7">
              <h1 className="text-black-2 pb-3 text-xl">Instagram:</h1>{' '}
              <p className="text-xl text-black">
                {' '}
                {dummyData.socials.instagram}
              </p>
            </div>
            <div className="flex gap-7">
              <h1 className="text-black-2 pb-3 text-xl">Whatsapp: </h1>{' '}
              <p className="text-xl text-black">{dummyData.socials.whatsapp}</p>
            </div>
            <div className="flex gap-7">
              <h1 className="text-black-2 pb-3 text-xl">Telegram: </h1>
              <p className="text-xl text-black">{dummyData.socials.telegram}</p>
            </div>
            <div className="flex gap-7">
              <h1 className="text-black-2 pb-3 text-xl">Twitter: </h1>
              <p className="text-xl text-black">{dummyData.socials.twitter}</p>
            </div>
          </div>
        </div>

        <div className="shadow-6 col-span-2 row-span-2 rounded-[16px] border border-white/5 bg-opacity-50 pl-10 pr-10 pt-5 shadow-white backdrop-blur-[7.4px]">
          <div className="flex w-full justify-between px-[10%]">
            <p className="text-center text-xl font-bold">CODING</p>
            <button className="w-30 h-7 rounded-lg bg-blue-900 text-[16px] text-white hover:bg-blue-800">
              edit{' '}
            </button>
          </div>
          <div className="pt-15 pl-5">
            <div className="flex gap-7">
              <h1 className="text-black-2 pb-3 text-xl">Interests:</h1>
              <p className="text-xl text-black">{dummyData.codingInterests}</p>
            </div>
            <div className="flex gap-7">
              <h1 className="text-black-2 pb-3 text-xl">
                Hobbies Outside Coding:
              </h1>
              <p className="text-xl text-black">{dummyData.hobbies}</p>
            </div>
          </div>
        </div>

        <div className="shadow-6 col-span-2 row-span-2 rounded-[16px] border border-white/5 bg-opacity-50 pl-10 pr-10 pt-5 shadow-white backdrop-blur-[7.4px]">
          <div className="flex w-full justify-between px-[5%]">
            <p className="text-center text-xl font-bold">PREFERENCES</p>
            <button className="w-30 h-7 rounded-lg bg-blue-900 text-[16px] text-white hover:bg-blue-800">
              edit
            </button>
          </div>
          <div className="pt-15 pl-5">
            <div className="flex gap-7">
              <h1 className="text-black-2 pb-3 text-xl">Language: </h1>
              <p className="text-xl text-black">{dummyData.language}</p>
            </div>
            <div className="flex gap-7">
              <h1 className="text-black-2 pb-3 text-xl">Time: </h1>
              <p className="text-xl text-black">{dummyData.preferredTime}</p>
            </div>
          </div>
        </div>

        <div className="shadow-6 col-span-2 row-span-2 rounded-[16px] border border-white/5 bg-opacity-50 pl-10 pr-10 pt-5 shadow-white backdrop-blur-[7.4px]">
          <div className="flex w-full justify-between gap-3 px-[5%]">
            <p className="text-center text-xl font-bold">LETS WORK TOGETHER</p>
            <button className="w-30 h-7 rounded-lg bg-blue-900 text-[16px] text-white hover:bg-blue-800">
              edit
            </button>
          </div>
          <div className="flex-grow flex-col items-center justify-center pt-7">
            <p className="text-xl text-black">Email Me.</p>
            <p className="text-xl text-black">Schedule a Call.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
