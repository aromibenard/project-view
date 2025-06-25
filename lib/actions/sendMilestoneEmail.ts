'use server'

import { transporter } from '@/lib/mail'

export async function sendMilestoneEmail({
    to,
    projectTitle,
    milestoneTitle,
    completedSteps,
    totalSteps,
}: {
    to: string
    projectTitle: string
    milestoneTitle: string
    completedSteps: number
    totalSteps: number
}) {
    try {
        await transporter.sendMail({
            from: `"Project Updates" <${process.env.SMTP_USER}>`,
            to,
            subject: `Progress Update: ${milestoneTitle}`,
            html: `
                <h2>${projectTitle} – ${milestoneTitle}</h2>
                <p>${completedSteps} of ${totalSteps} steps completed.</p>
                <p>Keep it up!</p>
            `,
        })

        return { success: true }
    } catch (error) {
        console.error('Email send error:', error)
        return { success: false, error: 'Failed to send milestone email.' }
    }
}
