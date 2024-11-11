import About from './About';
import Faq from './Faq';
import Footer from './Footer';
import Header from './Header';
import LandingContent from './LandingContent';
import Nav from './Nav';

const Landing = () => {
  return (
    <div className="flex h-fit w-full flex-col gap-2">
      <Nav />

      <Header />
      <LandingContent />
      <About />
      <Faq />

      <Footer />
    </div>
  );
};

export default Landing;
