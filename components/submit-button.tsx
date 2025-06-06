'use client'

import { useFormStatus } from "react-dom"
import { Button } from "./ui/button"

export function SubmitButton({ 
    text, 
    actionText , 
    className, 
    disabled,
    variant, 
    children
}: { 
    text?: string, 
    actionText?: string, 
    className?: string, 
    disabled?: boolean,
    variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined, 
    children?: React.ReactNode 
}) {
    const { pending }= useFormStatus()
    return (
        <Button variant={variant} type="submit" className={`${className}`} disabled={pending || disabled}>
            <SubmitButtonContent text={text} actionText={actionText}>
                {children}
            </SubmitButtonContent>
        </Button>
    )
}

function SubmitButtonContent({ 
    text, actionText, children 
}: { 
    text?: string, 
    actionText?: string, 
    children?: React.ReactNode 
}) {
    const { pending } = useFormStatus()
    return (
        <>
            {pending ? actionText || 'Submitting...' : text || "Submit"}
            {children}
        </>
    )
}