# Agents Made Easy - AI Transformation Consultant

## Overview
"Agents Made Easy" is a dynamic AI consultation tool that helps business owners discover how custom AI agents can transform their operations. It features a conversational interface powered by CopilotKit that dynamically generates UI components as it learns about the user's business.

## Live URL
- Production: https://instabids.ai/agents-made-easy
- Local: http://localhost:8080/agents-made-easy

## Features
- **Dynamic UI Generation**: Cards and components appear in real-time as the AI discovers information
- **Business Discovery**: Collects and displays business information
- **Pain Point Analysis**: Identifies and visualizes opportunities for AI automation
- **Custom Agent System Design**: Proposes complete AI agent systems with ROI calculations
- **CTA Integration**: Direct link to Calendly for implementation calls

## Technical Implementation

### Frontend (This Repository)
- **Route**: `/agents-made-easy`
- **Component**: `src/pages/tools/AgentsMadeEasy.tsx`
- **Dependencies**: 
  - `@copilotkit/react-ui` (v1.8.14)
  - `@copilotkit/react-core` (v1.8.14)

### Backend Integration
- **API Endpoint**: `https://instabids-sales-bot-api-67gkc.ondigitalocean.app/chat`
- **Required Context**: The frontend sends `context.mode: 'agents-made-easy'` with each request
- **Thread ID Format**: `agents-made-easy-{timestamp}`

### CopilotKit Actions
The AI can trigger these actions to update the UI:

1. **updateBusinessInfo**
   - Updates business details (industry, size, challenges)
   - Populates the Business Overview card

2. **addPainPoint**
   - Adds discovered opportunities/pain points
   - Each includes title, description, and impact level

3. **proposeAgentSystem**
   - Displays complete agent system proposal
   - Shows agents, expected impact, investment, and ROI timeline

## Installation & Setup

### Prerequisites
- Node.js & npm installed
- Access to the Instabids GitHub repository

### Local Development
```bash
# Clone the repository
git clone https://github.com/Instabidsai/insta-bids-liberate.git

# Navigate to project
cd insta-bids-liberate

# Checkout the agents-made-easy branch
git checkout agents-made-easy

# Install dependencies
npm install

# Start development server
npm run dev

# Visit http://localhost:8080/agents-made-easy
```

### Environment Variables
Create a `.env` file with:
```
VITE_SALES_BOT_API_URL=https://instabids-sales-bot-api-67gkc.ondigitalocean.app
```

## User Flow
1. User lands on hero page with gradient background
2. Clicks "Start Your AI Transformation Journey" button
3. Chat interface appears on the right
4. As conversation progresses, cards appear on the left:
   - Business Overview (company details)
   - Discovered Opportunities (pain points)
   - Your Custom AI Agent System (proposed solution)
5. After system proposal, CTA button appears for scheduling

## Styling
- **Color Scheme**: Purple/Pink gradients on dark slate background
- **Effects**: Glassmorphism, hover animations, gradient text
- **Layout**: Responsive grid, sticky chat on desktop

## Backend Requirements
The backend needs to handle the `agents-made-easy` mode by:
1. Recognizing `context.mode: 'agents-made-easy'`
2. Providing consultant-style responses
3. Triggering the appropriate CopilotKit actions
4. Maintaining conversation context for the discovery process

## Deployment
- Automatically deploys via Vercel when pushed to main
- PR #2 contains the complete implementation
- No additional configuration needed for Vercel

## Testing
1. Click the CTA button to start
2. Answer questions about your business
3. Watch cards populate dynamically
4. Verify all three action types work
5. Test the final CTA button

## Known Issues
- Backend currently doesn't differentiate between sales-bot and agents-made-easy modes
- Custom adapter error handling could be improved
- Mobile layout needs optimization

## Future Enhancements
- Add more visualization types
- Implement progress indicator
- Add email capture before Calendly redirect
- Create admin view for collected leads
