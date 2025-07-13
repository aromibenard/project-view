'use server'

import { db } from "@/database"
import { eachDayOfInterval, endOfDay, format, startOfDay } from "date-fns";

export async function getStepsCompletedCount(projectId: string) {
    try {
        const steps = await db.step.findMany({
            where: {
                projectId,
                completed: true,
            },
            select: {
                id: true,
                completedAt: true,
            }
        })

        if (steps.length === 0) return []

        // 2. Group by day (format yyyy-MM-dd)
        const grouped: Record<string, number> = {};

        for (const step of steps) {
            if (!step.completedAt) continue;
            const date = format(step.completedAt, 'yyyy-MM-dd');
            grouped[date] = (grouped[date] || 0) + 1;
        }

        // Find min and max dates to generate full range
        const allDates = steps.map(s => s.completedAt!).sort((a, b) => a.getTime() - b.getTime());
        const startDate = startOfDay(allDates[0]);
        const endDate = endOfDay(allDates[allDates.length - 1]);

        // Create range of all days between first and last
        const dateRange = eachDayOfInterval({ start: startDate, end: endDate })

        // 5. Map to heatmap-ready format
        const result = dateRange.map(date => {
            const key = format(date, 'yyyy-MM-dd');
            return {
                date: key,
                count: grouped[key] || 0
            };
        });

        return result;

    } catch (error) {
        console.error("Error fetching step completions:", error);
        return [];
    }
}