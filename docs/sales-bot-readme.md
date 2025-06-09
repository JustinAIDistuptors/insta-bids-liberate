# InstaBids Sales Bot

Complete sales bot implementation with landing page and CopilotKit-powered chat interface that connects to your existing sales bot API.

## 🚀 Quick Deploy

### 1. Install Dependencies

```bash
npm install @copilotkit/react-core @copilotkit/react-ui @copilotkit/runtime
```

### 2. Environment Variables

Create a `.env` file with just one variable:

```env
SALES_BOT_API_URL=https://instabids-sales-bot-api-67gkc.ondigitalocean.app
```

That's it! No API keys needed - your sales bot already has Anthropic configured.

### 3. Run Locally

```bash
npm run dev
```

Visit:
- Landing Page: `http://localhost:5173/sales-bot`
- Sales Bot Tool: `http://localhost:5173/tools/sales-bot`

## 📍 URLs After Deployment

- **Landing Page**: `https://instabids.ai/sales-bot`
- **Sales Bot Tool**: `https://instabids.ai/tools/sales-bot`

## 🎨 What You Get

### Landing Page Features
- Professional marketing page with conversion-focused copy
- Stats showing 47% higher conversion rate
- Problem/solution narrative
- Multiple CTAs driving to the tool
- Mobile-responsive design

### Sales Bot Tool Features
- **CopilotKit Chat Interface**: Clean, modern chat UI
- **Thread Persistence**: Conversations saved locally
- **New Conversation Button**: Easy reset for new sessions
- **Seamless Integration**: Connects directly to your sales bot API
- **No Additional Keys**: Uses your existing Anthropic-powered bot

## 🔧 How It Works

1. User visits the landing page at `/sales-bot`
2. Clicks "Try Sales Bot Free" to go to `/tools/sales-bot`
3. CopilotKit renders the chat interface
4. Messages are proxied through `/api/copilot/sales-bot` to your DigitalOcean API
5. Your sales bot (with Anthropic) handles the conversation
6. Responses stream back through CopilotKit for a smooth experience

## 🎯 Key Features of CopilotKit Integration

### Generative UI Capabilities
Your sales bot can now generate:
- Interactive pricing calculators
- Service comparison tables
- Booking calendars
- Dynamic forms
- Progress indicators

### Example Response Format
If your sales bot returns structured data, CopilotKit can render it as UI:

```json
{
  "response": "Let me show you our pricing options",
  "ui_component": "pricing_table",
  "data": {
    "packages": [...]
  }
}
```

## 🛠️ Customization

### Update Landing Page Copy
Edit `src/pages/tools/SalesBotLanding.tsx` to change:
- Headlines and value propositions
- Statistics and testimonials
- Feature descriptions

### Modify Chat Interface
Edit `src/pages/tools/SalesBot.tsx` to:
- Change the welcome message
- Adjust styling
- Add custom headers/footers

### Style Updates
All components use Tailwind CSS and shadcn/ui. Update your theme in `tailwind.config.js`.

## 📊 Monitoring

Your sales bot API already has:
- Health endpoint: `GET /health`
- Metrics endpoint: `GET /metrics`

The runtime at `/api/copilot/sales-bot` will log any connection issues.

## 🚢 Deployment

1. **Merge the PR** to main branch
2. **Vercel auto-deploys** (already configured)
3. **No additional setup** needed

## 🐛 Troubleshooting

### "Failed to connect to sales bot"
- Check if your sales bot API is running
- Verify the SALES_BOT_API_URL environment variable
- Check DigitalOcean app logs

### Chat not responding
- Open browser console for errors
- Check Network tab for API calls
- Verify thread_id is being sent

## 🎉 Ready to See It in Action!

Once deployed, your sales bot will have:
- A beautiful landing page to attract visitors
- A powerful AI chat interface
- All the amazing generative UI features from CopilotKit
- Direct integration with your Anthropic-powered backend

No additional API keys needed - just deploy and watch your AI sales assistant come to life!