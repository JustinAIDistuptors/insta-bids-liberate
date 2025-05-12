
import { useEffect, useRef } from "react";

const GroupBiddingSection = () => {
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    elementsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      elementsRef.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section className="bg-gradient-to-b from-instabids-darkBlue to-instabids-dark py-20">
      <div className="section-container">
        <div
          ref={(el) => (elementsRef.current[0] = el)}
          className="animate-on-scroll text-center mb-12"
        >
          <h2 className="mb-6">
            Leveraging <span className="text-gradient">Group Bidding</span> Technology
          </h2>
          <p className="text-lg text-instabids-lightGray max-w-3xl mx-auto">
            InstaBids allows homeowners to leverage grouping their jobs together, enabling contractors to bid on clusters of local projects and drive costs down even more.
          </p>
        </div>

        <div
          ref={(el) => (elementsRef.current[1] = el)}
          className="animate-on-scroll"
        >
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-instabids-darkBlue/50 border border-instabids-teal/30 rounded-xl p-6 shadow-lg hover:border-instabids-teal/70 transition-all">
              <div className="w-16 h-16 rounded-full bg-instabids-teal/20 flex items-center justify-center mb-4 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-instabids-teal"
                >
                  <path d="M3 3v18h18" />
                  <path d="m19 9-5 5-4-4-3 3" />
                </svg>
              </div>
              <h3 className="text-xl font-heading mb-3 text-center">Reduced Costs</h3>
              <p className="text-instabids-lightGray">
                Group bidding reduces customer acquisition costs by 90%, allowing contractors to pass savings directly to homeowners.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-instabids-darkBlue/50 border border-instabids-teal/30 rounded-xl p-6 shadow-lg hover:border-instabids-teal/70 transition-all">
              <div className="w-16 h-16 rounded-full bg-instabids-teal/20 flex items-center justify-center mb-4 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-instabids-teal"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="text-xl font-heading mb-3 text-center">Local Communities</h3>
              <p className="text-instabids-lightGray">
                Group bidding strengthens local economies by keeping dollars in the community and supporting small business growth.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-instabids-darkBlue/50 border border-instabids-teal/30 rounded-xl p-6 shadow-lg hover:border-instabids-teal/70 transition-all">
              <div className="w-16 h-16 rounded-full bg-instabids-teal/20 flex items-center justify-center mb-4 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-instabids-teal"
                >
                  <path d="M2 9h3v10h18V9h3" />
                  <path d="m12 14 4-5" />
                  <path d="m8 14 4-5" />
                  <path d="M2 9V6c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v3" />
                  <path d="M14 9V6c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v3" />
                </svg>
              </div>
              <h3 className="text-xl font-heading mb-3 text-center">Increased Efficiency</h3>
              <p className="text-instabids-lightGray">
                Contractors can bid on multiple local jobs at once, eliminating redundant sales meetings and increasing productivity.
              </p>
            </div>
          </div>

          <div 
            ref={(el) => (elementsRef.current[2] = el)}
            className="animate-on-scroll mt-16 max-w-4xl mx-auto bg-gradient-to-r from-instabids-darkBlue/70 to-instabids-dark border border-instabids-teal/20 rounded-xl p-8"
          >
            <h3 className="text-2xl font-heading mb-4 text-center">
              Restarting the American Small Business Dream
            </h3>
            <ul className="space-y-4">
              {[
                "Reduce customer acquisition costs by 90%",
                "Eliminate multiple sales meetings per project",
                "Allow local contractors to bid on grouped jobs",
                "Drive costs down to levels unmatched by any other solution"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="mr-3 mt-1 text-instabids-teal">
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
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <span className="text-lg text-instabids-lightGray">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GroupBiddingSection;
