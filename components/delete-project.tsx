'use client'

import Form from "next/form"
import { SubmitButton } from "./submit-button"
import { Spinner } from "./spinner"
import { Trash } from "lucide-react"
import { deleteProject } from "@/lib/actions/deleteproject"

export default function DeleteProjectForm({ projectId }: { projectId: string }) {

    return (
        <Form action={deleteProject}  >
            <input 
                type="hidden"
                name="projectId"
                value={projectId}
            />
            <SubmitButton 
                showText={false}
                variant={"ghost"}
                pendingChildren={<Spinner />}
                className="text-red-400/90 hover:text-red-500/90"
            >
                <Trash />
            </SubmitButton>
        </Form>
    )
}