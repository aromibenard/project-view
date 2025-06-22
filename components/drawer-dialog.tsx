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
import { createStep } from "@/lib/actions/createStep"
import Form from "next/form"
import { createStepHandler } from "@/lib/actions/createStepHandler"

export function AddStep({ id, token }: { id: string, token: string }) {
    const [open, setOpen] = React.useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")

    if (isDesktop) {
        return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
            <Button variant="outline">New Step(s)</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Create new Step(s)</DialogTitle>
                <DialogDescription>
                Add single or multiple steps at once.
                </DialogDescription>
            </DialogHeader>
            <NewStepForm id={id} token={token} />
            </DialogContent>
        </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
            <Button variant="outline">New Step(s)</Button>
        </DrawerTrigger>
        <DrawerContent>
            <DrawerHeader className="text-left">
            <DrawerTitle>Create new Step(s)</DrawerTitle>
            <DrawerDescription>
                Add single or multiple steps at once.
            </DrawerDescription>
            </DrawerHeader>
            <NewStepForm className="px-4" id={id} token={token} />
            <DrawerFooter className="pt-2">
            <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
            </DrawerClose>
            </DrawerFooter>
        </DrawerContent>
        </Drawer>
    )
}

function NewStepForm({ className, id, token }: { className?: string, id: string, token: string }) {
    const [isMultiple, setIsMultiple] = React.useState(false)
    
    return (
        <Form 
            action={isMultiple ? createManySteps : createStep } 
            className={cn("grid items-start gap-6", className)}
        >
            <div className="flex items-center gap-4">
                <Switch 
                    id="multiple-mode" 
                    checked={isMultiple}
                    onCheckedChange={setIsMultiple}
                />
                <Label htmlFor="multiple-mode">Add multiple steps</Label>
            </div>

            {isMultiple ? (
                <div className="grid gap-4">
                    <Label htmlFor="steps">Steps (one per line)</Label>
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
                    <Label htmlFor="title">Step Title</Label>
                    <Input type="text" id="title" name="title" required />
                </div>
            )}
            
            <input type="hidden" value={id} name="milestoneId"/>
            <input type="hidden" value={token} name="projectToken"/>
            
            <SubmitButton
                pendingChildren={<Spinner />}
                text={isMultiple ? "Create Steps" : "Create Step"}
                actionText={isMultiple ? "Creating Steps..." : "Creating Step..."}
            >
                <Plus />
            </SubmitButton>
        </Form>
    )
}