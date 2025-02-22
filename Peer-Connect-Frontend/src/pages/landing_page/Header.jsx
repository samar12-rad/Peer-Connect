const Header = () => {
  return (
    <div className="mt-34 h-screen w-full">
      <h1 className="px-22 pt-25 flex items-center justify-center text-3xl text-white">
        No more solo coding—join forces with passionate peers and take on the
        coding world together From hackathons to passion projects, find a coder
        who matches your energy and skills!
      </h1>
      <h1 className="py-25 flex items-center justify-center font-bold text-white">
        <span className="text-6xl">Code,</span>{' '}
        <span className="text-7xl">Collaborate,</span>{' '}
        <span className="text-8xl">Conquer</span>
      </h1>
      <hr className="mx-auto my-4 w-3/4 border-t-2 border-green-500"></hr>
    </div>
  );
};

export default Header;
