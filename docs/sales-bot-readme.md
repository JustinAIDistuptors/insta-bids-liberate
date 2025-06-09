# InstaBids Sales Bot

This implementation includes a complete sales bot solution with a landing page and CopilotKit-powered chat interface.

## Features

- **Landing Page** (`/sales-bot`): Marketing page that showcases the sales bot capabilities
- **Sales Bot Tool** (`/tools/sales-bot`): Full CopilotKit chat interface
- **Thread Persistence**: Conversations are saved and can be continued
- **Generative UI**: Dynamic UI components generated based on conversation context

## Setup

### 1. Install Dependencies

```bash
npm install @copilotkit/react-core @copilotkit/react-ui @copilotkit/runtime
```

### 2. Environment Variables

Create a `.env` file with:

```env
VITE_COPILOT_RUNTIME_URL=https://instabids.ai/api/copilot/sales-bot
VITE_SALES_BOT_API_URL=https://instabids-sales-bot-api-67gkc.ondigitalocean.app
OPENAI_API_KEY=your-openai-api-key
```

### 3. Routes

The following routes are configured:
- `/sales-bot` - Landing page introducing the sales bot
- `/tools/sales-bot` - The actual sales bot interface

## API Integration

The sales bot expects your backend API at:

```
POST https://instabids-sales-bot-api-67gkc.ondigitalocean.app/chat
{
  "message": "user input",
  "thread_id": "thread-xxx"
}
```

Expected response:
```json
{
  "response": "AI response text",
  "thread_id": "thread-xxx"
}
```

## Customization

### Modify the System Prompt

Edit the `systemPrompt` in `src/pages/tools/SalesBot.tsx` to customize the AI's behavior.

### Update Landing Page Content

Modify `src/pages/tools/SalesBotLanding.tsx` to change the marketing copy, stats, or features.

### Styling

The components use Tailwind CSS and shadcn/ui components. Customize colors by updating your theme configuration.

## Deployment

1. Push to main branch
2. Vercel will automatically deploy
3. Access at:
   - Landing: `https://instabids.ai/sales-bot`
   - Tool: `https://instabids.ai/tools/sales-bot`

## Features Implemented

✅ Full landing page with conversion-focused copy
✅ CopilotKit chat integration
✅ Thread persistence (conversations saved locally)
✅ Responsive design
✅ Clean navigation between landing and tool
✅ Error handling with OpenAI fallback
✅ Custom styling matching InstaBids brand

## Next Steps

1. Connect to production sales bot API
2. Add analytics tracking
3. Implement A/B testing on landing page
4. Add more interactive UI components in chat
5. Set up proper authentication if needed