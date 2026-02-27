import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, MessageCircle, Hammer, Handshake } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CommunitySection = () => {
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
          '.community-headline',
          { x: '-55vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(
          '.community-body',
          { x: '-40vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.06
        )
        .fromTo(
          '.community-stats',
          { y: '18vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.1
        )
        .fromTo(
          '.community-image',
          { x: '60vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.1
        )
        .fromTo(
          '.community-discord',
          { y: '35vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.14
        );

      // SETTLE (30-70%): Hold

      // EXIT (70-100%)
      scrollTl
        .fromTo(
          '.community-text-group',
          { x: 0, opacity: 1 },
          { x: '-16vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          '.community-image',
          { x: 0, opacity: 1 },
          { x: '16vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          '.community-discord',
          { y: 0, opacity: 1 },
          { y: '12vh', opacity: 0, ease: 'power2.in' },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: Users, value: '2.4K+', label: 'Members' },
    { icon: Hammer, value: 'Daily', label: 'Builds' },
    { icon: Handshake, value: 'Open', label: 'Collabs' },
  ];

  return (
    <section
      ref={sectionRef}
      id="community"
      className="section-pinned bg-nomad-black z-50"
    >
      {/* Soft Field Background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(circle at 70% 30%, rgba(255, 45, 143, 0.2), rgba(7, 7, 8, 0) 55%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center">
        <div className="w-full px-[7vw] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="community-text-group space-y-6">
            <div className="space-y-2">
              <span className="label-mono community-headline opacity-0">
                Join Us
              </span>
              <h2 className="heading-section community-headline opacity-0">
                COMMUNITY
              </h2>
            </div>

            <p className="body-text max-w-md community-body opacity-0">
              A space for feedback, collabs, and late-night builds. Share
              work-in-progress, get honest notes, and ship together.
            </p>

            {/* Stats */}
            <div className="community-stats flex gap-8 pt-4 opacity-0">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon
                    className="text-nomad-magenta mx-auto mb-2"
                    size={24}
                  />
                  <p className="font-display font-black text-2xl text-nomad-white">
                    {stat.value}
                  </p>
                  <p className="text-xs text-nomad-gray mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image + Discord Card */}
          <div className="relative">
            {/* Main Image */}
            <div
              className="community-image image-card opacity-0"
              style={{ height: '58vh' }}
            >
              <img
                src="/images/community_gathering.jpg"
                alt="NOMAD+ Community"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-nomad-black/60 via-transparent to-transparent" />
            </div>

            {/* Discord Card */}
            <div className="community-discord absolute -bottom-6 -right-6 lg:right-8 glass-strong rounded-3xl p-6 opacity-0">
              <div className="flex items-center gap-3 mb-3">
                <MessageCircle className="text-nomad-magenta" size={24} />
                <span className="font-display font-bold text-nomad-white">
                  Join the Server
                </span>
              </div>
              <p className="text-sm text-nomad-gray mb-4">
                New channels every week.
              </p>
              <button
                onClick={() =>
                  window.open('https://discord.gg/Ymgds4TEVv', '_blank')
                }
                className="btn-primary text-xs py-3 px-5 w-full"
              >
                Join Discord
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
