'use server'

import { db } from "@/database"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const schema = z.object({
    projectId: z.string().min(1, "Project ID is required")
})

export async function deleteProject(formData: FormData) {
    const parsed = schema.safeParse({
        projectId: formData.get("projectId")
    })

    console.log('rnning')

    if (!parsed.success) {
        console.error(parsed.error.flatten().fieldErrors)
        return 
    }

    console.log('parsed')

    const { projectId } = parsed.data;

    try {
        await db.project.delete({
            where: { id: projectId }
        })

        revalidatePath('/dashboard')
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "An unexpected error occurred")
    }
}