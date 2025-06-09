import { CopilotRuntime, OpenAIAdapter } from "@copilotkit/runtime";
import OpenAI from "openai";

// Create OpenAI instance
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Create CopilotKit runtime
const copilotKit = new CopilotRuntime();

// Custom action to communicate with sales bot API
copilotKit.addAction({
  name: "forward_to_sales_bot",
  description: "Forward messages to the InstaBids sales bot API",
  parameters: [
    {
      name: "message",
      type: "string",
      description: "The user's message",
      required: true,
    },
    {
      name: "threadId",
      type: "string",
      description: "The conversation thread ID",
      required: true,
    },
  ],
  handler: async ({ message, threadId }) => {
    try {
      const response = await fetch(
        `${process.env.VITE_SALES_BOT_API_URL || 'https://instabids-sales-bot-api-67gkc.ondigitalocean.app'}/chat`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message,
            thread_id: threadId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Sales bot API error: ${response.status}`);
      }

      const data = await response.json();
      
      // Extract the response and any stage information
      return {
        message: data.response || data.message || "I'm processing your request...",
        stage: data.stage || data.current_stage,
        metadata: data.metadata || {},
      };
    } catch (error) {
      console.error('Sales bot error:', error);
      return {
        message: "I apologize, but I'm having trouble connecting to our sales system. Please try again in a moment.",
        error: true,
      };
    }
  },
});

// Add context provider for stage management
copilotKit.addAction({
  name: "update_conversation_stage",
  description: "Update the current conversation stage",
  parameters: [
    {
      name: "stage",
      type: "string",
      description: "The current stage of the sales conversation",
      required: true,
    },
  ],
  handler: async ({ stage }) => {
    // This will be reflected in the UI through the CoAgent state
    return { current_stage: stage };
  },
});

// Vercel Edge Function handler
export default async function handler(req: Request) {
  const { handleRequest } = copilotKit.streamHttpServerResponse({
    serviceAdapter: new OpenAIAdapter({ openai }),
  });

  return handleRequest(req);
}

// Edge runtime configuration for Vercel
export const config = {
  runtime: 'edge',
};