import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { DollarSign, TrendingUp } from "lucide-react";

interface BudgetSelectorProps {
  min: number;
  max: number;
  suggested?: number;
  onSelect: (budget: number) => void;
}

export function BudgetSelector({ min, max, suggested, onSelect }: BudgetSelectorProps) {
  const [budget, setBudget] = useState(suggested || Math.floor((min + max) / 2));

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card className="my-4">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <DollarSign className="w-5 h-5" />
          <span>Select Your Budget</span>
        </CardTitle>
        <CardDescription>
          Drag the slider to set your comfortable budget range
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">{formatCurrency(min)}</span>
            <span className="text-2xl font-bold text-blue-600">{formatCurrency(budget)}</span>
            <span className="text-sm text-gray-500">{formatCurrency(max)}</span>
          </div>
          
          <Slider
            value={[budget]}
            onValueChange={(value) => setBudget(value[0])}
            min={min}
            max={max}
            step={Math.floor((max - min) / 100)}
            className="w-full"
          />

          {suggested && (
            <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <p className="text-sm text-blue-700">
                Based on similar projects, we suggest a budget around {formatCurrency(suggested)}
              </p>
            </div>
          )}
        </div>

        <div className="flex space-x-3">
          <Button 
            onClick={() => onSelect(budget)}
            className="flex-1"
          >
            Confirm Budget
          </Button>
          <Button 
            variant="outline"
            onClick={() => setBudget(suggested || Math.floor((min + max) / 2))}
          >
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
