'use server'

import { db } from "@/database"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const deleteSchema = z.object({
    id: z.string().min(1, 'Missing Step ID'),
    projectToken: z.string().min(1, 'Missing project ID')
})

export async function deleteStep(previousState: unknown, formData: FormData ) {
    try {
        const parsed = deleteSchema.safeParse({
            id: formData.get('stepId'),
            projectToken: formData.get('projectToken'),
        })

        if (!parsed.success) {
            return {
                success: false,
                error: parsed.error.flatten().fieldErrors
            }
        }

        const { id, projectToken } = parsed.data
        

        await db.step.delete({
            where: { id: id }
        })

        revalidatePath(`/project/${projectToken}`)

        return { 
            success: true,
            message: "Step deleted!"
        }
    } catch (error) {
        return {
            success: false,
            error: `deleting step failed: ${error}`
        }
    }
}