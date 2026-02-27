import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle, Mail, Code, Palette, Box } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const JoinSection = () => {
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
          '.join-headline',
          { x: '-55vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(
          '.join-body',
          { x: '-40vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.06
        )
        .fromTo(
          '.join-cta',
          { y: '14vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.1
        )
        .fromTo(
          '.join-image',
          { x: '60vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.1
        )
        .fromTo(
          '.join-roles',
          { y: '35vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.14
        );

      // SETTLE (30-70%): Hold

      // EXIT (70-100%)
      scrollTl
        .fromTo(
          '.join-text-group',
          { x: 0, opacity: 1 },
          { x: '-16vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          '.join-image',
          { x: 0, opacity: 1 },
          { x: '16vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          '.join-roles',
          { y: 0, opacity: 1 },
          { y: '12vh', opacity: 0, ease: 'power2.in' },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const roles = [
    { icon: Box, label: 'Builders' },
    { icon: Code, label: 'Scripters' },
    { icon: Palette, label: 'Artists' },
  ];

  return (
    <section
      ref={sectionRef}
      id="join"
      className="section-pinned bg-nomad-black z-[60]"
    >
      {/* Soft Field Background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(circle at 20% 80%, rgba(255, 45, 143, 0.2), rgba(7, 7, 8, 0) 55%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center">
        <div className="w-full px-[7vw] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="join-text-group space-y-6">
            <div className="space-y-2">
              <span className="label-mono join-headline opacity-0">
                Get Involved
              </span>
              <h2 className="heading-section join-headline opacity-0">
                JOIN THE
                <br />
                <span className="text-gradient">MOVEMENT</span>
              </h2>
            </div>

            <p className="body-text max-w-md join-body opacity-0">
              Whether you prototype in your head or polish until 3am—there&apos;s a
              channel for you. Become part of NOMAD+ and build the future of
              digital worlds together.
            </p>

            <div className="join-cta flex flex-wrap gap-4 pt-4 opacity-0">
              <button
                onClick={() =>
                  window.open('https://discord.gg/Ymgds4TEVv', '_blank')
                }
                className="btn-primary flex items-center gap-2"
              >
                <MessageCircle size={18} />
                Join Discord
              </button>
              <button
                onClick={() =>
                  (window.location.href = 'mailto:hello@nomadplus.studio')
                }
                className="btn-secondary flex items-center gap-2"
              >
                <Mail size={18} />
                Request a Collab
              </button>
            </div>
          </div>

          {/* Right: Image + Roles Card */}
          <div className="relative">
            {/* Main Image */}
            <div
              className="join-image image-card opacity-0"
              style={{ height: '58vh' }}
            >
              <img
                src="/images/cta_hands.jpg"
                alt="Join NOMAD+"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-nomad-black/60 via-transparent to-transparent" />
            </div>

            {/* Roles Card */}
            <div className="join-roles absolute -bottom-6 -right-6 lg:right-8 glass-strong rounded-3xl p-6 opacity-0">
              <p className="label-mono mb-4">We&apos;re Looking For</p>
              <div className="flex gap-4">
                {roles.map((role, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 rounded-xl bg-nomad-magenta/20 flex items-center justify-center mb-2">
                      <role.icon className="text-nomad-magenta" size={20} />
                    </div>
                    <p className="text-xs text-nomad-white">{role.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinSection;
