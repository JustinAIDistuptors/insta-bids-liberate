# InstaBids Sales Bot

Complete sales bot implementation with landing page and chat interface that connects directly to your existing sales bot API.

## 🚀 Quick Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Create a `.env` file:

```env
VITE_SALES_BOT_API_URL=https://instabids-sales-bot-api-67gkc.ondigitalocean.app
```

### 3. Run Locally

```bash
npm run dev
```

Visit:
- Landing Page: `http://localhost:8080/sales-bot`
- Sales Bot Chat: `http://localhost:8080/tools/sales-bot`

## 📍 Production URLs

- **Landing Page**: `https://instabids.ai/sales-bot`
- **Sales Bot Chat**: `https://instabids.ai/tools/sales-bot`

## 🎨 Features

### Landing Page
- Professional marketing page
- Conversion-focused copy
- Stats showing 47% higher conversion rate
- Multiple CTAs to the chat tool

### Sales Bot Chat
- **Clean Chat Interface**: Simple, beautiful design
- **Direct API Integration**: Connects straight to your sales bot
- **Thread Persistence**: Conversations saved locally
- **Message History**: Shows full conversation
- **Loading States**: Smooth user experience
- **Error Handling**: Graceful fallbacks

## 🔧 How It Works

1. User visits landing page at `/sales-bot`
2. Clicks "Try Sales Bot Free" to go to `/tools/sales-bot`
3. Messages sent directly to your DigitalOcean API
4. Your Anthropic-powered bot processes and responds
5. Conversation history saved in browser

## 🛠️ Customization

### Update Landing Page
Edit `src/pages/tools/SalesBotLanding.tsx`:
- Change headlines and copy
- Update statistics
- Modify styling

### Customize Chat Interface
Edit `src/pages/tools/SalesBot.tsx`:
- Change welcome message
- Adjust colors (user messages use `bg-primary`)
- Add features

## 📊 API Integration

Your sales bot API at DigitalOcean expects:

```
POST https://instabids-sales-bot-api-67gkc.ondigitalocean.app/chat
{
  "message": "user input",
  "thread_id": "thread-xxx"
}
```

Returns:
```json
{
  "response": "AI response",
  "thread_id": "thread-xxx"
}
```

## 🚢 Deployment

Push to main branch - Vercel auto-deploys!

## 🎉 That's It!

Your sales bot is now live with:
- Beautiful landing page
- Clean chat interface
- Direct connection to your Anthropic AI
- No additional API keys needed

Visit **https://instabids.ai/tools/sales-bot** to see it in action!