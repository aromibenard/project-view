import { db } from "@/database";

export async function getProjects(userId: string) {
    try {
        const projects = await db.project.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });

        return projects;
    } catch (error) {
        console.error("Error fetching projects:", error);
        throw new Error("Failed to fetch projects");
    }
}