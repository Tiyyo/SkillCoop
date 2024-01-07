import Footer from './footer';
import Benefits from './benefits';
import HeaderLandingPage from './header-landing-page';
import HeroSection from './hero-section';
import { Suspense } from 'react';
import LoadingPage from '../../component/loading-page';

function LandingPage() {
  return (
    <main>
      <Suspense fallback={<LoadingPage />}>
        <section className="h-screen bg-home-page-gradient">
          <HeaderLandingPage />
          <HeroSection />
        </section>
        <div className="py-10 bg-primary-gradient sm:pt-[35%]"></div>
        <Benefits />
        <Footer />
      </Suspense>
    </main>
  );
}

export default LandingPage;
