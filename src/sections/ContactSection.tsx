import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle, Mail, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-content',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 0.3,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-nomad-black z-[90] py-24"
    >
      {/* Soft Field Background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(255, 45, 143, 0.2), rgba(7, 7, 8, 0) 50%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 px-[7vw]">
        <div className="contact-content max-w-4xl mx-auto text-center">
          <span className="label-mono">Get In Touch</span>
          <h2 className="heading-section mt-4 mb-6">
            JOIN THE
            <br />
            <span className="text-gradient">MOVEMENT</span>
          </h2>

          <p className="body-text max-w-lg mx-auto mb-10">
            Become part of NOMAD+. Connect, collaborate, and build the future of
            digital worlds together.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() =>
                window.open('https://discord.gg/Ymgds4TEVv', '_blank')
              }
              className="btn-primary flex items-center gap-2 text-lg py-5 px-10"
            >
              <MessageCircle size={20} />
              Join Discord Community
            </button>
            <button
              onClick={() =>
                (window.location.href = 'mailto:hello@nomadplus.studio')
              }
              className="btn-secondary flex items-center gap-2"
            >
              <Mail size={18} />
              Send Email
            </button>
          </div>

          {/* Contact Form */}
          <div className="glass rounded-4xl p-8 max-w-xl mx-auto">
            <p className="font-display font-bold text-lg text-nomad-white mb-6">
              Or send us a message
            </p>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-nomad-white placeholder:text-nomad-gray focus:outline-none focus:border-nomad-magenta/50 transition-colors"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-nomad-white placeholder:text-nomad-gray focus:outline-none focus:border-nomad-magenta/50 transition-colors"
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-nomad-white placeholder:text-nomad-gray focus:outline-none focus:border-nomad-magenta/50 transition-colors"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-nomad-white placeholder:text-nomad-gray focus:outline-none focus:border-nomad-magenta/50 transition-colors resize-none"
              />
              <button
                type="submit"
                className="btn-primary w-full flex items-center justify-center gap-2"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Message sent! We will get back to you soon.');
                }}
              >
                <Send size={18} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
