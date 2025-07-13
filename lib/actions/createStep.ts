'use server'

import { db } from "@/database"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const stepSchema = z.object({
    milestoneId: z.string().min(1, 'Missing Step ID'),
    projectToken: z.string().min(1, 'Missing project ID'),
    title: z.string().min(1, "Title is required").max(255),
    projectId: z.string().min(1, 'Missing project ID')
})

export async function createStep(formData: FormData ) {
    try {
        console.log('running')
        const parsed = stepSchema.safeParse({
            milestoneId: formData.get('milestoneId'),
            projectToken: formData.get('projectToken'),
            title: formData.get('title'),
            projectId: formData.get('projectId')
        })
        console.log('1')

        if (!parsed.success) {
            console.log(parsed.error.flatten().fieldErrors)
            return
            // return {
            //     success: false,
            //     error: parsed.error.flatten().fieldErrors,
            // }
        }

        console.log('2')

        const { milestoneId, projectToken, title, projectId } = parsed.data

        await db.step.create({
            data: {
                milestoneId: milestoneId,
                title: title,
                projectId
            }
        })

        revalidatePath(`/project/${projectToken}`)

        // return { 
        //     success: true,
        //     message: "Success!"
        // }
    } catch (error) {
        console.error(error)
        return
        // return {
        //     success: false,
        //     error: `Marking Step done failed: ${error}`
        // }
    }
}