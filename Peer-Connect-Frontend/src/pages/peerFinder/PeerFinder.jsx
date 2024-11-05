import Card from '../../Components/finderComponents/Card';

const PeerFinder = () => {
  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center p-10">
      <h1 className="text-center text-5xl text-blue-600">
        Welcome to Peer Finder
      </h1>
      <div className="flex h-[80vh] w-[89%] items-center justify-center rounded-2xl bg-slate-700 px-10">
        <Card />
      </div>
    </div>
  );
};

export default PeerFinder;
