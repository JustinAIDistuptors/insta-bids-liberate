import React, { useState } from 'react';
import { useCopilotAction, useCopilotReadable, CopilotKit, CopilotChat } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

// Use the sales bot API backend
const SALES_BOT_API = import.meta.env.VITE_SALES_BOT_API_URL || 'https://instabids-sales-bot-api-67gkc.ondigitalocean.app';

// Custom adapter for sales bot
const salesBotAdapter = {
  process: async (messages: any[], actions: any[]) => {
    try {
      const lastMessage = messages[messages.length - 1];
      const threadId = `sales-bot-${Date.now()}`;
      
      const response = await fetch(`${SALES_BOT_API}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: lastMessage.content,
          thread_id: threadId,
          context: {
            mode: 'generative-ui',
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

const SalesBot: React.FC = () => {
  const navigate = useNavigate();
  const [projectDetails, setProjectDetails] = useState<any>({});
  const [quotes, setQuotes] = useState<any[]>([]);
  const [selectedContractor, setSelectedContractor] = useState<any>(null);
  const [bookingStatus, setBookingStatus] = useState<any>(null);

  return (
    <CopilotKit adapter={salesBotAdapter}>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="gap-2"
              >
                <Home className="w-4 h-4" />
                Home
              </Button>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-lg">InstaBids Sales Assistant</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 container mx-auto max-w-7xl p-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-120px)]">
            {/* Left Side - Dynamic UI Components */}
            <div className="lg:col-span-2 space-y-4 overflow-auto">
              {/* Project Details Card */}
              {Object.keys(projectDetails).length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Your Project Details</CardTitle>
                    <CardDescription>Here's what we've gathered about your project</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(projectDetails).map(([key, value]) => (
                        <div key={key}>
                          <p className="text-sm text-gray-500 capitalize">{key.replace(/_/g, ' ')}</p>
                          <p className="font-medium">{value as string}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Quotes/Pricing Table */}
              {quotes.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Contractor Quotes</CardTitle>
                    <CardDescription>Compare prices from verified contractors</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {quotes.map((quote, idx) => (
                        <div 
                          key={idx}
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${
                            selectedContractor?.id === quote.id ? 'border-primary bg-primary/5' : 'hover:border-gray-300'
                          }`}
                          onClick={() => setSelectedContractor(quote)}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold">{quote.contractorName}</h4>
                              <p className="text-sm text-gray-600">{quote.experience}</p>
                              <div className="flex gap-2 mt-2">
                                <Badge variant="secondary">{quote.rating} ⭐</Badge>
                                <Badge variant="outline">{quote.completedJobs} jobs</Badge>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-primary">${quote.price}</p>
                              <p className="text-sm text-gray-500">{quote.timeline}</p>
                            </div>
                          </div>
                          {quote.includes && (
                            <div className="mt-3 text-sm text-gray-600">
                              <p className="font-medium">Includes:</p>
                              <ul className="list-disc list-inside">
                                {quote.includes.map((item: string, i: number) => (
                                  <li key={i}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Booking Status */}
              {bookingStatus && (
                <Card>
                  <CardHeader>
                    <CardTitle>Booking Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>{bookingStatus.currentStep}</span>
                          <span>{bookingStatus.progress}%</span>
                        </div>
                        <Progress value={bookingStatus.progress} />
                      </div>
                      {bookingStatus.nextSteps && (
                        <div>
                          <p className="text-sm font-medium mb-2">Next Steps:</p>
                          <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
                            {bookingStatus.nextSteps.map((step: string, idx: number) => (
                              <li key={idx}>{step}</li>
                            ))}
                          </ol>
                        </div>
                      )}
                      {bookingStatus.appointmentDate && (
                        <div className="p-3 bg-green-50 rounded-lg">
                          <p className="text-sm font-medium text-green-800">
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
            <div className="lg:sticky lg:top-0">
              <InnerChat
                setProjectDetails={setProjectDetails}
                setQuotes={setQuotes}
                setBookingStatus={setBookingStatus}
                selectedContractor={selectedContractor}
              />
            </div>
          </div>
        </div>
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

  // Action: Update project details
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

  // Action: Show contractor quotes
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

  // Action: Update booking status
  useCopilotAction({
    name: "updateBookingStatus",
    description: "Show booking progress and next steps",
    parameters: [
      {
        name: "status",
        type: "object",
        description: "Booking status with progress, current step, and next actions"
      }
    ],
    handler: ({ status }) => {
      setBookingStatus(status);
    }
  });

  // Action: Schedule appointment
  useCopilotAction({
    name: "scheduleAppointment",
    description: "Confirm appointment scheduling",
    parameters: [
      {
        name: "appointment",
        type: "object",
        description: "Appointment details including date, time, and contractor"
      }
    ],
    handler: ({ appointment }) => {
      setBookingStatus({
        currentStep: "Appointment Confirmed",
        progress: 100,
        appointmentDate: appointment.date,
        contractorName: appointment.contractorName,
        nextSteps: ["Contractor will call to confirm", "Prepare your space", "Payment after completion"]
      });
    }
  });

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden h-full">
      <CopilotChat
        className="h-full"
        instructions={`You are the InstaBids sales assistant helping homeowners connect with contractors. 
        
        Your process:
        1. Gather project details (use updateProjectDetails as you learn)
        2. Show relevant contractor quotes (use showQuotes when appropriate)
        3. Help them select a contractor and book (use updateBookingStatus and scheduleAppointment)
        
        Be friendly, professional, and guide them through the entire process. Focus on understanding their needs first.
        
        Start with: "Welcome to InstaBids! I'm here to help you find the perfect contractor for your project. What type of work are you looking to have done?"`}
        labels={{
          title: "InstaBids Assistant",
          initial: "Let's find you the perfect contractor..."
        }}
      />
    </div>
  );
};

export default SalesBot;