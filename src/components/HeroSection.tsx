
import { useRef } from "react";
import Button from "./Button";
import BidCardStack from "./BidCardStack";
import RotatingText from "./RotatingText";
import RobotLogo from "./RobotLogo";

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 bg-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50"></div>
      
      {/* Animated background elements */}
      <div className="absolute left-0 top-0 w-96 h-96 bg-instabids-teal/5 rounded-full blur-3xl"></div>
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-instabids-turquoise/5 rounded-full blur-3xl"></div>
      
      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="mb-2 flex items-center justify-center">
            <span className="bg-gradient-to-r from-instabids-teal to-instabids-turquoise inline-block text-transparent bg-clip-text">Insta</span>
            <span className="text-instabids-dark">Bids</span>
            <span className="text-instabids-dark mx-0.5">.</span>
            <RobotLogo size={32} className="mt-1 animate-bounce-slow" />
          </h1>
          
          <div className="h-14 mb-6">
            <RotatingText 
              phrases={[
                "Where AI Actually Saves You Money",
                "Where Neighbors Connect Directly",
                "Where Contractors Bid Without Fees",
                "As Simple As Taking a Picture"
              ]} 
            />
          </div>
          
          <p className="text-xl md:text-2xl text-instabids-dark mb-6 leading-relaxed max-w-3xl mx-auto">
            Connecting homeowners and contractors with 90% less cost using breakthrough AI technology.
          </p>
          
          <p className="text-lg text-instabids-dark/80 mb-10 leading-relaxed max-w-3xl mx-auto">
            It's 2025, and as Americans, we shouldn't be paying corporate giants $250 billion a year to simply connect two neighbors together. That ends today with InstaBids - and it starts with you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">Get Started</Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>

          <div className="mt-16">
            <BidCardStack />
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
            <span className="text-instabids-dark/70 text-sm mb-2">Scroll to discover</span>
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
      </div>
    </section>
  );
};

export default HeroSection;
