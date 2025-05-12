
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Button from "./Button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-instabids-darker/90 backdrop-blur-lg py-3 shadow-lg"
          : "bg-transparent py-5"
      )}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        <a href="#" className="text-white font-heading text-2xl font-bold">
          <span className="text-instabids-teal">Insta</span>Bids
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <a
            href="#problem"
            className="text-white/80 hover:text-white transition-colors"
          >
            The Problem
          </a>
          <a
            href="#mission"
            className="text-white/80 hover:text-white transition-colors"
          >
            Our Promise
          </a>
          <a
            href="#how-it-works"
            className="text-white/80 hover:text-white transition-colors"
          >
            How It Works
          </a>
          <a
            href="#benefits"
            className="text-white/80 hover:text-white transition-colors"
          >
            Benefits
          </a>
          <Button>Join Now</Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-instabids-darker/95 backdrop-blur-lg">
          <div className="container px-4 mx-auto py-4 flex flex-col space-y-4">
            <a
              href="#problem"
              className="text-white/80 hover:text-white transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              The Problem
            </a>
            <a
              href="#mission"
              className="text-white/80 hover:text-white transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Our Promise
            </a>
            <a
              href="#how-it-works"
              className="text-white/80 hover:text-white transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </a>
            <a
              href="#benefits"
              className="text-white/80 hover:text-white transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Benefits
            </a>
            <Button fullWidth>Join Now</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
