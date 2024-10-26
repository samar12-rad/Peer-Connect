const Signup = () => {
  return (
    <div className="h-screen w-full pb-10 px-5 pt-0 flex flex-col items-center ">
      <h1 className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-100 text-center  ">
        Sign up
      </h1>
      <div className=" pt-5 pl-10 pr-10 bg-opacity-50 shadow-6 shadow-white backdrop-blur-[7.4px] border-white/5e h-full w-full rounded-lg ">
        <div className="username">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
