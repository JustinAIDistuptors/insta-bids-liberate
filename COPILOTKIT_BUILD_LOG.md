# CopilotKit Sales Bot Build Log

## Project Overview
Building a sales bot tool for InstaBids at `instabids.ai/tools/sales-bot` using CopilotKit.

**Repository**: `github.com/Instabidsai/insta-bids-liberate`
**Backend API**: `https://instabids-sales-bot-api-67gkc.ondigitalocean.app`

## Current Status (Last Updated: Now)

### ✅ Completed
1. **Installed CopilotKit packages** (npm install completed):
   - @copilotkit/react-core
   - @copilotkit/react-ui
   - @copilotkit/runtime

2. **Created folder structure**:
   - `/src/pages/tools/` - For tool pages
   - `/src/components/sales-bot/` - For sales bot components
   - `/src/components/sales-bot/generative-ui/` - For dynamic UI components
   - `/src/lib/copilot-runtime/` - For custom runtime

3. **Created initial files**:
   - `SalesBot.tsx` - Main page component with CopilotKit provider
   - `StageIndicator.tsx` - Visual stage progression (5 stages)
   - `ChatInterface.tsx` - Main chat with generative UI actions
   - `ServiceCards.tsx` - Dynamic service selection UI
   - `BudgetSelector.tsx` - Interactive budget selection

### 🚧 In Progress
- Creating remaining generative UI components
- ✅ Switched to GitHub API - created branch `feature/copilotkit-sales-bot`
- Pushing files directly to GitHub

### 📋 To Do
1. **Complete Generative UI Components**:
   - TimelineSelector.tsx
   - ProposalCard.tsx
   - ContactForm.tsx

2. **Create Runtime**:
   - Custom runtime to connect to sales bot API
   - Handle thread persistence
   - Stream conversation stages

3. **Update Router**:
   - Add route in App.tsx for `/tools/sales-bot`

4. **Create API Proxy**:
   - Set up Vercel API routes for runtime
   - Handle CORS and authentication

5. **Styling**:
   - Import CopilotKit styles
   - Customize theme to match InstaBids brand

## Key Learnings

### CopilotKit Architecture
- **Generative UI**: Actions can render React components dynamically
- **CoAgents**: Perfect for multi-stage conversations like sales process
- **State Management**: useCoAgent for sharing state between app and agent
- **Human-in-the-Loop**: renderAndWaitForResponse for approvals

### Sales Bot Integration Plan
```
User → CopilotKit UI → Custom Runtime → Sales Bot API
         ↓                    ↓              ↓
    Dynamic Components   Thread Mgmt    5 Stages
```

### API Structure Needed
```javascript
// Runtime will proxy to:
POST https://instabids-sales-bot-api-67gkc.ondigitalocean.app/chat
{
  "message": "user input",
  "thread_id": "thread-xxx"
}
```

## Environment Variables Needed
```
VITE_SALES_BOT_API_URL=https://instabids-sales-bot-api-67gkc.ondigitalocean.app
OPENAI_API_KEY=xxx (for CopilotKit runtime)
```

## Next Steps for New Chat
1. Switch to GitHub API for all file operations
2. Complete remaining UI components
3. Create custom runtime
4. Update router
5. Test integration

## Important Notes
- Using Vite (NOT Next.js)
- React Router DOM for routing
- Already has ShadCN UI components
- Need to maintain thread_id across sessions
- 5 stages: understanding, identify_mvp, scoping, proposal, closed

## GitHub Push Strategy
Need to:
1. Get current branch
2. Create new branch for feature
3. Push all files via GitHub API
4. Create PR for review

---
This document should be updated with each conversation to maintain context.