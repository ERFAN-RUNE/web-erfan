import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const UpdatesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.updates-header',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.updates-header',
            start: 'top 80%',
            end: 'top 55%',
            scrub: 0.3,
          },
        }
      );

      // Cards animation
      gsap.utils.toArray<HTMLElement>('.update-card').forEach((card) => {
        gsap.fromTo(
          card,
          { y: '10vh', opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              end: 'top 50%',
              scrub: 0.3,
            },
          }
        );

        // Thumbnail parallax
        const thumb = card.querySelector('.update-thumb');
        if (thumb) {
          gsap.fromTo(
            thumb,
            { y: -12 },
            {
              y: 12,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const updates = [
    {
      title: 'New World Drops Next Month',
      description:
        'A city map built around rain and neon. Experience the atmosphere of a cyberpunk metropolis like never before.',
      image: '/images/update_01.jpg',
      date: 'Jan 15, 2026',
      category: 'Release',
    },
    {
      title: 'Community Build-Off Results',
      description:
        'Top 3 entries and what we learned from the incredible submissions. The creativity continues to amaze us.',
      image: '/images/update_02.jpg',
      date: 'Jan 10, 2026',
      category: 'Community',
    },
    {
      title: 'Behind the Lighting',
      description:
        'How we use fog, shadows, and color grading to create depth and emotion in our worlds.',
      image: '/images/update_03.jpg',
      date: 'Jan 5, 2026',
      category: 'Dev Blog',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="updates"
      className="relative bg-nomad-black z-[80] py-24"
    >
      {/* Soft Field Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            'radial-gradient(circle at 80% 0%, rgba(255, 45, 143, 0.2), rgba(7, 7, 8, 0) 50%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 px-[7vw]">
        {/* Header */}
        <div className="updates-header mb-16">
          <span className="label-mono">Stay Updated</span>
          <h2 className="heading-section mt-2">
            LATEST
            <br />
            <span className="text-gradient">UPDATES</span>
          </h2>
          <p className="body-text max-w-md mt-4">
            Patches, releases, and community highlights. Stay in the loop with
            everything NOMAD+.
          </p>
        </div>

        {/* Update Cards */}
        <div className="space-y-8">
          {updates.map((update, index) => (
            <div
              key={index}
              className="update-card group cursor-pointer"
            >
              <div className="glass rounded-4xl overflow-hidden border border-white/5 hover:border-nomad-magenta/30 transition-all duration-500">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
                  {/* Image */}
                  <div className="md:col-span-2 relative h-48 md:h-auto overflow-hidden">
                    <div className="update-thumb absolute inset-0">
                      <img
                        src={update.image}
                        alt={update.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-nomad-black/40" />
                  </div>

                  {/* Content */}
                  <div className="md:col-span-3 p-6 md:p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="label-mono text-[10px]">
                        {update.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-nomad-gray">
                        <Calendar size={12} />
                        {update.date}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-xl md:text-2xl text-nomad-white mb-2 group-hover:text-nomad-magenta transition-colors duration-300">
                      {update.title}
                    </h3>

                    <p className="body-text text-sm mb-4">
                      {update.description}
                    </p>

                    <div className="flex items-center gap-2 text-nomad-magenta text-sm font-medium group-hover:gap-3 transition-all duration-300">
                      Read More
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpdatesSection;
