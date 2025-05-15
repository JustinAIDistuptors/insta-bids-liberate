
import { AspectRatio } from "@/components/ui/aspect-ratio";

const TrustIndicators = () => {
  const partners = [
    { name: "Partner 1", logo: "https://via.placeholder.com/150x50?text=Partner+1" },
    { name: "Partner 2", logo: "https://via.placeholder.com/150x50?text=Partner+2" },
    { name: "Partner 3", logo: "https://via.placeholder.com/150x50?text=Partner+3" },
    { name: "Partner 4", logo: "https://via.placeholder.com/150x50?text=Partner+4" },
    { name: "Partner 5", logo: "https://via.placeholder.com/150x50?text=Partner+5" },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="section-container text-center animate-on-scroll">
        <h3 className="text-xl mb-10 text-instabids-dark/60 font-medium">Trusted by partners nationwide</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
          {partners.map((partner, index) => (
            <div 
              key={index} 
              className="hover-lift transition-all"
            >
              <AspectRatio ratio={3/1}>
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="w-full h-full object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all"
                />
              </AspectRatio>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
