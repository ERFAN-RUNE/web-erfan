import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle, Gamepad2, Youtube, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.footer-content',
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 85%',
            end: 'top 60%',
            scrub: 0.3,
          },
        }
      );

      gsap.fromTo(
        '.footer-link',
        { y: 10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 0.3,
          },
        }
      );
    }, footer);

    return () => ctx.revert();
  }, []);

  const links = [
    {
      label: 'Discord',
      icon: MessageCircle,
      href: 'https://discord.gg/Ymgds4TEVv',
    },
    {
      label: 'Roblox Group',
      icon: Gamepad2,
      href: 'https://www.roblox.com/groups/32670228/NOMAD',
    },
    {
      label: 'YouTube',
      icon: Youtube,
      href: '#',
    },
    {
      label: 'Contact',
      icon: Mail,
      href: 'mailto:hello@nomadplus.studio',
    },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative bg-nomad-black-lifted z-[100] border-t border-nomad-magenta/20"
    >
      {/* Neon Glow at Top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-nomad-magenta to-transparent" />

      {/* Content */}
      <div className="footer-content px-[7vw] py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Brand */}
          <div>
            <h3 className="font-display font-black text-4xl text-nomad-white mb-2">
              NOMAD<span className="text-nomad-green">+</span>
            </h3>
            <p className="font-body text-nomad-gray mb-4">
              Crafting worlds. Creating stories.
            </p>
            <a
              href="mailto:hello@nomadplus.studio"
              className="text-nomad-magenta hover:text-nomad-magenta-light transition-colors text-sm"
            >
              hello@nomadplus.studio
            </a>
          </div>

          {/* Right: Links */}
          <div className="flex flex-wrap gap-6 md:justify-end">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={
                  link.href.startsWith('http')
                    ? 'noopener noreferrer'
                    : undefined
                }
                className="footer-link flex items-center gap-2 text-nomad-gray hover:text-nomad-white transition-colors"
              >
                <link.icon size={18} />
                <span className="text-sm">{link.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom: Copyright */}
        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <p className="text-sm text-nomad-gray">
            &copy; 2026 NOMAD+ — All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
