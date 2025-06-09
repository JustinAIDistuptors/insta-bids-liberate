import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, MessageSquare, Zap, TrendingUp, Users, Clock, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SalesBotLanding = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <div className="text-2xl font-bold text-primary">InstaBids AI</div>
          <Button 
            onClick={() => navigate("/tools/sales-bot")}
            className="bg-primary hover:bg-primary/90"
          >
            Try Sales Bot Free
          </Button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Sales Assistant</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Your AI Sales Assistant That Actually Closes Deals
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Transform your sales process with an AI that guides homeowners through the entire journey—from initial inquiry to closed deal—in one seamless conversation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => navigate("/tools/sales-bot")}
              className="bg-primary hover:bg-primary/90 text-lg px-8"
            >
              Start Selling Now <ArrowRight className="ml-2" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            >
              See How It Works
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">47%</div>
            <div className="text-sm text-gray-600">Higher Conversion Rate</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">3x</div>
            <div className="text-sm text-gray-600">Faster Response Time</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">$2.3M</div>
            <div className="text-sm text-gray-600">Additional Revenue</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">92%</div>
            <div className="text-sm text-gray-600">Customer Satisfaction</div>
          </Card>
        </div>
      </section>

      {/* Problem Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Traditional Sales Is Broken
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="font-semibold mb-2">Slow Response Times</h3>
              <p className="text-gray-600">Customers wait hours or days for replies, leading to lost opportunities</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="font-semibold mb-2">Inconsistent Messaging</h3>
              <p className="text-gray-600">Different reps give different answers, confusing potential customers</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="font-semibold mb-2">Missed Opportunities</h3>
              <p className="text-gray-600">Leads fall through the cracks without proper follow-up</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="container mx-auto px-4 py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            AI That Sells Like Your Best Rep
          </h2>
          
          <div className="space-y-6">
            {[
              {
                title: "Instant Engagement",
                description: "Responds to inquiries in seconds, not hours"
              },
              {
                title: "Qualification & Discovery",
                description: "Asks the right questions to understand customer needs"
              },
              {
                title: "Personalized Solutions",
                description: "Recommends the perfect service package for each customer"
              },
              {
                title: "Objection Handling",
                description: "Addresses concerns with proven responses that convert"
              },
              {
                title: "Seamless Close",
                description: "Guides customers to book appointments or make purchases"
              }
            ].map((step, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Not Just Chat—It's Generative UI
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6">
              <MessageSquare className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Dynamic Conversations</h3>
              <p className="text-gray-600">
                The AI adapts its approach based on customer responses, creating a natural sales flow
              </p>
            </Card>
            
            <Card className="p-6">
              <Zap className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Interactive Elements</h3>
              <p className="text-gray-600">
                Shows pricing calculators, service comparisons, and booking calendars right in the chat
              </p>
            </Card>
            
            <Card className="p-6">
              <TrendingUp className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Real-Time Analytics</h3>
              <p className="text-gray-600">
                Track conversion rates, popular objections, and optimize your sales process
              </p>
            </Card>
            
            <Card className="p-6">
              <CheckCircle2 className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Seamless Handoff</h3>
              <p className="text-gray-600">
                When needed, the AI smoothly transfers qualified leads to human sales reps
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 bg-primary/5">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to 3x Your Sales Conversions?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join hundreds of businesses using AI to transform their sales process
          </p>
          <Button 
            size="lg"
            onClick={() => navigate("/tools/sales-bot")}
            className="bg-primary hover:bg-primary/90 text-lg px-8"
          >
            Try Sales Bot Free <ArrowRight className="ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-gray-600">
        <p>&copy; 2025 InstaBids AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default SalesBotLanding;