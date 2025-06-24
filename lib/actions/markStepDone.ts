'use server'

import { db } from "@/database"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { wait } from "../utils"

const stepDoneSchema = z.object({
    stepId: z.string().min(1, 'Missing Step ID'),
    projectToken: z.string().min(1, 'Missing project ID'),
})

export async function markStepDone(previousState: any, formData: FormData ) {
    try {
        const parsed = stepDoneSchema.safeParse({
            stepId: formData.get('stepId'),
            projectToken: formData.get('projectToken')
        })

        if (!parsed.success) {
            return {
                success: false,
                error: parsed.error.flatten().fieldErrors,
            }
        }


        const { stepId, projectToken } = parsed.data
        await db.step.update({
            where: { id: stepId },
            data: { completed: true }
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