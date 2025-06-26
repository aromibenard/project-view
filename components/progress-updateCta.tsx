"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { updateEmail } from "@/lib/actions/updateEmail"

export function ProgressUpdateCTA({ projectId }: { projectId: string }) {
    const [submitted, setSubmitted] = useState(false)
    const [email, setEmail] = useState("")

    useEffect(() => {
        const hasSubmitted = localStorage.getItem(`progress_submitted_${projectId}`)
        if (hasSubmitted) setSubmitted(true)
    }, [projectId])

    const handleSubmit = async () => {
        if (!email) return

        await updateEmail(email, projectId)        

        localStorage.setItem(`progress_submitted_${projectId}`, "true")
        setSubmitted(true)
    }

    if (submitted) return null

    return (
        <div className="my-8 p-4 border rounded-md bg-muted/50">
        <p className="text-sm mb-2">Get notified of progress updates? Leave your email:</p>
        <div className="flex items-center gap-2">
            <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <Button onClick={handleSubmit}>Notify me</Button>
        </div>
        </div>
    )
}
