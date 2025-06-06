import { Projects } from "@/components/projects";
import { buttonVariants } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link"

export default function Home() {
    return (
        <div className="font-[family-name:var(--font-geist-sans)] py-16 px-3">
            <Link 
                href={'/dashboard/new'}  
                className={`${buttonVariants({ variant: "outline" })} h-[10rem] w-full md:w-[20rem] bg-accent my-4 border-dashed`}
            >
                <div className="flex items-center justify-center h-full space-x-1">
                    <Plus className="h-8 w-8 text-accent-foreground" />
                    <span className="text-accent-foreground">New Project</span>
                </div>
            </Link>
            <Projects />
        </div>
    );
}