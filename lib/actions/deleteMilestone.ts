'use server'

import { db } from "@/database"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const deleteSchema = z.object({
    id: z.string().min(1, 'Missing milestone ID'),
    projectToken: z.string().min(1, 'Missing project ID')
})

export async function deleteMilestone(formData: FormData ) {
    try {
        const parsed = deleteSchema.safeParse({
            id: formData.get('milestoneId'),
            projectToken: formData.get('projectToken'),
        })

        if (!parsed.success) {
            console.error( parsed.error.flatten().fieldErrors)
            return
        }

        const { id, projectToken } = parsed.data
        

        await db.milestone.delete({
            where: { id: id }
        })

        revalidatePath(`/project/${projectToken}`)

        return { 
            success: true,
            message: "Success!"
        }
    } catch (error) {
        return {
            success: false,
            error: 'Marking Step done failed'
        }
    }
}