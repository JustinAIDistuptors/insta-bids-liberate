import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimelineOption {
  id: string;
  label: string;
  duration: string;
  description: string;
  urgency: "low" | "medium" | "high";
  recommended?: boolean;
}

interface TimelineSelectorProps {
  options: TimelineOption[];
  onSelect: (timeline: string) => void;
}

const urgencyIcons = {
  low: Calendar,
  medium: Clock,
  high: Zap,
};

const urgencyColors = {
  low: "text-green-600 bg-green-50",
  medium: "text-yellow-600 bg-yellow-50",
  high: "text-red-600 bg-red-50",
};

export function TimelineSelector({ options, onSelect }: TimelineSelectorProps) {
  return (
    <div className="space-y-3 my-4">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold">When would you like to start?</h3>
        <p className="text-sm text-gray-600">Select your preferred timeline</p>
      </div>
      
      {options.map((option) => {
        const Icon = urgencyIcons[option.urgency];
        
        return (
          <Card
            key={option.id}
            className={cn(
              "cursor-pointer hover:shadow-md transition-all",
              option.recommended && "ring-2 ring-blue-500"
            )}
            onClick={() => onSelect(option.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={cn("p-2 rounded-lg", urgencyColors[option.urgency])}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{option.label}</CardTitle>
                    <CardDescription className="text-sm">{option.duration}</CardDescription>
                  </div>
                </div>
                {option.recommended && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    Recommended
                  </span>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-600">{option.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}