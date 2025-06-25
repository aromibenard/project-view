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
            subject: `Progress Update: ${milestoneTitle} complete`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background-color: #f9f9f9; border-radius: 8px; padding: 20px; color: #333;">
                    <h2 style="color: #3b82f6;">${projectTitle} – Milestone Progress</h2>
                    <p style="font-size: 18px;"><strong>${milestoneTitle}</strong> is now complete.</p>
                    <div style="margin: 20px 0;">
                        <div style="background: #e5e7eb; border-radius: 999px; height: 10px; width: 100%;">
                            <div style="height: 10px; background: #3b82f6; border-radius: 999px; width: ${100}%;"></div>
                        </div>
                        <p>${totalSteps} out of ${totalSteps} steps completed.</p>
                    </div>
                    <p style="margin-top: 30px; font-size: 14px; color: #888;">You received this update because you're tracking this project. No action is needed.</p>
                </div>
            `,
        })

        return { success: true }
    } catch (error) {
        console.error('Email send error:', error)
        return { success: false, error: 'Failed to send milestone email.' }
    }
}
