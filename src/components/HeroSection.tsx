
import { useEffect, useRef } from "react";
import Button from "./Button";
import BidCardStack from "./BidCardStack";

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (sectionRef.current) {
        // Parallax effect
        sectionRef.current.style.backgroundPositionY = `${scrollY * 0.5}px`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen pt-24 pb-16 flex items-center bg-hero-pattern bg-instabids-darkBlue overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-instabids-dark/90 to-instabids-darkBlue/90"></div>
      
      {/* Animated background elements */}
      <div className="absolute left-0 top-0 w-96 h-96 bg-instabids-teal/20 rounded-full blur-3xl"></div>
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-instabids-turquoise/10 rounded-full blur-3xl"></div>
      
      <div className="section-container relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="mb-6">
              <span className="text-gradient">InstaBids:</span> Unleashing the
              American Economy
            </h1>
            <p className="text-xl md:text-2xl text-instabids-lightGray mb-8 leading-relaxed">
              Cutting out corporate middlemen and returning the American Dream to
              local communities
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button size="lg">Join the Revolution</Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <BidCardStack />
          </div>
        </div>
        
        {/* Mobile BidCardStack - only visible on mobile */}
        <div className="block md:hidden mt-12">
          <BidCardStack />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <span className="text-instabids-lightGray text-sm mb-2">Scroll to discover</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-bounce text-instabids-teal"
          >
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
