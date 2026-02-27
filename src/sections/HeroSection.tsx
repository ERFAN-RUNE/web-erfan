import { useEffect, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Auto-play entrance animation on load
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 2.2 }); // Wait for loading screen

      // Background gradient fade in
      tl.fromTo(
        '.hero-bg',
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: 'power2.out' }
      )
        // Headline animation
        .fromTo(
          '.hero-headline',
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
          '-=0.4'
        )
        // Subheadline
        .fromTo(
          '.hero-subheadline',
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
          '-=0.7'
        )
        // Body text
        .fromTo(
          '.hero-body',
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
          '-=0.7'
        )
        // CTAs
        .fromTo(
          '.hero-cta',
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.1 },
          '-=0.5'
        )
        // Image card
        .fromTo(
          '.hero-image',
          { x: '10vw', scale: 0.96, opacity: 0 },
          { x: 0, scale: 1, opacity: 1, duration: 1, ease: 'power3.out' },
          '-=1'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
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
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set('.hero-headline, .hero-subheadline, .hero-body, .hero-cta', {
              opacity: 1,
              x: 0,
              y: 0,
            });
            gsap.set('.hero-image', { opacity: 1, x: 0, scale: 1 });
          },
        },
      });

      // ENTRANCE (0-30%): Hold settle state (already animated on load)
      // SETTLE (30-70%): Hold

      // EXIT (70-100%)
      scrollTl
        .fromTo(
          '.hero-text-group',
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          '.hero-image',
          { x: 0, scale: 1, opacity: 1 },
          { x: '18vw', scale: 0.98, opacity: 0, ease: 'power2.in' },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="section-pinned bg-nomad-black z-10"
    >
      {/* Background Gradient */}
      <div className="hero-bg absolute inset-0 hero-gradient opacity-0" />

      {/* Soft Field */}
      <div className="absolute inset-0 soft-field" />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 w-full h-full flex items-center"
      >
        <div className="w-full px-[7vw] grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left: Text Content */}
          <div className="hero-text-group space-y-6">
            <h1 className="hero-headline heading-display opacity-0">
              BEHIND THE
              <br />
              <span className="text-gradient">STORY</span>
            </h1>

            <p className="hero-subheadline font-display font-bold text-2xl md:text-3xl text-nomad-white opacity-0">
              A community was born.
            </p>

            <p className="hero-body body-text max-w-md opacity-0">
              NOMAD+ is a creative collective building immersive worlds—where
              every map is a story and every player becomes part of the
              narrative.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => scrollToSection('about')}
                className="hero-cta btn-primary flex items-center gap-2 opacity-0"
              >
                Explore Our Vision
                <ArrowRight size={18} />
              </button>
              <button
                onClick={() => scrollToSection('community')}
                className="hero-cta btn-secondary flex items-center gap-2 opacity-0"
              >
                <Users size={18} />
                Join the Community
              </button>
            </div>
          </div>

          {/* Right: Image Card */}
          <div
            ref={imageRef}
            className="hero-image image-card opacity-0 hidden lg:block"
            style={{ height: '56vh' }}
          >
            <img
              src="/images/hero_group.jpg"
              alt="NOMAD+ Community"
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-nomad-black/60 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
