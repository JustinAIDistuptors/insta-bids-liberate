
import { useState, useEffect } from "react";

const BidCardStack = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const projects = [
    {
      title: "🏠 Roof Replacement",
      image: "https://images.unsplash.com/photo-1654783864154-cd3ed0e141e7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      price: "$7,500 - $15,000",
    },
    {
      title: "🪵 Deck Installation",
      image: "https://images.unsplash.com/photo-1716904519810-349244919824?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      price: "$3,000 - $10,000",
    },
    {
      title: "🎨 Exterior House Painting",
      image: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      price: "$2,500 - $7,000",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % projects.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [projects.length]);

  return (
    <div className="card-stack relative h-80 md:h-96 w-full max-w-sm mx-auto">
      {projects.map((project, index) => {
        // Calculate the position based on the difference between this card's index and the active index
        const position = (index - activeIndex + projects.length) % projects.length;
        
        return (
          <div
            key={index}
            className="absolute left-0 right-0 mx-auto w-full transition-all duration-500 ease-in-out"
            style={{
              zIndex: projects.length - position,
              transform: `translateY(${position * -10}px) scale(${1 - position * 0.05}) rotate(${position * -2}deg)`,
              opacity: position === 0 ? 1 : (1 - position * 0.2),
            }}
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="relative h-48">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white text-lg font-semibold">{project.title}</h3>
                  <p className="text-white/80 text-sm">{project.price}</p>
                </div>
              </div>
              <div className="p-4 bg-white">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">32 minutes ago</span>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">6 bids</span>
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-sm text-gray-600">Cave Creek, AZ</span>
                  <span className="text-instabids-teal text-sm font-medium">$300-$3,000 saved</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BidCardStack;
