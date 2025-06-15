import { getProject } from "@/lib/data/getProject";
import { MilestoneSection } from "./milestone";
import { calculateProjectProgress } from "@/lib/utils";

// Mock project
const project = {
    title: "Launch Website",
    milestones: [
        {
        id: "m1",
        title: "Design Phase",
        steps: [
            { id: "s1", title: "Wireframes", completed: true },
            { id: "s2", title: "Design System", completed: true },
            { id: "s3", title: "High-fidelity UI", completed: false },
        ],
        },
        {
        id: "m2",
        title: "Development Phase",
        steps: [
            { id: "s4", title: "Set up repo", completed: true },
            { id: "s5", title: "Implement homepage", completed: false },
        ],
        },
    ],
};

function ProgressBar({ progress, segments }: { progress: number; segments: number }) {
    return (
        <div className="flex items-center w-full space-x-2.5  "> 
            <div className="flex items-end h-10 border rounded-md mb-4 w-full">
                {Array.from({ length: segments }).map((_, i) => {
                    const start = (i / segments) * 100;
                    const end = ((i + 1) / segments) * 100;
                    const isFullyFilled = progress >= end;
                    const isPartiallyFilled = progress > start && progress < end;

                    let fillHeight = 0;
                    if (isFullyFilled) fillHeight = 100;
                    else if (isPartiallyFilled) fillHeight = ((progress - start) / (end - start)) * 100;

                    return (
                        <div key={i} className="flex-1 h-full bg-gray-300 dark:bg-gray-600 relative overflow-hidden border">
                            <div
                                className={`absolute bottom-0 left-0 w-full  ${ 
                                progress <= 25 ? 'bg-gray-400' 
                                : progress <= 49 ? 'bg-lime-400' 
                                : progress <= 75 ? 'bg-green-400'
                                : progress <= 90 ? 'bg-emerald-400'
                                : 'bg-green-700'
                            }`}
                                style={{ height: `${fillHeight}%` }}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}



export default async function Project({ token }: { token: string  }) {
    // const project = await getProject(token)
    const progress = calculateProjectProgress(project)
    
    return (
        <div className="font-[family-name:var(--font-geist-sans)] py-16 px-3 flex flex-col">
            <span className="text-gray-500 font-extrabold my-4 text-2xl flex items-center justify-between">
                <h1>{project.title}</h1>
                <h1 className={` ${ 
                    progress <= 25 ? 'text-gray-400' 
                    : progress <= 49 ? 'text-lime-400' 
                    : progress <= 75 ? 'text-green-400'
                    : progress <= 90 ? 'text-emerald-400'
                    : 'text-green-700'
                }`}>{Math.round(progress)}%</h1>
            </span>

            <ProgressBar  progress={progress} segments={25} />

            {project.milestones.length > 1 ? (
                project.milestones.map((milestone, index) => (
                    <MilestoneSection 
                        key={milestone.id} 
                        milestone={milestone} 
                        isLast={ index === project.milestones.length - 1 }
                    />
                ))
            ) : (
                <p>add milestone</p>
            )}
        </div>
    )
}