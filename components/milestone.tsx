import { CheckCircle, Circle } from "lucide-react";
import { Step, StepCard } from "./step-card";

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

export function MilestoneSection({ milestone, isLast }: { milestone: Milestone, isLast: boolean }) {
    const progress = calculateProgress(milestone.steps);

    return (
        <div className="flex items-start">
            {/* Milestone progress rectangle with connector */}
            <div className="flex flex-col items-center mr-4">
                <div className="relative w-8 h-32 border border-gray-400 rounded-lg overflow-hidden">
                    <div 
                        className={ `absolute bottom-0 left-0 right-0 ${ 
                            progress <= 25 ? 'bg-gray-400' 
                            : progress <= 49 ? 'bg-lime-400' 
                            : progress <= 75 ? 'bg-green-400'
                            : progress <= 90 ? 'bg-emerald-400'
                            : 'bg-green-700'
                        } transition-all duration-500`}
                        style={{ height: `${progress}%` }}  
                    />
                    {/* <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-bold text-gray-700 dark:text-white/90">{progress}%</span>
                    </div> */}
                </div>
                
                {!isLast && (
                    <div className="w-1 h-8 bg-gray-500"></div>
                )}
            </div>
            
            {/* Milestone content */}
            <div className="flex-1 pt-2">
                <h2 className="text-xl font-bold mb-2">{milestone.title}</h2>
                
                {/* Steps list */}
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
