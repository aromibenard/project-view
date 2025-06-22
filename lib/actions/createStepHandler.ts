'use server'

import { createManySteps } from "./createManySteps"
import { createStep } from "./createStep"

export async function createStepHandler(formData: FormData) {
    const isMultiple = formData.get("isMultiple") === "true"

    if (isMultiple) {
        return await createManySteps(formData)
    } else {
        return await createStep('', formData)
    }
}