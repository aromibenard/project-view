"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { SubmitButton } from "./submit-button"
import { Spinner } from "./spinner"
import { Plus } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { createManySteps } from "@/lib/actions/createManySteps"
import Form from "next/form"
import { createMilestone } from "@/lib/actions/createMilestone"

export function AddMilestone({ projectId, token }: { projectId: string, token: string }) {
    const [open, setOpen] = React.useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")

    if (isDesktop) {
        return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="hover:border-green-400 hover:cursor-pointer transition-all rounded ml-4 mt-2 border border-dashed px-2 p-4 bg-muted">
                    Add Milestone(s)
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Create Milestone(s)</DialogTitle>
                <DialogDescription>
                Add single or multiple milestones at once.
                </DialogDescription>
            </DialogHeader>
            <NewStepForm projectId={projectId} token={token} />
            </DialogContent>
        </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
            <div className=" rounded ml-4 mt-2 border border-dashed px-2 p-4 bg-muted">
                Add Milestone(s)
            </div>
        </DrawerTrigger>
        <DrawerContent>
            <DrawerHeader className="text-left">
            <DrawerTitle>Create new Milestone(s)</DrawerTitle>
            <DrawerDescription>
                Add single or multiple milestones at once.
            </DrawerDescription>
            </DrawerHeader>
            <NewStepForm className="px-4" projectId={projectId} token={token} />
            <DrawerFooter className="pt-2">
            <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
            </DrawerClose>
            </DrawerFooter>
        </DrawerContent>
        </Drawer>
    )
}

function NewStepForm({ className, projectId, token  }: { className?: string, projectId: string, token: string }) {
    const [isMultiple, setIsMultiple] = React.useState(false)
    
    return (
        <Form 
            action={isMultiple ? createManySteps : createMilestone } 
            className={cn("grid items-start gap-6", className)}
        >
            <div className="flex items-center gap-4">
                <Switch 
                    id="multiple-mode" 
                    checked={isMultiple}
                    onCheckedChange={setIsMultiple}
                />
                <Label htmlFor="multiple-mode">Add multiple milestones</Label>
            </div>

            {isMultiple ? (
                <div className="grid gap-4">
                    <Label htmlFor="steps">Milestones (one per line)</Label>
                    <Textarea 
                        id="steps" 
                        name="steps" 
                        required 
                        placeholder="Enter each step on a new line"
                        rows={5}
                    />
                </div>
            ) : (
                <div className="grid gap-3">
                    <Label htmlFor="title">Milestone Title</Label>
                    <Input type="text" id="title" name="title" required />
                </div>
            )}
            
            <input type="hidden" value={projectId} name="projectId"/>
            <input type="hidden" value={token} name="projectToken"/>
            <SubmitButton
                pendingChildren={<Spinner />}
                text={isMultiple ? "Create Milestones" : "Create Milestone"}
                actionText={isMultiple ? "Creating Milestones..." : "Creating Milestone..."}
            >
                <Plus />
            </SubmitButton>
        </Form>
    )
}