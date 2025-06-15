// components/StepCard.tsx

import { CheckCircle, Circle } from "lucide-react";

export interface Step {
    id: string;
    title: string;
    completed: boolean;
}

export function StepCard({ step, isCurrent }: { step: Step, isCurrent: boolean }) {
    return (
        <div className="relative flex items-start gap-4 mb-6">
        {/* Timeline dot */}
        <div className="flex flex-col items-center">
            <div
            className={`w-4 h-4 rounded-full border-2 ${
                step.completed ? "bg-green-500 border-green-600" : "bg-gray-300"
            }`}
            />
            <div className="h-full w-px bg-gray-400" />
        </div>

        {/* Step content */}
        <div
            className={`rounded-xl p-4 w-full shadow-md ${
            isCurrent ? "bg-sky-100 border border-sky-300" : "bg-white"
            }`}
        >
            <div className="flex justify-between items-center">
            <h4 className={`text-md font-semibold ${step.completed ? "line-through text-gray-400" : ""}`}>
                {step.title}
            </h4>
            {step.completed ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
                <Circle className="w-5 h-5 text-gray-400" />
            )}
            </div>
        </div>
        </div>
    );
}
