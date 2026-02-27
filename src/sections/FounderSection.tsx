import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FounderSection = () => {
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
          '.founder-headline',
          { x: '-50vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(
          '.founder-body',
          { y: '18vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.08
        )
        .fromTo(
          '.founder-image',
          { x: '60vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.1
        )
        .fromTo(
          '.founder-quote',
          { y: '35vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.14
        );

      // SETTLE (30-70%): Hold

      // EXIT (70-100%)
      scrollTl
        .fromTo(
          '.founder-text-group',
          { x: 0, opacity: 1 },
          { x: '-16vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          '.founder-image',
          { x: 0, opacity: 1 },
          { x: '16vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          '.founder-quote',
          { y: 0, opacity: 1 },
          { y: '10vh', opacity: 0, ease: 'power2.in' },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="founder"
      className="section-pinned bg-nomad-black z-30"
    >
      {/* Soft Field Background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(circle at 80% 20%, rgba(255, 45, 143, 0.18), rgba(7, 7, 8, 0) 50%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center">
        <div className="w-full px-[7vw] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="founder-text-group space-y-6">
            <div className="space-y-2">
              <span className="label-mono founder-headline opacity-0">
                The Visionary
              </span>
              <h2 className="heading-section founder-headline opacity-0">
                FOUNDER
              </h2>
            </div>

            <div className="founder-body opacity-0">
              <p className="font-display font-black text-4xl md:text-5xl text-nomad-white mb-4">
                Fero
              </p>
              <p className="body-text max-w-md">
                Fero is the founder of NOMAD+, a visionary creator driven by
                transformation and limitless exploration.
              </p>
              <p className="body-text max-w-md mt-4">
                His mission is to craft Roblox maps that are more than just
                playable environments—but immersive experiences with atmosphere,
                depth, and identity.
              </p>
              <p className="body-text max-w-md mt-4">
                Under his leadership, NOMAD+ continues to evolve as a creative
                force within the Roblox development space.
              </p>
            </div>

            {/* Quote Card */}
            <div className="founder-quote glass rounded-3xl p-6 max-w-lg opacity-0">
              <Quote className="text-nomad-magenta mb-3" size={28} />
              <p className="font-display font-bold text-lg text-nomad-white italic">
                &quot;I don&apos;t just build maps—I build atmosphere.&quot;
              </p>
              <p className="label-mono mt-4">On Building Worlds</p>
            </div>
          </div>

          {/* Right: Portrait Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div
              className="founder-image image-card neon-border opacity-0"
              style={{ height: '60vh', width: '100%', maxWidth: '450px' }}
            >
              <img
                src="/images/founder_portrait.jpg"
                alt="Fero - Founder of NOMAD+"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-nomad-black/80 via-transparent to-transparent" />

              {/* Name Overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-display font-black text-3xl text-nomad-white">
                  FERO
                </p>
                <p className="label-mono mt-1">Founder & Creative Director</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
