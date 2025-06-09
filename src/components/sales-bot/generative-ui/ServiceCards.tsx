import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

interface Service {
  id: string;
  name: string;
  description: string;
  features: string[];
  priceRange: string;
  popular?: boolean;
}

interface ServiceCardsProps {
  services: Service[];
}

export function ServiceCards({ services }: ServiceCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
      {services.map((service) => (
        <Card 
          key={service.id} 
          className={`hover:shadow-lg transition-all duration-300 cursor-pointer ${
            service.popular ? 'ring-2 ring-blue-500' : ''
          }`}
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{service.name}</CardTitle>
              {service.popular && (
                <Badge className="bg-blue-500 text-white">Popular</Badge>
              )}
            </div>
            <CardDescription>{service.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {service.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
              <div className="pt-2 mt-2 border-t">
                <p className="text-sm font-medium text-gray-600">
                  Price Range: <span className="text-gray-900">{service.priceRange}</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
