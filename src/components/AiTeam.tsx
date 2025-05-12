
import { useEffect, useRef } from "react";

interface AiTeamProps {
  className?: string;
}

const AiTeam: React.FC<AiTeamProps> = ({ className = "" }) => {
  const teamContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = teamContainerRef.current;
    if (!container) return;
    
    // Animation effect for the team
    let animationInterval = setInterval(() => {
      const agents = container.querySelectorAll('.ai-agent');
      
      agents.forEach((agent, index) => {
        setTimeout(() => {
          agent.classList.add('active');
          
          setTimeout(() => {
            agent.classList.remove('active');
          }, 600);
        }, index * 300);
      });
    }, 3000);
    
    return () => clearInterval(animationInterval);
  }, []);

  const agentColors = [
    "text-instabids-teal",
    "text-instabids-turquoise",
    "text-instabids-lightTeal",
    "text-instabids-teal/80"
  ];

  return (
    <div 
      ref={teamContainerRef}
      className={`${className} flex items-center space-x-2`}
    >
      {[0, 1, 2, 3].map((index) => (
        <div 
          key={index} 
          className={`ai-agent transition-all duration-300 ${agentColors[index]}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            className="w-8 h-8 transition-transform duration-300"
          >
            {/* Robot head */}
            <rect x="16" y="8" width="32" height="24" rx="4" fill="currentColor" />
            
            {/* Robot face */}
            <circle cx="24" cy="18" r="3" fill="#f8f8f8" />
            <circle cx="40" cy="18" r="3" fill="#f8f8f8" />
            <rect x="24" y="26" width="16" height="2" rx="1" fill="#f8f8f8" />
            
            {/* Robot body */}
            <rect x="20" y="32" width="24" height="18" rx="2" fill="currentColor" opacity="0.8" />
            
            {/* Robot arms */}
            <rect x="8" y="34" width="12" height="4" rx="2" fill="currentColor" opacity="0.7" />
            <rect x="44" y="34" width="12" height="4" rx="2" fill="currentColor" opacity="0.7" />
            
            {/* Robot legs */}
            <rect x="24" y="50" width="6" height="10" rx="2" fill="currentColor" opacity="0.9" />
            <rect x="34" y="50" width="6" height="10" rx="2" fill="currentColor" opacity="0.9" />
            
            {/* Robot antenna */}
            <line x1="32" y1="4" x2="32" y2="8" stroke="currentColor" strokeWidth="2" />
            <circle cx="32" cy="3" r="2" fill="currentColor" />
          </svg>
        </div>
      ))}

      <style jsx>{`
        .ai-agent {
          transform: translateY(0);
        }
        .ai-agent.active {
          transform: translateY(-5px);
        }
      `}</style>
    </div>
  );
};

export default AiTeam;
