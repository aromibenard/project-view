'use server'

import { db } from "@/database";
import { revalidatePath } from "next/cache";
import z from "zod";
import { wait } from "../utils";

const createManyStepsSchema = z.object({
    steps: z.array(
        z.object({
        title: z.string().min(1, "Title is required").max(255),
        milestoneId: z.string().min(1, "Milestone ID is required"),
        })
    ),
    projectToken: z.string().min(1, "Project token is required"),
});

export async function createManySteps(formData: FormData) {
    try {
        const stepsInput = formData.get("steps") as string;
        const milestoneId = formData.get("milestoneId") as string;
        const projectToken = formData.get("projectToken") as string;

        const stepsData = stepsInput
            .split("\n")
            .map((title) => title.trim())
            .filter((title) => title.length > 0)

        const validationData = {
            steps: stepsData.map((title) => ({
                title,
                milestoneId,
            })),
            projectToken,
        }

        const result = createManyStepsSchema.safeParse(validationData);

        if (!result.success) {
            return { 
                error: "Invalid data", details: result.error.flatten(),
                status: 400 
            }
        }

        await wait(4000)

        // await db.step.createMany({
        //     data: result.data.steps,
        //     skipDuplicates: true
        // })

        revalidatePath(`/project/${projectToken}`)


    } catch (error) {
        console.log(error)
        return{
            error: 'Internal Server error'
        }
    }
}