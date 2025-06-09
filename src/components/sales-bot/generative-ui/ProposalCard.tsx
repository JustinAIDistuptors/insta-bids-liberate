import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, FileText, DollarSign, Clock, Users } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface ProposalItem {
  description: string;
  cost: number;
}

interface Proposal {
  projectName: string;
  summary: string;
  items: ProposalItem[];
  totalCost: number;
  estimatedDuration: string;
  teamSize: number;
  includedFeatures: string[];
  paymentTerms: string;
  validUntil: string;
}

interface ProposalCardProps {
  proposal: Proposal;
  onAccept: () => void;
  onRevise: () => void;
}

export function ProposalCard({ proposal, onAccept, onRevise }: ProposalCardProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card className="my-4 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">{proposal.projectName}</CardTitle>
            <CardDescription className="mt-2">{proposal.summary}</CardDescription>
          </div>
          <FileText className="w-8 h-8 text-blue-600" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        {/* Cost Breakdown */}
        <div>
          <h4 className="font-semibold mb-3">Cost Breakdown</h4>
          <div className="space-y-2">
            {proposal.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600">{item.description}</span>
                <span className="font-medium">{formatCurrency(item.cost)}</span>
              </div>
            ))}
            <Separator className="my-2" />
            <div className="flex justify-between items-center pt-2">
              <span className="font-semibold">Total Project Cost</span>
              <span className="text-xl font-bold text-blue-600">
                {formatCurrency(proposal.totalCost)}
              </span>
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Clock className="w-5 h-5 text-gray-600" />
            <div>
              <p className="text-xs text-gray-500">Duration</p>
              <p className="font-medium">{proposal.estimatedDuration}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Users className="w-5 h-5 text-gray-600" />
            <div>
              <p className="text-xs text-gray-500">Team Size</p>
              <p className="font-medium">{proposal.teamSize} professionals</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <DollarSign className="w-5 h-5 text-gray-600" />
            <div>
              <p className="text-xs text-gray-500">Payment</p>
              <p className="font-medium">{proposal.paymentTerms}</p>
            </div>
          </div>
        </div>

        {/* Included Features */}
        <div>
          <h4 className="font-semibold mb-3">What's Included</h4>
          <div className="space-y-2">
            {proposal.includedFeatures.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Validity */}
        <div className="text-center p-3 bg-yellow-50 rounded-lg">
          <p className="text-sm text-yellow-800">
            This proposal is valid until {proposal.validUntil}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4">
          <Button 
            onClick={onAccept}
            className="flex-1"
            size="lg"
          >
            Accept Proposal
          </Button>
          <Button 
            onClick={onRevise}
            variant="outline"
            size="lg"
            className="flex-1"
          >
            Request Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}