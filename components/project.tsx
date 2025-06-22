import { getProject } from "@/lib/data/getProject";
import { MilestoneSection } from "./milestone";
import { calculateProjectProgress } from "@/lib/utils";

// Mock project
const project = {
    id: "proj_01HS5XK3W4E9Q2Z1Y3N7P8G6T",
    title: "E-Commerce Website Redesign",
    description: "Complete redesign of our online store with modern UI and improved checkout flow",
    publicToken: "pub_01HS5XK3W4E9Q2Z1Y3N7P8G6T",
    isPublic: true,
    userId: "user_2fJk4L9qXzY7wV1bA3cD5eF6g",
    createdAt: new Date("2024-02-15T09:30:00Z"),
    updatedAt: new Date("2024-02-20T14:45:00Z"),
    milestones: [
        {
        id: "mil_01HS5XK3W5E9Q2Z1Y3N7P8G6T",
        title: "Discovery & Planning",
        order: 1,
        projectId: "proj_01HS5XK3W4E9Q2Z1Y3N7P8G6T",
        steps: [
            {
            id: "step_01HS5XK3W6E9Q2Z1Y3N7P8G6T",
            title: "Conduct user research",
            completed: true,
            milestoneId: "mil_01HS5XK3W5E9Q2Z1Y3N7P8G6T"
            },
            {
            id: "step_01HS5XK3W7E9Q2Z1Y3N7P8G6T",
            title: "Create project roadmap",
            completed: true,
            milestoneId: "mil_01HS5XK3W5E9Q2Z1Y3N7P8G6T"
            },
            {
            id: "step_01HS5XK3W8E9Q2Z1Y3N7P8G6T",
            title: "Define KPIs",
            completed: false,
            milestoneId: "mil_01HS5XK3W5E9Q2Z1Y3N7P8G6T"
            }
        ]
        },
        {
        id: "mil_01HS5XK3W9E9Q2Z1Y3N7P8G6T",
        title: "UI/UX Design",
        order: 2,
        projectId: "proj_01HS5XK3W4E9Q2Z1Y3N7P8G6T",
        steps: [
            {
            id: "step_01HS5XK3WAE9Q2Z1Y3N7P8G6T",
            title: "Create wireframes",
            completed: true,
            milestoneId: "mil_01HS5XK3W9E9Q2Z1Y3N7P8G6T"
            },
            {
            id: "step_01HS5XK3WBE9Q2Z1Y3N7P8G6T",
            title: "Design style guide",
            completed: false,
            milestoneId: "mil_01HS5XK3W9E9Q2Z1Y3N7P8G6T"
            },
            {
            id: "step_01HS5XK3WCE9Q2Z1Y3N7P8G6T",
            title: "Create high-fidelity mockups",
            completed: false,
            milestoneId: "mil_01HS5XK3W9E9Q2Z1Y3N7P8G6T"
            }
        ]
        },
        {
        id: "mil_01HS5XK3WDE9Q2Z1Y3N7P8G6T",
        title: "Development",
        order: 3,
        projectId: "proj_01HS5XK3W4E9Q2Z1Y3N7P8G6T",
        steps: [
            {
            id: "step_01HS5XK3WEE9Q2Z1Y3N7P8G6T",
            title: "Setup development environment",
            completed: false,
            milestoneId: "mil_01HS5XK3WDE9Q2Z1Y3N7P8G6T"
            },
            {
            id: "step_01HS5XK3WFE9Q2Z1Y3N7P8G6T",
            title: "Implement homepage",
            completed: false,
            milestoneId: "mil_01HS5XK3WDE9Q2Z1Y3N7P8G6T"
            },
            {
            id: "step_01HS5XK3WGE9Q2Z1Y3N7P8G6T",
            title: "Build checkout flow",
            completed: false,
            milestoneId: "mil_01HS5XK3WDE9Q2Z1Y3N7P8G6T"
            }
        ]
        }
    ],
    user: {
        clerkId: "user_2fJk4L9qXzY7wV1bA3cD5eF6g",
        // ... other user fields
    }
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



export default async function Project({ token, userId }: { token: string , userId: string | null }) {
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
                        userId={userId}
                        projectUserId={project.userId}
                    />
                ))
            ) : (
                <p>add milestone</p>
            )}
        </div>
    )
}