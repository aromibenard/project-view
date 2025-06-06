import { getProjects } from "@/lib/data/getProjects";
import { auth } from "@clerk/nextjs/server";

export async function Projects() {
    const { userId } = await auth()
    if (!userId) {
        return (
            <div className="font-[family-name:var(--font-geist-sans)] py-16 px-3">
                <p>Please sign in to view your projects.</p>
            </div>
        );
    }

    const projects = await getProjects(userId)

    return (
        <div className="grid md:grid-cols-3 gap-4">
            {projects.map((project) => (
                <div key={project.id} className="border p-4 rounded-md">
                    <h2 className="text-lg font-semibold">{project.title}</h2>
                    <p className="text-sm text-gray-600">{project.description}</p>
                    <a href={`/project/${project.publicToken}`} className="text-blue-500 hover:underline mt-2 block">
                        View Project
                    </a>
                </div>
            ))}
        </div>
    )
}