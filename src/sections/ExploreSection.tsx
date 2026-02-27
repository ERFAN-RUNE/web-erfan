import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lightbulb, Wind, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ExploreSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0-30%)
      scrollTl
        .fromTo(
          '.explore-headline',
          { x: '-55vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(
          '.explore-body',
          { x: '-40vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.06
        )
        .fromTo(
          '.explore-image',
          { x: '60vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.1
        )
        .fromTo(
          '.explore-card',
          { y: '35vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.14
        );

      // SETTLE (30-70%): Hold

      // EXIT (70-100%)
      scrollTl
        .fromTo(
          '.explore-text-group',
          { x: 0, opacity: 1 },
          { x: '-16vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          '.explore-image',
          { x: 0, opacity: 1 },
          { x: '16vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          '.explore-card',
          { y: 0, opacity: 1 },
          { y: '12vh', opacity: 0, ease: 'power2.in' },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="explore"
      className="section-pinned bg-nomad-black z-[70]"
    >
      {/* Soft Field Background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(255, 45, 143, 0.15), rgba(7, 7, 8, 0) 55%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center">
        <div className="w-full px-[7vw] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="explore-text-group space-y-6">
            <div className="space-y-2">
              <span className="label-mono explore-headline opacity-0">
                Discover
              </span>
              <h2 className="heading-section explore-headline opacity-0">
                EXPLORE
                <br />
                <span className="text-gradient">WORLDS</span>
              </h2>
            </div>

            <p className="body-text max-w-md explore-body opacity-0">
              From first block to final lighting—every world is built to feel
              like a place you&apos;ve visited before. We craft environments that
              evoke emotion and spark curiosity.
            </p>

            {/* Small Feature Card */}
            <div className="explore-card glass rounded-3xl p-6 max-w-sm opacity-0">
              <p className="label-mono mb-4">Mapmaking Notes</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-nomad-magenta/20 flex items-center justify-center">
                    <Lightbulb className="text-nomad-magenta" size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-nomad-white font-medium">
                      Lighting
                    </p>
                    <p className="text-xs text-nomad-gray">
                      Set the mood with shadows
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-nomad-magenta/20 flex items-center justify-center">
                    <Wind className="text-nomad-magenta" size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-nomad-white font-medium">Fog</p>
                    <p className="text-xs text-nomad-gray">
                      Create depth and mystery
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-nomad-magenta/20 flex items-center justify-center">
                    <Layers className="text-nomad-magenta" size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-nomad-white font-medium">Flow</p>
                    <p className="text-xs text-nomad-gray">
                      Guide the player&apos;s journey
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative">
            <div
              className="explore-image image-card neon-border opacity-0"
              style={{ height: '58vh' }}
            >
              <img
                src="/images/explore_scene.jpg"
                alt="Explore NOMAD+ Worlds"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-nomad-black/60 via-transparent to-transparent" />

              {/* Overlay Text */}
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-display font-bold text-xl text-nomad-white">
                  Every World Tells a Story
                </p>
                <p className="body-text text-sm mt-2">
                  Step into immersive environments crafted with passion
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreSection;
