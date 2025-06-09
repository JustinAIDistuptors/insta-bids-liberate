import { CopilotBackend, CustomAdapter } from "@copilotkit/backend";

// Custom adapter to connect to your sales bot API
class SalesBotAdapter extends CustomAdapter {
  async process(request: any) {
    const salesBotUrl = import.meta.env.VITE_SALES_BOT_API_URL || "https://instabids-sales-bot-api-67gkc.ondigitalocean.app";
    
    try {
      const response = await fetch(`${salesBotUrl}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: request.messages?.[request.messages.length - 1]?.content || request.message,
          thread_id: request.threadId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Sales bot API error: ${response.status}`);
      }

      const data = await response.json();
      
      return {
        choices: [{
          message: {
            role: "assistant",
            content: data.response || data.message || data.content
          }
        }]
      };
    } catch (error) {
      console.error("Sales bot adapter error:", error);
      throw error;
    }
  }
}

export const salesBotRuntime = new CopilotBackend({
  adapter: new SalesBotAdapter(),
});