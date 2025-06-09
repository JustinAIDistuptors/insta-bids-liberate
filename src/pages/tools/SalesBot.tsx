import { CopilotKit } from "@copilotkit/react-core";
import { CopilotChat } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import { useState, useEffect } from "react";
import { StageIndicator } from "@/components/sales-bot/StageIndicator";
import { ChatInterface } from "@/components/sales-bot/ChatInterface";

export default function SalesBot() {
  const [threadId, setThreadId] = useState<string>("");

  useEffect(() => {
    // Get or create thread ID from localStorage
    const storedThreadId = localStorage.getItem("instabids-thread-id");
    if (storedThreadId) {
      setThreadId(storedThreadId);
    } else {
      const newThreadId = `thread-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("instabids-thread-id", newThreadId);
      setThreadId(newThreadId);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Minimal Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <a href="/" className="flex items-center space-x-2 text-gray-900 hover:text-blue-600 transition-colors">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7V12C2 16.5 4.5 20.74 8.5 22.5L12 24L15.5 22.5C19.5 20.74 22 16.5 22 12V7L12 2Z" fill="currentColor"/>
                </svg>
                <span className="font-semibold">InstaBids</span>
              </a>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600">Sales Assistant</span>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => {
                  localStorage.removeItem("instabids-thread-id");
                  window.location.reload();
                }}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                New Conversation
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="pt-16 h-screen">
        {threadId && (
          <CopilotKit runtimeUrl="/api/copilot/sales-bot">
            <div className="h-full max-w-5xl mx-auto px-4 py-6">
              <div className="h-full bg-white rounded-lg shadow-xl overflow-hidden flex flex-col">
                <StageIndicator />
                <ChatInterface threadId={threadId} />
              </div>
            </div>
          </CopilotKit>
        )}
      </main>
    </div>
  );
}