
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import ProblemSection from "../components/ProblemSection";
import PainPointsSection from "../components/PainPointsSection";
import MissionSection from "../components/MissionSection";
import GroupBiddingSection from "../components/GroupBiddingSection";
import HowItWorksSection from "../components/HowItWorksSection";
import BenefitsSection from "../components/BenefitsSection";
import CtaSection from "../components/CtaSection";
import Footer from "../components/Footer";

const Index = () => {
  useEffect(() => {
    // Set page title
    document.title = "InstaBids: Unleashing the American Economy";
    
    // Add animation observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll(".animate-on-scroll").forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-instabids-dark text-white">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <PainPointsSection />
      <GroupBiddingSection />
      <MissionSection />
      <HowItWorksSection />
      <BenefitsSection />
      <CtaSection />
      <Footer />
    </div>
  );
};

export default Index;
