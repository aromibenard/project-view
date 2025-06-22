import { CheckCircle, Circle } from "lucide-react";
import { Step } from "./step-card";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/database";

export interface Milestone {
    id: string;
    title: string;
    steps: Step[];
}

function calculateProgress(steps: Step[]): number {
    if (!steps.length) return 0;
    const completed = steps.filter((s) => s.completed).length;
    return Math.round((completed / steps.length) * 100);
}

export async function MilestoneSection({ 
    milestone, isLast, userId, projectUserId
} : { milestone: Milestone; isLast: boolean, userId: string | null , projectUserId: string  }) {
    const progress = calculateProgress(milestone.steps);
    let isOwner = false

    console.log(userId, projectUserId)
    
    if(userId && userId === projectUserId ) isOwner = true

    console.log(isOwner)

    return (
        <div className="grid grid-cols-[auto_1fr] gap-x-4">
        {/* Progress bar column */}
        <div className="relative flex flex-col items-center h-full">
            {/* Progress track (full height) */}
            <div className="absolute top-0 w-8 h-full flex flex-col items-center">
            {/* Progress bar container */}
            <div className="w-8 h-full border border-gray-200 rounded-lg overflow-hidden relative">
                {/* Progress fill */}
                <div
                className={`absolute bottom-0 left-0 right-0 ${
                    progress <= 25
                    ? "bg-gray-400"
                    : progress <= 49
                    ? "bg-lime-400"
                    : progress <= 75
                    ? "bg-green-400"
                    : progress <= 90
                    ? "bg-emerald-400"
                    : "bg-green-700"
                } transition-all duration-500`}
                style={{ height: `${progress}%` }}
                />
            </div>
            
            {/* Connector line (if not last milestone) */}
            {!isLast && (
                <div className="w-1 h-8 bg-gray-500 flex-grow-0" />
            )}
            </div>
        </div>

        {/* Content column */}
        <div className=" pb-4 ml-4">
            <h2 className="text-xl font-bold mb-2">{milestone.title}</h2>
            <div className="space-y-2">
            {milestone.steps.map((step) => (
                <div key={step.id} className="flex items-center">
                {step.completed ? (
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                ) : (
                    <Circle className="w-4 h-4 text-gray-400 mr-2" />
                )}
                <span className={`text-sm ${step.completed ? "line-through text-gray-400" : ""}`}>
                    {step.title}
                </span>
                </div>
            ))}
            </div>
        </div>
        </div>
    );
}