'use client'

import { useFormStatus } from "react-dom"
import { Button } from "./ui/button"

export function SubmitButton({ 
    text, 
    actionText , 
    className, 
    disabled,
    variant, 
    children,
    pendingChildren,
    showText = true
}: { 
    text?: string, 
    actionText?: string, 
    className?: string, 
    disabled?: boolean,
    variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined, 
    children?: React.ReactNode,
    pendingChildren?: React.ReactNode,
    showText?: boolean 
}) {
    const { pending } = useFormStatus()

    const hasChildren = !!children
    const hasPendingChildren = !!pendingChildren

    const content = pending
        ? (
            <>
                {showText && (actionText || "Submitting...")}
                {hasPendingChildren ? pendingChildren : hasChildren ? children : null}
            </>
        )
        : (
            <>
                {showText && (text || "Submit")}
                {hasChildren && children}
            </>
        )

    return (
        <Button 
            variant={variant} 
            type="submit" 
            className={className} 
            disabled={pending || disabled}
        >
            {content}
        </Button>
    )
}