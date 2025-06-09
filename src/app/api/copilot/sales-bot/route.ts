import { CopilotRuntime, OpenAIAdapter } from "@copilotkit/runtime";
import { NextRequest } from "next/server";

export const runtime = "edge";

const SALES_BOT_API_URL = process.env.SALES_BOT_API_URL || "https://instabids-sales-bot-api-67gkc.ondigitalocean.app";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function POST(req: NextRequest) {
  try {
    const { message, threadId } = await req.json();

    // Forward the message to your sales bot API
    const salesBotResponse = await fetch(`${SALES_BOT_API_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        thread_id: threadId || req.headers.get("X-Thread-Id"),
      }),
    });

    if (!salesBotResponse.ok) {
      console.error("Sales bot API error:", await salesBotResponse.text());
      // Fall back to OpenAI if sales bot fails
      const copilotKit = new CopilotRuntime();
      const openaiAdapter = new OpenAIAdapter({ apiKey: OPENAI_API_KEY });
      
      return copilotKit.response(req, openaiAdapter);
    }

    const salesBotData = await salesBotResponse.json();
    
    // Convert sales bot response to CopilotKit format
    return new Response(JSON.stringify({
      message: salesBotData.response || salesBotData.message,
      threadId: salesBotData.thread_id || threadId,
    }), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Runtime error:", error);
    
    // Fallback to OpenAI
    const copilotKit = new CopilotRuntime();
    const openaiAdapter = new OpenAIAdapter({ apiKey: OPENAI_API_KEY });
    
    return copilotKit.response(req, openaiAdapter);
  }
}