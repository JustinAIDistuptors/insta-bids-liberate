
import { useEffect, useRef, useState } from "react";

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
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
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
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Set up automatic cycling
    intervalRef.current = setInterval(() => {
      setActiveCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
    }, 4000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Apply visual effects to cards based on their position relative to active card
    cardRefs.current.forEach((card, index) => {
      if (card) {
        const diff = getPositionDiff(index, activeCardIndex, cards.length);
        
        // Transform properties based on position
        const translateY = diff * -10;
        const translateZ = diff * -20;
        const opacity = diff === 0 ? 1 : Math.max(0.5 - Math.abs(diff) * 0.1, 0.2);
        const scale = 1 - Math.abs(diff) * 0.05;
        
        card.style.transform = `
          perspective(1000px)
          translateY(${translateY}px)
          translateZ(${translateZ}px)
          scale(${scale})
        `;
        card.style.opacity = String(opacity);
        card.style.zIndex = String(cards.length - Math.abs(diff));
      }
    });
  }, [activeCardIndex]);

  // Calculate the position difference between two cards in a circular manner
  const getPositionDiff = (index: number, activeIndex: number, total: number) => {
    const diff = index - activeIndex;
    if (diff > total / 2) return diff - total;
    if (diff < -total / 2) return diff + total;
    return diff;
  };

  return (
    <div className="card-stack relative w-full max-w-md h-[400px] mx-auto">
      {cards.map((card, index) => (
        <div
          key={card.id}
          ref={(el) => (cardRefs.current[index] = el)}
          className="absolute top-0 left-0 w-full bg-gradient-to-br from-instabids-darkBlue to-instabids-darker border border-instabids-teal/30 rounded-xl overflow-hidden shadow-xl transition-all duration-500"
          style={{
            transform: `translateY(${index * -10}px) translateZ(${index * -20}px)`,
            zIndex: cards.length - index,
            opacity: index === 0 ? 1 : Math.max(0.8 - index * 0.1, 0.5),
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
            <p className="text-white text-sm mb-3">{card.description}</p>
            <div className="flex justify-between text-xs">
              <span className="text-white">{card.location}</span>
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
