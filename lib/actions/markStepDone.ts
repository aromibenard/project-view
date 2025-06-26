'use server'

import { db } from "@/database"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { sendMilestoneEmail } from "./sendMilestoneEmail"

const stepDoneSchema = z.object({
    stepId: z.string().min(1, 'Missing Step ID'),
    projectToken: z.string().min(1, 'Missing project ID'),
    clientEmail: z.string().optional()
})

export async function markStepDone(previousState: unknown, formData: FormData ) {
    try {
        const parsed = stepDoneSchema.safeParse({
            stepId: formData.get('stepId'),
            projectToken: formData.get('projectToken'),
            clientEmail: formData.get('clientEmail')
        })

        if (!parsed.success) {
            return {
                success: false,
                error: parsed.error.flatten().fieldErrors,
            }
        }


        const { stepId, projectToken, clientEmail } = parsed.data
        
        const step = await db.step.update({
            where: { id: stepId },
            data: { completed: true },
            include: { 
                milestone: {
                    include: {
                        steps: true,
                        project: {
                            include: {
                                milestones: {
                                    include: { steps: true }
                                }
                            }
                        },
                    }
                },
            }
        })

        const milestone = step.milestone
        const project = milestone.project

        // evaluate milestone completion
        const allStepsDone = milestone.steps.every(s => s.completed)

        if (allStepsDone && !milestone.completed && !milestone.notificationSentAt) {
            await db.milestone.update({
                where: { id: milestone.id },
                data: {
                    completed: true,
                    completedAt: new Date(),
                    notificationSentAt: new Date()
                }
            })

            await sendMilestoneEmail({
                to: clientEmail ?? 'aromibenard@gmail.com',
                projectTitle: project.title,
                milestoneTitle: milestone.title,
                completedSteps: milestone.steps.length,
                totalSteps: milestone.steps.length,
            })
        }

        revalidatePath(`/project/${projectToken}`)

        return { 
            success: true,
            message: "Success!"
        }
    } catch (error) {
        return {
            success: false,
            error: `Marking Step done failed: ${error}`, 
        }
    }
}