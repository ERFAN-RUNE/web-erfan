import { useEffect, useState } from 'react';
import gsap from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false);
        onComplete();
      },
    });

    // Logo animation
    tl.fromTo(
      '.loading-logo',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )
      .to('.loading-logo', {
        opacity: 0,
        y: -20,
        duration: 0.6,
        delay: 1.2,
        ease: 'power3.in',
      })
      .to('.loading-screen', {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
      });
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="loading-screen">
      <div className="loading-logo">
        NOMAD<span>+</span>
      </div>
    </div>
  );
};

export default LoadingScreen;
