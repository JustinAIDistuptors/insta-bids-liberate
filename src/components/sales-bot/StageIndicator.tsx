import { useCoAgent } from "@copilotkit/react-core";
import { CheckCircle2, Circle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const stages = [
  { id: "understanding", label: "Understanding", description: "Learning about your project" },
  { id: "identify_mvp", label: "MVP Identification", description: "Defining core features" },
  { id: "scoping", label: "Scoping", description: "Detailing requirements" },
  { id: "proposal", label: "Proposal", description: "Creating your custom quote" },
  { id: "closed", label: "Complete", description: "Deal finalized" },
];

export function StageIndicator() {
  const { state } = useCoAgent({
    name: "sales_bot",
    initialState: { current_stage: "understanding" },
  });

  const currentStageIndex = stages.findIndex(s => s.id === state?.current_stage) || 0;

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
      <div className="flex items-center justify-between">
        {stages.map((stage, index) => {
          const isCompleted = index < currentStageIndex;
          const isCurrent = index === currentStageIndex;
          const isUpcoming = index > currentStageIndex;

          return (
            <div key={stage.id} className="flex items-center">
              <div className="relative">
                <div
                  className={cn(
                    "flex flex-col items-center transition-all duration-500",
                    isCurrent && "scale-110"
                  )}
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500",
                      isCompleted && "bg-green-500 text-white",
                      isCurrent && "bg-blue-600 text-white ring-4 ring-blue-200",
                      isUpcoming && "bg-gray-200 text-gray-400"
                    )}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <p
                      className={cn(
                        "text-sm font-medium transition-colors",
                        isCompleted && "text-green-700",
                        isCurrent && "text-blue-700",
                        isUpcoming && "text-gray-400"
                      )}
                    >
                      {stage.label}
                    </p>
                    {isCurrent && (
                      <p className="text-xs text-gray-500 mt-0.5 animate-pulse">
                        {stage.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {index < stages.length - 1 && (
                <div className="mx-4">
                  <ArrowRight
                    className={cn(
                      "w-6 h-6 transition-colors",
                      index < currentStageIndex ? "text-green-500" : "text-gray-300"
                    )}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
