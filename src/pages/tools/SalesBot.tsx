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

  // The runtime URL - in production this will be your deployed URL
  const runtimeUrl = "/api/copilot/sales-bot";

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