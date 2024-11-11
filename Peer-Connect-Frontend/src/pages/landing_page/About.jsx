import Card from '../../Components/finderComponents/Card';
import chat from '../../assets/aboutCard/Chat.png';
const About = () => {
  return (
    <div className="bg-black-2 flex min-h-[50vh] w-full flex-col gap-20">
      <div className="bg-black-2 flex min-h-[50vh] w-full flex-col px-40 py-20">
        <div className="">
          <h1 className="text-6xl font-bold text-green-400">
            Match.Chat.Code.
            <br />
            Collaborate.
          </h1>
        </div>
        <div className="mt-15 flex w-full justify-between">
          <div>
            <h2 className="w-[70%] text-2xl text-white">
              Peer Connect is a platform designed to help coders find
              like-minded collaborators for hackathons, coding projects, and
              learning together. Whether you’re looking to build, innovate, or
              improve your coding skills, Peer Connect brings coders together
              for meaningful collaborations.
            </h2>{' '}
            <button className="text-black-2 mt-20 rounded-3xl bg-green-400 px-5 py-1 text-lg font-bold duration-300 hover:bg-blue-500 hover:text-white">
              SIGN UP
            </button>
          </div>
          <div className="-mt-35 scale-90">
            <Card
              firstName="John"
              lastName="Doe"
              city="New York"
              github="https://github.com/johndoe"
              linkedin="https://linkedin.com/in/johndoe"
              email="john@example.com"
              gender="male"
              skills={[{ name: 'React' }, { name: 'JavaScript' }]}
              bio="Full stack developer passionate about web technologies"
            />
          </div>
        </div>
      </div>
      <div className="flex-col px-40 py-20">
        <div className="mt-15 flex w-full justify-between">
          <div className="-mt-55 z-1 absolute -ml-10 scale-75">
            <Card
              firstName="John"
              lastName="Doe"
              city="New York"
              github="https://github.com/johndoe"
              linkedin="https://linkedin.com/in/johndoe"
              email="john@example.com"
              gender="male"
              skills={[{ name: 'React' }, { name: 'JavaScript' }]}
              bio="Full stack developer passionate about web technologies"
            />
          </div>
          <div>
            <img src={chat} className="-mt-18 scale-90" alt="chat"></img>
          </div>
          <div className="w-[70%] px-10 text-2xl text-white">
            <div>
              <h1 className="-mt-10 pb-5 text-4xl text-green-400">
                It Start with a Match.
              </h1>
            </div>
            <div>
              <h1 className="text-2xl">
                See what happens when you Like someone with our iconic matching
                feature.
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
