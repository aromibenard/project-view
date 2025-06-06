'use server'

import { db } from '@/database';
import { z } from 'zod';
import { nanoid } from 'nanoid';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const createProjectSchema = z.object({
    name: z.string().min(1, "Project name is required"),
    description: z.string().min(1, "Project description is required"),
    userId: z.string().min(1, "User ID is required"),
})

export async function createProject(formData: FormData) {
    const parsedData = createProjectSchema.safeParse({
        name: formData.get('projectName'),
        description: formData.get('description'),
        userId: formData.get('userId'),
    })

    if (!parsedData.success) {
        throw new Error("Invalid form data");
    }

    const { name, description, userId } = parsedData.data

    try {
        const user = await db.user.findUnique({
            where: { clerkId: userId },
        })
    
        if (!user) {
            await db.user.create({
                data: { clerkId: userId }
            })
        }
    
        const publicToken = nanoid(16)
        await db.project.create({
            data: {
                title: name,
                description,
                publicToken,
                userId
            }
        })
        revalidatePath('/dashboard');
    } catch (error) {
        console.error("Error creating project:", error);
    }

    redirect('/dashboard');
}