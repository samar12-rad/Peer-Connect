const About = () => {
  return (
    <div className="bg-black-2 flex min-h-[50vh] w-full flex-col">
      <div className="ml-45 mt-19">
        <h1 className="text-6xl font-bold text-green-400">
          Match.Chat.Code.Collaborate.
        </h1>
      </div>
      <div>
        <h2 className="px-25 pt-10 text-2xl text-white">
          Peer Connect is a platform designed to help coders find like-minded
          collaborators for hackathons, coding projects, and learning together.
          Whether you’re looking to build, innovate, or improve your coding
          skills, Peer Connect brings coders together for meaningful
          collaborations.
          <div>
            {' '}
            <button className="mt-30 mb-30 ml-30 text-black-2 rounded-3xl rounded-md bg-green-400 px-5 py-1 font-bold duration-300 hover:bg-blue-500 hover:text-white">
              SIGN UP
            </button>
          </div>
        </h2>
      </div>
    </div>
  );
};

export default About;
