import { db } from "@/database";

export async function getProject(token: string) {
    if (!token) {
        throw new Error("Project token is required");
    }

    try {
        const project = await db.project.findUnique({
            where: { publicToken: token },
            include: { user: true },
        });

        if (!project) {
            throw new Error("Project not found");
        }

        return {
            id: project.id,
            title: project.title,
            description: project.description,
            userId: project.userId,
            publicToken: project.publicToken,
        };
    } catch (error) {
        console.error("Error fetching project:", error);
        throw new Error("Failed to fetch project");
    }
}