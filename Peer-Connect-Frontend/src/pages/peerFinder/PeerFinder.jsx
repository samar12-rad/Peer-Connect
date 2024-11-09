import Header from './Header';
import Skill from '../../Components/unitComponents/Skill';

const PeerFinder = () => {
  return (
    <div className="flex min-h-screen w-screen flex-col items-center p-10">
      <Header />
      <div className="mt-[20vh] h-fit w-fit">
        <h1>
          Just tell us the skills you&apos;re looking for in your partner and we
          will find them for you :)
        </h1>
        <Skill name="node" />
      </div>
    </div>
  );
};

export default PeerFinder;

{
  /* This is the code for the cards wrapper that will be displayed */
  /* <div className="flex h-[80vh] w-[89%] items-center justify-center rounded-2xl bg-slate-700 px-10"></div> */
}
