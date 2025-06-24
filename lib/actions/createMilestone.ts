'use server'

import { db } from "@/database"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const milestoneSchema = z.object({
    projectId: z.string().min(1),
    projectToken: z.string().min(1),
    title: z.string().min(1)
})

export async function createMilestone(formData: FormData) {
    const parsed = milestoneSchema.safeParse({
        projectId: formData.get('projectId'),
        projectToken: formData.get('projectToken'),
        title: formData.get('title')
    })

    if (!parsed.success) {
        console.error('validation error', parsed.error.flatten().fieldErrors)
        return 
    }

    const { projectId, projectToken, title } = parsed.data

    try {
        await db.milestone.create({
            data: {
                projectId,
                title,
            }
        })

        revalidatePath(`/project/${projectToken}`)
    } catch (error) {
        console.error(error)
        throw error
    } 
}