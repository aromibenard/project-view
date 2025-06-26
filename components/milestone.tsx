import { Step } from "./step-card";
import MilestoneContent from "./milestone-content";
import { AddMilestone } from "./add-milestone";

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
    milestone, isLast, userId, projectUserId, token, projectId
} : { milestone: Milestone; isLast: boolean, userId: string | null , projectUserId: string, token: string, projectId: string  }) {
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

            <div>
                {/* Content column */}
                <MilestoneContent 
                    milestone={milestone} 
                    isOwner={isOwner}
                    token={token} 
                />
                {isLast && isOwner && (
                    <AddMilestone token={token} projectId={projectId} />
                )}
            </div>
        </div>
    );
}