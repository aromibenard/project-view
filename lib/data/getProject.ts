import { db } from "@/database";

export async function getProject(token: string) {
    if (!token) {
        throw new Error("Project token is required");
    }

    try {
        const project = await db.project.findUnique({
            where: { publicToken: token },
            include: { 
                user: true,
                milestones: { 
                    include: { steps: true }
                }
            },
        });

        if (!project) {
            throw new Error("Project not found");
        }

        return project
    } catch (error) {
        console.error("Error fetching project:", error);
        throw new Error("Failed to fetch project");
    }
}