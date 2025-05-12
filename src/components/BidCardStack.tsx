
import { useEffect, useRef } from "react";

interface BidCard {
  id: number;
  image: string;
  title: string;
  description: string;
  location: string;
  priceRange: string;
}

const cards: BidCard[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    title: "Bathroom Renovation",
    description: "Complete master bathroom remodel with custom shower",
    location: "Austin, TX",
    priceRange: "$8,000 - $12,000",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    title: "Kitchen Remodel",
    description: "Modern kitchen upgrade with new cabinets and countertops",
    location: "Denver, CO",
    priceRange: "$15,000 - $25,000",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1591588582259-ae5657eeef82?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    title: "Deck Installation",
    description: "New 400 sq ft composite deck with railing",
    location: "Charlotte, NC",
    priceRange: "$7,000 - $10,000",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    title: "Roof Replacement",
    description: "Full roof replacement for 2,200 sq ft home",
    location: "Portland, OR",
    priceRange: "$8,500 - $14,000",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1562684750-0553aea78845?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    title: "Exterior Painting",
    description: "Full exterior home painting with premium paint",
    location: "Tampa, FL",
    priceRange: "$4,000 - $7,000",
  },
];

const BidCardStack = () => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      // Calculate distance from center (normalized)
      const moveX = (clientX - centerX) / centerX * 5;
      const moveY = (clientY - centerY) / centerY * 5;

      // Apply different movements to each card to create depth
      cardRefs.current.forEach((card, index) => {
        if (card) {
          const depth = 0.5 + (index * 0.15); // Reduced depth factor for tighter stack
          const rotateY = moveX * depth;
          const rotateX = -moveY * depth;
          const translateZ = index * -8 - 5; // Reduced Z-distance for tighter stack
          
          card.style.transform = `
            perspective(1000px)
            rotateY(${rotateY}deg)
            rotateX(${rotateX}deg)
            translateZ(${translateZ}px)
            translateY(${index * -10}px)
          `;
        }
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="card-stack relative w-full max-w-md h-[400px] mx-auto">
      {cards.map((card, index) => (
        <div
          key={card.id}
          ref={(el) => (cardRefs.current[index] = el)}
          className="absolute top-0 left-0 w-full bg-gradient-to-br from-instabids-darkBlue to-instabids-darker border border-instabids-teal/30 rounded-xl overflow-hidden shadow-xl transition-all duration-300"
          style={{
            transform: `translateY(${index * -10}px) translateZ(${
              index * -8 - 5
            }px)`,
            zIndex: cards.length - index,
          }}
        >
          <div className="relative h-44">
            <div className="absolute inset-0 bg-gradient-to-t from-instabids-dark to-transparent z-10"></div>
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <h4 className="font-heading text-xl mb-1">{card.title}</h4>
            <p className="text-instabids-lightGray text-sm mb-3">{card.description}</p>
            <div className="flex justify-between text-xs">
              <span className="text-instabids-gray">{card.location}</span>
              <span className="text-instabids-teal font-semibold">
                {card.priceRange}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BidCardStack;
