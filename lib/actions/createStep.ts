'use server'

import { db } from "@/database"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { wait } from "../utils"

const stepSchema = z.object({
    milestoneId: z.string().min(1, 'Missing Step ID'),
    projectToken: z.string().min(1, 'Missing project ID'),
    title: z.string().min(1, "Title is required").max(255)
})

export async function createStep(previousState: any, formData: FormData ) {
    try {
        const parsed = stepSchema.safeParse({
            milestoneId: formData.get('milestoneId'),
            projectToken: formData.get('projectToken'),
            title: formData.get('title')
        })

        if (!parsed.success) {
            return {
                success: false,
                error: parsed.error.flatten().fieldErrors,
            }
        }

        const { milestoneId, projectToken, title } = parsed.data
        
        await wait(2000)
        // await db.step.create({
        //     data: {
        //         milestoneId: milestoneId,
        //         title: title
        //     }
        // })

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