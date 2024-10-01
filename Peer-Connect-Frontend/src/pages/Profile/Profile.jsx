import photu from '../../assets/user-profile-icon-free-vector.jpg';

const Profile = () => {
  return (
    <div className="h-fit w-full flex flex-col gap-7">
      <div className="text-white  justify-evenly flex text-2xl">
        <h1>PROFILE</h1>
        <button type="submit" className="pc-button">
          edit profile
        </button>
      </div>
      <div className="grid h-screen w-full grid-cols-6 grid-rows-8 gap-3 px-10">
        <div className="col-span-2 row-span-5 p-4 flex flex-col justify-between items-center rounded-xl bg-graydark">
          <div className="flex flex-col items-center gap-2 justify-center w-full">
            <img
              src={photu}
              alt="Profile"
              className="w-30 h-w-30 rounded-full"
            />
            <div className="input-div px-10 flex w-full items-start justify-center gap-5 ">
              <h3 className="text-white text-xl">@{dummyData.username} </h3>
            </div>
            <div className="input-div px-5 flex w-full items-center justify-center gap-5">
              <h3 className="font-bold text-white text-xl">Full Name:</h3>
              <h3 className="text-white text-xl">{dummyData.name} </h3>
            </div>
          </div>
          <div className="input-div px-5 py-2 flex w-full items-center justify-start gap-5 h-fit ">
            <h3 className="font-bold text-white text-xl">Bio:</h3>
            <h3 className="text-black bg-white p-2 rounded-2xl">
              {dummyData.about}{' '}
            </h3>
          </div>
        </div>
        <div className="col-span-4 row-span-3 rounded-xl p-5 flex flex-col items-center bg-graydark ">
          <h3 className="bg-[#000000] rounded-3xl px-15 py-5 text-white tracking-widest">
            SKILLS
          </h3>
        </div>
        <div className="col-span-2 row-span-5 rounded-xl bg-graydark">
          <h3 className="text-center bg-graydark font-bold text-xl">SOCIALS</h3>
          <h3 className="pt-5 pb-5 ml-10 text-sm">GitHub:</h3>
          <input
            type="text"
            placeholder="Enter your skills"
            className="justify-center text-black bg-graydark border-2 text-sm"
          />
          <h3 className="pt-1 pb-1 text-sm">Linked In:</h3>
          <input
            type="text"
            placeholder="Enter your Linked In link"
            className="pt-1 pb-1 text-black bg-graydark border-2 text-sm"
          />
          :<h3 className="pt-1 pb-1 text-sm">Leetcode:</h3>
          <input
            type="text"
            placeholder="Enter your Leetcode link"
            className="pt-1 pb-1 text-black bg-graydark border-2 text-sm"
          />
          <h3 className="pt-1 pb-1 text-sm">Instagram:</h3>
          <input
            type="text"
            placeholder="Enter your Instagram link"
            className="pt-1 pb-1 text-black bg-graydark border-2 text-sm"
          />
          <h3 className="pt-1 pb-1 text-sm">Whatsapp:</h3>
          <input
            type="text"
            placeholder="Enter your Whatsapp link"
            className="pt-1 pb-1 text-black bg-graydark border-2 text-sm"
          />
          <h3 className="pt-1 pb-1 text-sm">Telegram:</h3>
          <input
            type="text"
            placeholder="Enter your Telegram link"
            className="pt-1 pb-1 text-black bg-graydark border-2 text-sm"
          />
          <h3 className="pt-1 pb-1 text-sm">Twitter:</h3>
          <input
            type="text"
            placeholder="Enter your Twitter link"
            className="pt-1 pb-1 text-black bg-graydark border-2 text-sm"
          />
        </div>
        <div className="col-span-2 row-span-3 pr-7 rounded-xl bg-graydark">
          <h3 className="text-center font-bold text-xl">CODING</h3>
          <h3 className="pl-10">Interests:</h3>
          <input
            type="text"
            placeholder="Enter your Twitter link"
            className="pt-1 pb-1 text-black bg-graydark  border-2 text-sm"
          />
          <h3 className="pl-10">Hobbies Outside Coding:</h3>
          <input
            type="text"
            placeholder="Enter your Twitter link"
            className="pt-1 pb-1 text-black bg-graydark border-2 text-sm"
          />
        </div>
        <div className="col-span-2 row-span-3 rounded-xl bg-graydark">
          <h3 className="text-center font-bold text-xl">PREFERRENCES</h3>
          <h3 className="pt-5 pl-10 pb-2">Language:</h3>
          <input
            type="text"
            placeholder="Enter your preferred language"
            className="pt-1 bg-graydark text-black pb-1 border-2 text-sm"
          />
          <h3 className="pt-2 pl-10 pb-2">Time:</h3>
          <input
            type="text"
            placeholder="Enter your preferred time"
            className="pt-1 pb-1 bg-graydark border-2 text-black text-sm"
          />
        </div>
        <div className="col-span-2 row-span-2 rounded-xl bg-graydark">
          <h3 className="text-center font-bold text-xl">LETS WORK TOGETHER</h3>
          <h3 className="text-lg">Email Me </h3>
          <h3 className="text-lg">Schedule a Call </h3>
        </div>
      </div>
    </div>
  );
};

export default Profile;
const dummyData = {
  username: 'ishikaverma',
  name: 'ishika verma',
  about:
    'I am a student at IIIT Kalyani, currently in my third year. I am passionate about coding and have experience in web development, machine learning, and data structures and algorithms. I am always looking for new opportunities to learn and grow, and I am excited to see what the future holds.',
  skills: [
    'web development',
    'machine learning',
    'data structures and algorithms',
  ],
  projects: ['project1', 'project2', 'project3'],
  githubStats: 'github.com/ishikaverma',
  peerScore: 100,
  socials: {
    github: 'github.com/ishikaverma',
    linkedIn: 'linkedin.com/in/ishikaverma',
    leetcode: 'leetcode.com/ishikaverma',
    instagram: 'instagram.com/ishikaverma',
    whatsapp: 'wa.me/1234567890',
    telegram: 't.me/ishikaverma',
    twitter: 'twitter.com/ishikaverma',
  },
};
