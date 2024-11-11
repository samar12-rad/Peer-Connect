const Nav = () => {
  return (
    <div className="bg-black-2 px-25 flex h-fit min-h-[50px] w-full items-center justify-between gap-5 py-5 text-lg font-bold text-green-400">
      <div>
        <p className="text-3xl">Peer Connect</p>
      </div>
      <div className="flex items-center gap-10">
        <p className="">ABOUT</p>
        <p>FAQs</p>

        <button className="text-black-2 rounded-3xl bg-green-400 px-5 py-1 font-bold duration-300 hover:bg-blue-500 hover:text-white">
          SIGN UP
        </button>
      </div>
    </div>
  );
};

export default Nav;
