import { CopilotKit } from "@copilotkit/react-core";
import { CopilotChat } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import { Button } from "@/components/ui/button";
import { Home, MessageSquare, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const SalesBot = () => {
  const navigate = useNavigate();
  const [threadId, setThreadId] = useState<string>("");

  // Generate or retrieve thread ID
  useEffect(() => {
    const storedThreadId = localStorage.getItem("salesbot-thread-id");
    if (storedThreadId) {
      setThreadId(storedThreadId);
    } else {
      const newThreadId = `thread-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("salesbot-thread-id", newThreadId);
      setThreadId(newThreadId);
    }
  }, []);

  const handleNewConversation = () => {
    const newThreadId = `thread-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem("salesbot-thread-id", newThreadId);
    setThreadId(newThreadId);
    window.location.reload(); // Refresh to reset the chat
  };

  const systemPrompt = `You are an expert sales assistant for InstaBids, a platform that connects homeowners with contractors for home improvement projects. Your goal is to guide potential customers through the sales process, understand their needs, and help them get started with InstaBids.

Your conversation should follow this flow:
1. Warm greeting and ask about their home improvement needs
2. Qualify their project (type, timeline, budget range)
3. Explain how InstaBids can help them
4. Address any concerns or objections
5. Guide them to take the next step (create account, post project, etc.)

Be conversational, helpful, and focus on the value InstaBids provides. Use the customer's name when provided, and personalize your responses based on their specific needs.

Key benefits to emphasize:
- Get multiple competitive bids from vetted contractors
- Save time and money
- Quality guarantee on all work
- Simple, transparent process
- Free to post projects`;

  const runtimeUrl = import.meta.env.VITE_COPILOT_RUNTIME_URL || "/api/copilot/sales-bot";

  return (
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
              <MessageSquare className="w-5 h-5 text-primary" />
              <span className="font-semibold">Sales Assistant</span>
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleNewConversation}
            className="gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            New Conversation
          </Button>
        </div>
      </header>

      {/* Chat Container */}
      <div className="flex-1 container mx-auto max-w-4xl p-4">
        <CopilotKit
          runtimeUrl={runtimeUrl}
          headers={{
            "X-Thread-Id": threadId,
          }}
        >
          <div className="h-[calc(100vh-120px)] bg-white rounded-lg shadow-sm overflow-hidden">
            <CopilotChat
              instructions={systemPrompt}
              labels={{
                title: "InstaBids Sales Assistant",
                initial: "Hi! I'm here to help you get started with InstaBids. What kind of home improvement project are you planning?",
              }}
              defaultOpen={true}
              clickOutsideToClose={false}
            />
          </div>
        </CopilotKit>
      </div>
    </div>
  );
};

export default SalesBot;