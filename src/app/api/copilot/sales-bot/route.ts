import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const SALES_BOT_API_URL = process.env.SALES_BOT_API_URL || "https://instabids-sales-bot-api-67gkc.ondigitalocean.app";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Extract thread ID from headers or body
    const threadId = req.headers.get("X-Thread-Id") || body.threadId || `thread-${Date.now()}`;
    
    // Forward to your sales bot API
    const response = await fetch(`${SALES_BOT_API_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: body.message || body.query || body.content,
        thread_id: threadId,
      }),
    });

    if (!response.ok) {
      console.error("Sales bot API error:", response.status, await response.text());
      return NextResponse.json(
        { error: "Sales bot API error" },
        { status: response.status }
      );
    }

    // Stream the response if it's SSE
    const contentType = response.headers.get("content-type");
    if (contentType?.includes("text/event-stream")) {
      // Pass through the SSE stream
      return new Response(response.body, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          "Connection": "keep-alive",
        },
      });
    }

    // Handle JSON response
    const data = await response.json();
    return NextResponse.json({
      content: data.response || data.message || data.content,
      threadId: data.thread_id || threadId,
    });
  } catch (error) {
    console.error("Runtime error:", error);
    return NextResponse.json(
      { error: "Failed to connect to sales bot" },
      { status: 500 }
    );
  }
}