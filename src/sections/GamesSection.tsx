import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Gamepad2, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const GamesSection = () => {
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
          '.games-headline',
          { x: '-55vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(
          '.games-cta',
          { y: '10vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.1
        )
        .fromTo(
          '.games-primary',
          { x: '70vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.08
        )
        .fromTo(
          '.games-secondary',
          { x: '-40vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.12
        );

      // SETTLE (30-70%): Hold

      // EXIT (70-100%)
      scrollTl
        .fromTo(
          '.games-text-group',
          { x: 0, opacity: 1 },
          { x: '-16vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          '.games-primary',
          { x: 0, opacity: 1 },
          { x: '16vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          '.games-secondary',
          { x: 0, opacity: 1 },
          { x: '-16vw', opacity: 0, ease: 'power2.in' },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const games = [
    {
      title: 'Neon District',
      description: 'A cyberpunk city exploration experience',
      image: '/images/game_primary.jpg',
      link: 'https://www.roblox.com/share?code=1a399d42a50bf147a9717ed6b4121614&type=ExperienceDetails&stamp=1771861917303',
      featured: true,
      label: 'Featured Experience',
    },
    {
      title: 'The Veil of Dreams',
      description: 'Mystical interior adventure',
      image: '/images/game_secondary.jpg',
      link: 'https://www.roblox.com/share?code=eb98fedc804dc9439e86c83be70a86bc&type=ExperienceDetails&stamp=1771861828145',
      featured: false,
      label: 'Latest Release',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="games"
      className="section-pinned bg-nomad-black z-40"
    >
      {/* Soft Field Background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(circle at 30% 70%, rgba(255, 45, 143, 0.15), rgba(7, 7, 8, 0) 50%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center">
        <div className="w-full px-[7vw] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Text Content */}
          <div className="lg:col-span-5 games-text-group space-y-6">
            <div className="space-y-2">
              <span className="label-mono games-headline opacity-0">
                Our Creations
              </span>
              <h2 className="heading-section games-headline opacity-0">
                OUR
                <br />
                <span className="text-gradient">GAMES</span>
              </h2>
            </div>

            <p className="body-text max-w-md games-headline opacity-0">
              Playable worlds designed like scenes—lighting, pacing, and detail
              first. Every environment tells a story.
            </p>

            <button
              onClick={() =>
                window.open(
                  'https://www.roblox.com/groups/32670228/NOMAD',
                  '_blank'
                )
              }
              className="games-cta btn-secondary flex items-center gap-2 opacity-0"
            >
              <Gamepad2 size={18} />
              View All Experiences
            </button>
          </div>

          {/* Right: Game Cards */}
          <div className="lg:col-span-7 relative">
            {/* Primary Game Card (Large) */}
            <div
              className="games-primary image-card neon-border opacity-0 relative group cursor-pointer"
              style={{ height: '50vh' }}
              onClick={() => window.open(games[0].link, '_blank')}
            >
              <img
                src={games[0].image}
                alt={games[0].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-nomad-black via-nomad-black/40 to-transparent" />

              {/* Label */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <Star className="text-nomad-magenta" size={16} />
                <span className="label-mono">{games[0].label}</span>
              </div>

              {/* Content */}
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="font-display font-bold text-2xl text-nomad-white mb-1">
                  {games[0].title}
                </h3>
                <p className="body-text text-sm mb-4">
                  {games[0].description}
                </p>
                <button className="btn-primary text-xs py-3 px-6 flex items-center gap-2">
                  Play Now
                  <ExternalLink size={14} />
                </button>
              </div>
            </div>

            {/* Secondary Game Card (Small) */}
            <div
              className="games-secondary absolute -bottom-8 -left-8 lg:left-auto lg:-right-8 w-[280px] image-card neon-border opacity-0 group cursor-pointer"
              style={{ height: '200px' }}
              onClick={() => window.open(games[1].link, '_blank')}
            >
              <img
                src={games[1].image}
                alt={games[1].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-nomad-black via-nomad-black/60 to-transparent" />

              {/* Label */}
              <div className="absolute top-3 left-3">
                <span className="label-mono text-[10px]">{games[1].label}</span>
              </div>

              {/* Content */}
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-display font-bold text-lg text-nomad-white mb-1">
                  {games[1].title}
                </h3>
                <button className="text-nomad-magenta text-xs font-body flex items-center gap-1 hover:underline">
                  Play Now
                  <ExternalLink size={12} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GamesSection;
