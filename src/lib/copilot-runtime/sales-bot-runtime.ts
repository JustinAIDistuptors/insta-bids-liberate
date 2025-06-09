import { 
  CopilotRuntime, 
  OpenAIAdapter,
  copilotRuntimeNextJSAppRouterEndpoint 
} from "@copilotkit/runtime";
import OpenAI from "openai";

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Create the sales bot action handler
async function salesBotHandler({ message, threadId }: any) {
  try {
    // Forward the message to the sales bot API
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
      throw new Error('Sales bot API error');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Sales bot handler error:', error);
    throw error;
  }
}

// Create the runtime configuration
export const runtime = new CopilotRuntime({
  actions: [
    {
      name: "sales_bot_chat",
      description: "Handle sales bot conversations",
      parameters: [
        {
          name: "message",
          type: "string",
          description: "User message",
          required: true,
        },
        {
          name: "threadId",
          type: "string", 
          description: "Conversation thread ID",
          required: true,
        },
      ],
      handler: salesBotHandler,
    },
  ],
  
  // Configure the language model adapter
  langserve: [
    {
      chainUrl: process.env.VITE_SALES_BOT_API_URL + "/chat",
      name: "sales_bot",
      description: "InstaBids Sales Bot",
    },
  ],
});

// Export the endpoint handler for Vercel/Edge functions
export async function POST(req: Request) {
  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime,
    serviceAdapter: new OpenAIAdapter({ openai }),
    endpoint: "/api/copilot/sales-bot",
  });

  return handleRequest(req);
}

// For development/local use
export default runtime;
