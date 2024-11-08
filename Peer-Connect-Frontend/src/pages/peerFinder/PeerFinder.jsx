import Card from '../../Components/finderComponents/Card';
import Header from './Header';

const PeerFinder = () => {
  return (
    <div className="flex min-h-screen w-screen flex-col items-center p-10">
      <Header />
      <div className=""></div>
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
  );
};

export default PeerFinder;

{
  /* This is the code for the cards wrapper that will be displayed */
  /* <div className="flex h-[80vh] w-[89%] items-center justify-center rounded-2xl bg-slate-700 px-10"></div> */
}
