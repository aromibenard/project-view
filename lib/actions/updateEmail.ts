'use server'

import { db } from "@/database"

export async function updateEmail(projectEmail: string, projectId: string) {
    try {
        await db.project.update({
            where: { id: projectId },
            data: { clientEmail: projectEmail }
        })
    } catch (error) {
        console.error(error)
    }
}