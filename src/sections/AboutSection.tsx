import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe, Sparkles, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
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
          '.about-headline',
          { x: '-55vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(
          '.about-body',
          { x: '-40vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.06
        )
        .fromTo(
          '.about-image',
          { x: '60vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.08
        )
        .fromTo(
          '.about-stats',
          { y: '40vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.12
        );

      // SETTLE (30-70%): Hold

      // EXIT (70-100%)
      scrollTl
        .fromTo(
          '.about-headline, .about-body',
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          '.about-image',
          { x: 0, opacity: 1 },
          { x: '18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          '.about-stats',
          { y: 0, opacity: 1 },
          { y: '12vh', opacity: 0, ease: 'power2.in' },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: Globe,
      title: 'Immersive Worlds',
      desc: 'Every map tells a story',
    },
    {
      icon: Sparkles,
      title: 'Story-First Design',
      desc: 'Atmosphere and depth',
    },
    {
      icon: Zap,
      title: 'Rapid Prototyping',
      desc: 'From idea to reality',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-pinned bg-nomad-black z-20"
    >
      {/* Soft Field Background */}
      <div className="absolute inset-0 soft-field opacity-50" />

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center">
        <div className="w-full px-[7vw] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <span className="label-mono about-headline opacity-0">
                Who We Are
              </span>
              <h2 className="heading-section about-headline opacity-0">
                ABOUT
                <br />
                <span className="text-gradient">NOMAD+</span>
              </h2>
            </div>

            <div className="about-body space-y-4 opacity-0">
              <p className="body-text">
                We&apos;re a community of builders, writers, and world-makers.
                Every project starts with a question—what if a place could feel
                like a memory?
              </p>
              <p className="body-text">
                We prototype, polish, and publish experiences that turn players
                into participants. Inspired by the meaning of &quot;Nomad,&quot; we
                embrace movement, growth, and evolution without permanent
                boundaries.
              </p>
              <p className="body-text">
                Every project we create represents progression, innovation, and
                storytelling through digital space.
              </p>
            </div>

            {/* Features */}
            <div className="about-body grid grid-cols-3 gap-4 pt-4 opacity-0">
              {features.map((feature, index) => (
                <div key={index} className="text-center lg:text-left">
                  <feature.icon
                    className="text-nomad-magenta mx-auto lg:mx-0 mb-2"
                    size={24}
                  />
                  <p className="font-display font-bold text-sm text-nomad-white">
                    {feature.title}
                  </p>
                  <p className="text-xs text-nomad-gray mt-1">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image + Stats Card */}
          <div className="relative">
            {/* Main Image */}
            <div
              className="about-image image-card opacity-0"
              style={{ height: '58vh' }}
            >
              <img
                src="/images/about_workspace.jpg"
                alt="NOMAD+ Workspace"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-nomad-black/60 via-transparent to-transparent" />
            </div>

            {/* Stats Card */}
            <div className="about-stats absolute -bottom-6 -right-6 lg:right-8 glass-strong rounded-3xl p-6 opacity-0">
              <p className="font-display font-black text-4xl text-nomad-magenta">
                12+
              </p>
              <p className="font-body text-sm text-nomad-white mt-1">
                Worlds Created
              </p>
              <p className="text-xs text-nomad-gray mt-2">
                Built with story-first design
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
