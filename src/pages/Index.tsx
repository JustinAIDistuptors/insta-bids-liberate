import React, { useState } from "react";
import { CopilotKit, CopilotChat, useCopilotAction, useCopilotReadable } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import Navbar from "../components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Use the sales bot API backend
const SALES_BOT_API = import.meta.env.VITE_SALES_BOT_API_URL || 'https://instabids-sales-bot-api-67gkc.ondigitalocean.app';

// Custom adapter for sales bot
const salesBotAdapter = {
  process: async (messages: any[], actions: any[]) => {
    try {
      const lastMessage = messages[messages.length - 1];
      const threadId = `instabids-${Date.now()}`;
      
      const response = await fetch(`${SALES_BOT_API}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: lastMessage.content,
          thread_id: threadId,
          context: {
            mode: 'landing-page-ai',
            actions: actions,
            fullConversation: messages
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`API responded with ${response.status}`);
      }

      const data = await response.json();
      
      return {
        content: data.response || data.message || data.content,
        actions: data.actions || []
      };
    } catch (error) {
      console.error('Error connecting to sales bot:', error);
      return {
        content: "I'm having trouble connecting. Please try again.",
        actions: []
      };
    }
  }
};

const Index = () => {
  const [projectDetails, setProjectDetails] = useState<any>({});
  const [quotes, setQuotes] = useState<any[]>([]);
  const [selectedContractor, setSelectedContractor] = useState<any>(null);
  const [bookingStatus, setBookingStatus] = useState<any>(null);
  const [showChat, setShowChat] = useState(false);

  return (
    <CopilotKit adapter={salesBotAdapter}>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Navbar />
        
        {/* Hero Section */}
        <section className="relative pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="text-center text-white mb-12">
              <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                InstaBids AI
              </h1>
              <p className="text-2xl text-purple-200 mb-8 max-w-3xl mx-auto">
                Connect with verified contractors instantly using AI
              </p>
              {!showChat && (
                <Button 
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg"
                  onClick={() => setShowChat(true)}
                >
                  Start Your Project
                </Button>
              )}
            </div>

            {/* Main Content Area with Chat */}
            {showChat && (
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Side - Dynamic UI Components */}
                  <div className="lg:col-span-2 space-y-4">
                    {/* Project Details */}
                    {Object.keys(projectDetails).length > 0 && (
                      <Card className="bg-white/10 backdrop-blur-md border-purple-500/20">
                        <CardHeader>
                          <CardTitle className="text-white">Your Project Details</CardTitle>
                          <CardDescription className="text-purple-200">
                            Here's what we've gathered about your project
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-4">
                            {Object.entries(projectDetails).map(([key, value]) => (
                              <div key={key}>
                                <p className="text-purple-300 text-sm capitalize">
                                  {key.replace(/_/g, ' ')}
                                </p>
                                <p className="text-white font-medium">{value as string}</p>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Contractor Quotes */}
                    {quotes.length > 0 && (
                      <Card className="bg-white/10 backdrop-blur-md border-purple-500/20">
                        <CardHeader>
                          <CardTitle className="text-white">Available Contractors</CardTitle>
                          <CardDescription className="text-purple-200">
                            Compare quotes from verified professionals
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {quotes.map((quote, idx) => (
                              <div 
                                key={idx}
                                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                                  selectedContractor?.id === quote.id 
                                    ? 'border-purple-400 bg-purple-500/20' 
                                    : 'border-purple-500/30 hover:border-purple-400/50'
                                }`}
                                onClick={() => setSelectedContractor(quote)}
                              >
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h4 className="font-semibold text-white">{quote.contractorName}</h4>
                                    <p className="text-sm text-purple-200">{quote.experience}</p>
                                    <div className="flex gap-2 mt-2">
                                      <Badge variant="secondary" className="bg-purple-600/30">
                                        {quote.rating} ⭐
                                      </Badge>
                                      <Badge variant="outline" className="border-purple-400/50 text-purple-200">
                                        {quote.completedJobs} jobs
                                      </Badge>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-2xl font-bold text-purple-300">
                                      ${quote.price}
                                    </p>
                                    <p className="text-sm text-purple-200">{quote.timeline}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Booking Status */}
                    {bookingStatus && (
                      <Card className="bg-white/10 backdrop-blur-md border-purple-500/20">
                        <CardHeader>
                          <CardTitle className="text-white">Booking Progress</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between text-sm mb-2 text-purple-200">
                                <span>{bookingStatus.currentStep}</span>
                                <span>{bookingStatus.progress}%</span>
                              </div>
                              <Progress 
                                value={bookingStatus.progress} 
                                className="bg-purple-900/50"
                              />
                            </div>
                            {bookingStatus.appointmentDate && (
                              <div className="p-3 bg-green-500/20 rounded-lg">
                                <p className="text-sm font-medium text-green-300">
                                  Appointment Scheduled: {bookingStatus.appointmentDate}
                                </p>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>

                  {/* Right Side - Chat Interface */}
                  <div className="lg:sticky lg:top-24">
                    <InnerChat
                      setProjectDetails={setProjectDetails}
                      setQuotes={setQuotes}
                      setBookingStatus={setBookingStatus}
                      selectedContractor={selectedContractor}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </CopilotKit>
  );
};

// Inner component with CopilotKit actions
const InnerChat: React.FC<any> = ({ 
  setProjectDetails, 
  setQuotes, 
  setBookingStatus,
  selectedContractor 
}) => {
  // Make state readable by AI
  useCopilotReadable({
    description: "Selected contractor information",
    value: selectedContractor
  });

  // Dynamic UI Actions
  useCopilotAction({
    name: "updateProjectDetails",
    description: "Update the project details as user shares information",
    parameters: [
      {
        name: "details",
        type: "object",
        description: "Project details like type, size, budget, timeline"
      }
    ],
    handler: ({ details }) => {
      setProjectDetails(prev => ({ ...prev, ...details }));
    }
  });

  useCopilotAction({
    name: "showQuotes",
    description: "Display contractor quotes and pricing",
    parameters: [
      {
        name: "quotes",
        type: "object[]",
        description: "Array of contractor quotes with pricing"
      }
    ],
    handler: ({ quotes }) => {
      setQuotes(quotes);
    }
  });

  useCopilotAction({
    name: "updateBookingStatus",
    description: "Show booking progress and next steps",
    parameters: [
      {
        name: "status",
        type: "object",
        description: "Booking status with progress and current step"
      }
    ],
    handler: ({ status }) => {
      setBookingStatus(status);
    }
  });

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden">
      <CopilotChat
        className="h-[600px]"
        instructions={`You are the InstaBids AI assistant helping homeowners connect with contractors. 
        
        Your process:
        1. Gather project details (use updateProjectDetails as you learn about their project)
        2. Show relevant contractor quotes when appropriate (use showQuotes)
        3. Help them book (use updateBookingStatus)
        
        Be friendly and guide them through finding the perfect contractor.
        
        Start with: "Hi! I'm your InstaBids AI assistant. What kind of home improvement project are you planning?"`}
        labels={{
          title: "InstaBids AI Assistant",
          initial: "Let's find you the perfect contractor..."
        }}
      />
    </div>
  );
};

export default Index;