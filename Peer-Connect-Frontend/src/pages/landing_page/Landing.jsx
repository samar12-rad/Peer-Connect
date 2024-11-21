import About from './About';
import Faq from './Faq';
import Footer from './Footer';
import Header from './Header';
import Nav from './Nav';

const Landing = () => {
  return (
    <div className="bg-black-2 flex h-fit w-full flex-col gap-2">
      <Nav />

      <Header />
      <About />
      <Faq />

      <Footer />
    </div>
  );
};

export default Landing;
