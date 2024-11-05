import Card from '../../Components/finderComponents/Card';

const PeerFinder = () => {
  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center">
      <h1 className="text-center text-5xl text-blue-600">
        Welcome to Peer Finder
      </h1>

      <Card />
    </div>
  );
};

export default PeerFinder;
