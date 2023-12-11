import Footer from './footer';
import Benefits from './benefits';
import HeaderLandingPage from './header-landing-page';
import HeroSection from './hero-section';

function LandingPage() {
  return (
    <main>
      <section className="h-screen bg-home-page-gradient">
        <HeaderLandingPage />
        <HeroSection />
      </section>
      <div className="py-10 bg-primary-gradient sm:pt-[35%]"></div>
      <Benefits />
      <Footer />
    </main>
  );
}

export default LandingPage;
