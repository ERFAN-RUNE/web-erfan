import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navigation from './components/Navigation';
import LoadingScreen from './components/LoadingScreen';
import ScrollProgress from './components/ScrollProgress';

import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import FounderSection from './sections/FounderSection';
import GamesSection from './sections/GamesSection';
import CommunitySection from './sections/CommunitySection';
import JoinSection from './sections/JoinSection';
import ExploreSection from './sections/ExploreSection';
import UpdatesSection from './sections/UpdatesSection';
import ContactSection from './sections/ContactSection';
import Footer from './sections/Footer';

import './index.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) return;

    // Wait for all ScrollTriggers to be created
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter((st) => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      // Build ranges and snap targets from pinned sections
      const pinnedRanges = pinned.map((st) => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center:
          (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      // Create global snap
      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Check if within any pinned range (with buffer)
            const inPinned = pinnedRanges.some(
              (r) => value >= r.start - 0.08 && value <= r.end + 0.08
            );
            if (!inPinned) return value; // Flowing section: free scroll

            // Find nearest pinned center
            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );

            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [isLoading]);

  // Cleanup all ScrollTriggers on unmount
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className="relative bg-nomad-black min-h-screen">
      {/* Loading Screen */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Scroll Progress Bar */}
      {!isLoading && <ScrollProgress />}

      {/* Navigation */}
      {!isLoading && <Navigation />}

      {/* Grain Overlay */}
      <div className="grain-overlay" />

      {/* Main Content */}
      <main className="relative">
        {/* Pinned Sections */}
        <HeroSection />
        <AboutSection />
        <FounderSection />
        <GamesSection />
        <CommunitySection />
        <JoinSection />
        <ExploreSection />

        {/* Flowing Sections */}
        <UpdatesSection />
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
}

export default App;
