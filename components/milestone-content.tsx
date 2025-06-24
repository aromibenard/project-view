'use client'

import { CheckCircle, Circle, Trash } from "lucide-react"
import { Milestone } from "./milestone"
import { useActionState } from "react"
import Form from "next/form"
import { SubmitButton } from "./submit-button"
import { Spinner } from "./spinner"
import { markStepDone } from "@/lib/actions/markStepDone"
import { AddStep } from "./drawer-dialog"
import { deleteStep } from "@/lib/actions/deleteStep"

export default function MilestoneContent({
    milestone, isOwner, token }: { milestone: Milestone, isOwner: boolean, token: string
}) {
    const [state, formAction, isPending] = useActionState(markStepDone, null)

    return (
        <div className=" pb-4 ml-4">
            <h2 className="text-xl font-bold mb-2">{milestone.title}</h2>
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
                                    <Circle className="w-4 h-4 text-gray-400 mr-2" />
                                )}
                                <span className={`text-sm ${step.completed ? "line-through text-gray-400" : ""}`}>
                                    {step.title}
                                </span>
                            </div>
                            {!step.completed && isOwner && (
                                <div className="flex items-center space-x-4">
                                    <Form action={formAction}>
                                        <input type='hidden' name="stepId" value={step.id} />
                                        <input type='hidden' name="projectToken" value={token} />
                                        <SubmitButton
                                            text="Mark done"
                                            actionText="Marking..🙄"
                                            pendingChildren={<Spinner />}
                                            variant="outline"
                                        >
                                            <CheckCircle />
                                        </SubmitButton>
                                    </Form>
                                    <Form action={deleteStep}>
                                        <input type='hidden' name="stepId" value={step.id} />
                                        <input type='hidden' name="projectToken" value={token} />
                                        <SubmitButton
                                            text="Mark done"
                                            actionText="Marking..🙄"
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