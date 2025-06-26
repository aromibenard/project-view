'use client'

import { CheckCircle, Circle, Trash } from "lucide-react"
import { Milestone } from "./milestone"
import { useActionState, useEffect } from "react"
import Form from "next/form"
import { SubmitButton } from "./submit-button"
import { Spinner } from "./spinner"
import { markStepDone } from "@/lib/actions/markStepDone"
import { AddStep } from "./drawer-dialog"
import { deleteStep } from "@/lib/actions/deleteStep"
import { deleteMilestone } from "@/lib/actions/deleteMilestone"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export default function MilestoneContent({
    milestone, isOwner, token }: { milestone: Milestone, isOwner: boolean, token: string
}) {
    const [markingDonestate, markStepDoneformAction, isMarkingStepDonePending] = useActionState(markStepDone, null)
    const [deleteMilestoneState, deleteMilestoneFormAction, isDeletingMilestonePending] = useActionState(deleteMilestone, null)
    const [deleteStepState, deleteStepFormAction, isDeletingStepPending] = useActionState(deleteStep, null)

    useEffect(() => {
        if(!markingDonestate) return

        if (markingDonestate?.success) {
            toast.success(markingDonestate.message ||'Step updated')
        } else {
            const error = markingDonestate.error;

            if (typeof error === "string") {
                toast.error(`Uh oh 😐: ${error}`);
            } else if (typeof error === "object" && error !== null) {
                // Combine field errors into a string for display
                const fieldErrors = Object.entries(error)
                    .flatMap(([field, messages]) => messages?.map(msg => `${field}: ${msg}`) ?? []);
                
                toast.error(`Validation failed:\n${fieldErrors.join("\n")}`);
            } else {
                toast.error("An unknown error occurred.");
            }
        }
    }, [markingDonestate])

    useEffect(() => {
        if(!deleteMilestoneState) return

        if (deleteMilestoneState?.success) {
            toast.success(deleteMilestoneState.message ||'Step updated')
        } else {
            const error = deleteMilestoneState.error;

            if (typeof error === "string") {
                toast.error(`Uh oh 😐: ${error}`);
            } else if (typeof error === "object" && error !== null) {
                // Combine field errors into a string for display
                const fieldErrors = Object.entries(error)
                    .flatMap(([field, messages]) => messages?.map(msg => `${field}: ${msg}`) ?? []);
                
                toast.error(`Validation failed:\n${fieldErrors.join("\n")}`);
            } else {
                toast.error("An unknown error occurred.");
            }
        }
    }, [deleteMilestoneState])

    useEffect(() => {
        if(!deleteStepState) return

        if (deleteStepState?.success) {
            toast.success(deleteStepState.message ||'Step updated')
        } else {
            const error = deleteStepState.error;

            if (typeof error === "string") {
                toast.error(`Uh oh 😐: ${error}`);
            } else if (typeof error === "object" && error !== null) {
                // Combine field errors into a string for display
                const fieldErrors = Object.entries(error)
                    .flatMap(([field, messages]) => messages?.map(msg => `${field}: ${msg}`) ?? []);
                
                toast.error(`Validation failed:\n${fieldErrors.join("\n")}`);
            } else {
                toast.error("An unknown error occurred.");
            }
        }
    }, [deleteStepState])

    return (
        <div className=" pb-4 ml-4">
            <div className="flex items-center justify-between">
                <h2
                    className={cn(
                        "text-xl font-semibold mb-2",
                        isDeletingMilestonePending ? "animate-pulse text-muted-foreground" : ""
                    )}
                >
                    {milestone.title}
                </h2>
                {isOwner && (
                    <Form action={deleteMilestoneFormAction} className="flex items-center " >
                    <input type="hidden" name="milestoneId" value={milestone.id} />
                    <input type="hidden" name="projectToken" value={token} />
                    <SubmitButton
                        showText={false}
                        pendingChildren={<Spinner />}
                        variant={'ghost'}
                    >
                        <Trash className="" />
                    </SubmitButton>

                </Form>
                )}
            </div>
            <div className="space-y-2">
            {milestone.steps.length >= 1 && milestone.steps.map((step, index) => {
                const isLastStep = index === milestone.steps.length - 1

                return (
                    <div key={step.id}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                {step.completed ? (
                                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                ) : (
                                    <Circle className={cn("w-4 h-4 text-gray-400 mr-2", {
                                        'animate-pulse text-pink-500' : isMarkingStepDonePending
                                    })} />
                                )}
                                <span className={`text-sm transition ${step.completed ? "line-through text-gray-400" : ""}
                                    ${isDeletingStepPending || isMarkingStepDonePending ? 'animate-pulse text-muted-foreground' : ''}
                                `}>
                                    {step.title}
                                </span>
                            </div>
                            {!step.completed && isOwner && (
                                <div className="flex items-center space-x-4">
                                    <Form action={markStepDoneformAction}>
                                        <input type='hidden' name="stepId" value={step.id} />
                                        <input type='hidden' name="projectToken" value={token} />

                                        {typeof markingDonestate?.error === 'object' && markingDonestate.error?.stepId && (
                                            <p className="text-sm text-red-500">
                                                {markingDonestate.error.stepId.join(", ")}
                                            </p>
                                        )}

                                        {typeof markingDonestate?.error === 'object' && markingDonestate.error?.projectToken && (
                                            <p className="text-sm text-red-500">
                                                {markingDonestate.error.projectToken.join(", ")}
                                            </p>
                                        )}

                                        {typeof markingDonestate?.error === 'string' && (
                                            <p className="text-sm text-red-500">{markingDonestate.error}</p>
                                        )}

                                        <SubmitButton
                                            text="Mark done"
                                            actionText="Marking..🙄"
                                            pendingChildren={<Spinner />}
                                            variant="outline"
                                        >
                                            <CheckCircle />
                                        </SubmitButton>
                                    </Form>
                                    <Form action={deleteStepFormAction}>
                                        <input type='hidden' name="stepId" value={step.id} />
                                        <input type='hidden' name="projectToken" value={token} />
                                        <SubmitButton
                                            pendingChildren={<Spinner />}
                                            variant="destructive"
                                            showText={false}
                                        >
                                            <Trash />
                                        </SubmitButton>
                                    </Form>
                                </div>
                            )}
                        </div>

                        {isLastStep && isOwner && (
                            <div className="mt-2">
                                <AddStep id={milestone.id} token={token} />
                            </div>
                        )}
                    </div>
                )
            })}
            {milestone.steps.length < 0.9 && isOwner && (
                <div className="mt-2">
                    <AddStep id={milestone.id} token={token} />
                </div>
            )}
            </div>
        </div>
    )
}