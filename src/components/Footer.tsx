
const Footer = () => {
  return (
    <footer className="bg-instabids-darker py-16">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <a href="#" className="text-white font-heading text-2xl font-bold inline-block mb-4">
              <span className="text-instabids-teal">Insta</span>Bids
            </a>
            <p className="text-instabids-gray mb-6 max-w-md">
              InstaBids is liberating the American economy from corporate middlemen, empowering contractors and homeowners to connect directly.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-instabids-lightGray hover:text-instabids-teal transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="text-instabids-lightGray hover:text-instabids-teal transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="#" className="text-instabids-lightGray hover:text-instabids-teal transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="text-instabids-lightGray hover:text-instabids-teal transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-heading mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-instabids-gray hover:text-instabids-teal transition-colors">Home</a>
              </li>
              <li>
                <a href="#problem" className="text-instabids-gray hover:text-instabids-teal transition-colors">The Problem</a>
              </li>
              <li>
                <a href="#mission" className="text-instabids-gray hover:text-instabids-teal transition-colors">Our Promise</a>
              </li>
              <li>
                <a href="#how-it-works" className="text-instabids-gray hover:text-instabids-teal transition-colors">How It Works</a>
              </li>
              <li>
                <a href="#benefits" className="text-instabids-gray hover:text-instabids-teal transition-colors">Benefits</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-heading mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="text-instabids-gray">
                <span className="block">Email:</span>
                <a href="mailto:info@instabids.com" className="text-instabids-teal hover:underline">info@instabids.com</a>
              </li>
              <li className="text-instabids-gray">
                <span className="block">Phone:</span>
                <a href="tel:1-800-555-BIDS" className="text-instabids-teal hover:underline">1-800-555-BIDS</a>
              </li>
              <li className="text-instabids-gray mt-4">
                <button className="bg-transparent border border-instabids-teal text-instabids-teal hover:bg-instabids-teal/10 px-4 py-2 rounded-md transition-colors">
                  Contact Support
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-instabids-darkBlue">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-instabids-gray text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} InstaBids. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-instabids-gray text-sm hover:text-instabids-teal transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-instabids-gray text-sm hover:text-instabids-teal transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-instabids-gray text-sm hover:text-instabids-teal transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
