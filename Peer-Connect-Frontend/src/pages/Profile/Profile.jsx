//import photu from '../../assets/user-profile-icon-free-vector.jpg';
import Card from '../../Components/finderComponents/Card';
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
      <div className="flex justify-evenly text-2xl">
        <h1 className="bg-gradient-to-b from-neutral-200 to-neutral-100 bg-clip-text pb-5 text-center text-7xl font-bold text-transparent">
          <span className="text-green-500"> PROFILE</span>
        </h1>
      </div>

      <div className="grid h-full w-full grid-cols-6 grid-rows-7 gap-3 px-10">
        <div className="shadow-6 relative col-span-2 row-span-5 flex items-center justify-center rounded-[16px] border border-white/5 bg-opacity-50 shadow-white backdrop-blur-[7.4px]">
          <Card
            firstName="firstName"
            lastName="lastName"
            city="city"
            github="github"
            linkedin="linkedin"
            email="email"
            gender="female"
            skills={[['React'], ['JavaScript']]}
            onConnect="onConnect"
            onNextUser="onNextUser"
          />
        </div>

        <div className="shadow-6 col-span-4 row-span-3 rounded-xl border border-white/5 bg-opacity-50 pl-10 pr-10 pt-5 shadow-white backdrop-blur-[7.4px]">
          <div className="flex w-full justify-between px-[10%]">
            <p className="text-center text-xl font-bold">SKILLS</p>
            <button className="w-30 h-7 rounded-lg bg-green-500 text-[16px] text-white hover:bg-green-800">
              edit
            </button>
          </div>
          <div className="pt-15 pl-5">
            <div className="flex gap-7">
              <h1 className="-2 pb-3 text-xl">Skills:</h1>{' '}
              <p className="text-xl"></p>
            </div>
          </div>
        </div>

        <div className="shadow-6 col-span-2 row-span-4 rounded-xl border border-white/5 bg-opacity-50 pl-10 pr-10 pt-5 shadow-white backdrop-blur-[7.4px]">
          <div className="flex w-full justify-between px-[10%]">
            <p className="text-center text-xl font-bold">SOCIALS</p>
            <button className="w-30 h-7 rounded-lg bg-green-500 text-[16px] text-white hover:bg-green-800">
              edit
            </button>
          </div>
          <div className="pt-15 pl-5">
            <div className="flex gap-7">
              <h1 className="-2 pb-3 text-xl">GitHub:</h1>{' '}
              <p className="text-xl">{dummyData.socials.github}</p>
            </div>
            <div className="flex gap-7">
              <h1 className="-2 pb-3 text-xl">Linked In: </h1>
              <p className="text-xl"> {dummyData.socials.linkedin}</p>
            </div>
          </div>
        </div>

        <div className="shadow-6 col-span-2 row-span-2 rounded-[16px] border border-white/5 bg-opacity-50 pl-10 pr-10 pt-5 shadow-white backdrop-blur-[7.4px]">
          <div className="flex w-full justify-between px-[10%]">
            <p className="text-center text-xl font-bold">PROJECTS</p>
            <button className="w-30 h-7 rounded-lg bg-green-500 text-[16px] text-white hover:bg-green-800">
              edit{' '}
            </button>
          </div>
        </div>

        <div className="shadow-6 col-span-2 row-span-2 rounded-[16px] border border-white/5 bg-opacity-50 pl-10 pr-10 pt-5 shadow-white backdrop-blur-[7.4px]">
          <div className="flex w-full justify-between px-[5%]">
            <p className="text-center text-xl font-bold">BIO</p>
            <button className="w-30 h-7 rounded-lg bg-green-500 text-[16px] text-white hover:bg-green-800">
              edit
            </button>
          </div>
        </div>

        <div className="shadow-6 col-span-2 row-span-2 rounded-[16px] border border-white/5 bg-opacity-50 pl-10 pr-10 pt-5 shadow-white backdrop-blur-[7.4px]">
          <div className="flex w-full justify-between gap-3 px-[5%]">
            <p className="text-center text-xl font-bold">LETS WORK TOGETHER</p>
            <button className="w-30 h-7 rounded-lg bg-green-500 text-[16px] text-white hover:bg-green-800">
              edit
            </button>
          </div>
          <div className="flex-grow flex-col items-center justify-center pt-7">
            <p className="text-xl">Email Me.</p>
            <p className="text-xl">Schedule a Call.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
