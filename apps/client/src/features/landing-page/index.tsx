import Footer from './footer';
import Benefits from './benefits';
import HeaderLandingPage from './header';
import HeroSection from './hero-section';
import { Suspense } from 'react';
import LoadingPage from '../../shared/components/loading-page';

function LandingPage() {
  return (
    <main>
      <Suspense fallback={<LoadingPage />}>
        <section className="min-h-screen bg-home-page-gradient">
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
