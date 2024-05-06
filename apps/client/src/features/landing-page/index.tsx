import Footer from './footer';
import Benefits from './benefits';
import HeaderLandingPage from './header';
import HeroSection from './hero-section';
import { Suspense } from 'react';
import LoadingPage from '../../shared/components/loading-page';
import { Spotlight } from '../../lib/ui/spotlight';

function LandingPage() {
  return (
    <main>
      <Suspense fallback={<LoadingPage />}>
        <section className="min-h-screen bg-home-page-gradient">
          <Spotlight
            className="-top-20 left-0 md:-top-40 md:left-60"
            fill="#69816d"
          />
          <HeaderLandingPage />
          <HeroSection />
        </section>
        <Benefits />
        <Footer />
      </Suspense>
    </main>
  );
}

export default LandingPage;
