
import { useEffect, useRef } from "react";

interface RobotLogoProps {
  size?: number;
  color?: string;
  className?: string;
}

const RobotLogo: React.FC<RobotLogoProps> = ({ 
  size = 24, 
  color = "white",
  className = "" 
}) => {
  const robotRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    const robot = robotRef.current;
    if (!robot) return;
    
    // Gentle bouncing animation
    const bounceAnimation = () => {
      robot.style.transform = "translateY(-2px)";
      
      setTimeout(() => {
        if (robot) robot.style.transform = "translateY(0px)";
      }, 500);
    };
    
    // Set initial animation
    bounceAnimation();
    
    // Continue animation at intervals
    const bounceInterval = setInterval(bounceAnimation, 2000);
    
    return () => clearInterval(bounceInterval);
  }, []);

  return (
    <svg
      ref={robotRef}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform duration-500 inline-block ${className}`}
    >
      {/* Robot head - simplified for logo use */}
      <rect x="3" y="4" width="18" height="12" rx="2" fill="none" />
      <circle cx="9" cy="9" r="1" fill={color} stroke="none" />
      <circle cx="15" cy="9" r="1" fill={color} stroke="none" />
      <path d="M9 13h6" />
      <path d="M12 16v5" />
      <path d="M8 16l-2 3" />
      <path d="M16 16l2 3" />
      <path d="M12 4v-2" />
      <circle cx="12" cy="1" r="1" />
    </svg>
  );
};

export default RobotLogo;
