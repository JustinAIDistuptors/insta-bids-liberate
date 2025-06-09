import { CopilotChat } from "@copilotkit/react-ui";
import { useCopilotAction, useCopilotReadable, useCoAgentStateRender } from "@copilotkit/react-core";
import { ServiceCards } from "./generative-ui/ServiceCards";
import { BudgetSelector } from "./generative-ui/BudgetSelector";
import { TimelineSelector } from "./generative-ui/TimelineSelector";
import { ProposalCard } from "./generative-ui/ProposalCard";
import { ContactForm } from "./generative-ui/ContactForm";

interface ChatInterfaceProps {
  threadId: string;
}

export function ChatInterface({ threadId }: ChatInterfaceProps) {
  // Share thread ID with the copilot
  useCopilotReadable({
    description: "Current conversation thread ID",
    value: { threadId },
  });

  // Action: Show available services
  useCopilotAction({
    name: "showServices",
    description: "Display available home improvement services",
    parameters: [
      {
        name: "services",
        type: "object[]",
        description: "List of available services with details",
        required: true,
      },
    ],
    render: ({ args }) => {
      return <ServiceCards services={args.services || []} />;
    },
  });

  // Action: Budget selection
  useCopilotAction({
    name: "selectBudget",
    description: "Help user select their budget range",
    parameters: [
      {
        name: "minBudget",
        type: "number",
        description: "Minimum budget",
        required: true,
      },
      {
        name: "maxBudget",
        type: "number",
        description: "Maximum budget",
        required: true,
      },
      {
        name: "suggestedBudget",
        type: "number",
        description: "Suggested budget based on project",
      },
    ],
    renderAndWaitForResponse: ({ args, respond }) => {
      return (
        <BudgetSelector
          min={args.minBudget || 1000}
          max={args.maxBudget || 100000}
          suggested={args.suggestedBudget}
          onSelect={(budget) => respond({ selectedBudget: budget })}
        />
      );
    },
  });

  // Action: Timeline selection
  useCopilotAction({
    name: "selectTimeline",
    description: "Help user select project timeline",
    parameters: [
      {
        name: "options",
        type: "object[]",
        description: "Timeline options",
        required: true,
      },
    ],
    renderAndWaitForResponse: ({ args, respond }) => {
      return (
        <TimelineSelector
          options={args.options || []}
          onSelect={(timeline) => respond({ selectedTimeline: timeline })}
        />
      );
    },
  });

  // Action: Show proposal
  useCopilotAction({
    name: "showProposal",
    description: "Display the project proposal",
    parameters: [
      {
        name: "proposal",
        type: "object",
        description: "Complete proposal details",
        required: true,
      },
    ],
    renderAndWaitForResponse: ({ args, respond }) => {
      return (
        <ProposalCard
          proposal={args.proposal}
          onAccept={() => respond({ action: "accept" })}
          onRevise={() => respond({ action: "revise" })}
        />
      );
    },
  });

  // Action: Collect contact info
  useCopilotAction({
    name: "collectContact",
    description: "Collect user contact information",
    parameters: [
      {
        name: "projectSummary",
        type: "object",
        description: "Summary of the project",
        required: true,
      },
    ],
    renderAndWaitForResponse: ({ args, respond }) => {
      return (
        <ContactForm
          projectSummary={args.projectSummary}
          onSubmit={(contact) => respond({ contact })}
        />
      );
    },
  });

  // Render agent state changes
  useCoAgentStateRender({
    name: "sales_bot",
    render: ({ state }) => {
      // This can show inline progress or state-specific UI
      if (state?.isAnalyzing) {
        return (
          <div className="flex items-center space-x-2 p-4 bg-blue-50 rounded-lg animate-pulse">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-100" />
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-200" />
            <span className="text-sm text-blue-700 ml-2">Analyzing your requirements...</span>
          </div>
        );
      }
      return null;
    },
  });

  return (
    <div className="flex-1 overflow-hidden">
      <CopilotChat
        className="h-full"
        instructions={`You are the InstaBids Sales Assistant, helping homeowners with their home improvement projects. 
        Current thread: ${threadId}
        
        Guide users through these stages:
        1. Understanding - Learn about their project
        2. MVP Identification - Identify core needs
        3. Scoping - Detail requirements
        4. Proposal - Present pricing
        5. Closed - Finalize deal
        
        Use the available UI actions to create an interactive experience.
        Be friendly, professional, and focus on understanding their needs.`}
        labels={{
          title: "InstaBids Sales Assistant",
          initial: "Hi! I'm here to help you with your home improvement project. What are you looking to get done?",
        }}
      />
    </div>
  );
}