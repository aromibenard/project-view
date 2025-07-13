'use client';

import { addDays, eachWeekOfInterval, endOfWeek, format, getMonth, parseISO, startOfWeek } from "date-fns";
import { useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { TooltipArrow } from "@radix-ui/react-tooltip";

type HeatMapDay = {
    date: string; // yyyy-MM-dd 
    count: number;
};

export default function HeatMap({ data }: { data: HeatMapDay[]}) {
    const colorScale = (count: number) => {
        if (count === 0) return "bg-gray-200 dark:bg-gray-700"
        if (count < 2) return "bg-purple-200"
        if (count < 4) return "bg-purple-400"
        if (count < 6) return "bg-purple-600"
        return "bg-purple-800"
    }

    const dateMap = Object.fromEntries(data.map(d => [d.date, d.count]))
    const dates = data.map(d => parseISO(d.date))
    const startDate = startOfWeek(dates[0], { weekStartsOn: 0 })
    const endDate = endOfWeek(dates[dates.length - 1], { weekStartsOn: 0 })
    const weeks = eachWeekOfInterval({ start: startDate, end: endDate }, { weekStartsOn: 0 })

    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        const timeout = setTimeout(() => setMounted(true), 50)
        return () => clearTimeout(timeout)
    }, [])

    const weekdayLabels = ["S", "M", "T", "W", "T", "F", "S"]
    const monthLabels: string[] = []
    const monthIndexes: number[] = []

    weeks.forEach((weekStart, i) => {
        const month = getMonth(weekStart)
        if (i === 0 || month !== getMonth(addDays(weekStart, -7))) {
            monthLabels.push(format(weekStart, "MMM"))
            monthIndexes.push(i)
        } else {
            monthLabels.push("")
        }
    })

    return (
    <div className="inline-block p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 mb-6">
        <h1 className="text-purple-700 text-shadow-accent">Project Activity Heatmap</h1>
        <div className="flex text-xs text-gray-500 mb-1 ml-7">
            {monthLabels.map((label, i) => (
            <div key={i} className="w-4 h-4 text-center" style={{ marginLeft: i === 0 ? "0" : "4px" }}>
                {label}
            </div>
            ))}
        </div>

        <div className="flex">
            <div className="flex flex-col text-xs text-gray-400 mr-2">
                {weekdayLabels.map((label, i) =>
                        <div key={i} className="h-4 w-4 mb-1 text-center">
                            {label}
                        </div>
                )}
            </div>

        <div className="flex gap-[4px]">
          {weeks.map((weekStart, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-[4px]">
              {Array.from({ length: 7 }).map((_, dayOffset) => {
                const day = addDays(weekStart, dayOffset)
                const dateStr = format(day, "yyyy-MM-dd")
                const count = dateMap[dateStr] ?? 0

                return (
                    <Tooltip key={dateStr} delayDuration={100}>
                        <TooltipTrigger asChild>
                        <div
                            className={`w-4 h-4 rounded-sm transition-all duration-500 ease-in-out opacity-0 scale-75 ${
                            mounted ? "opacity-100 scale-100" : ""
                            } ${colorScale(count)}`}
                        />
                        </TooltipTrigger>
                        <TooltipContent
                            className="px-2 py-1 rounded bg-black text-white text-xs shadow-md"
                            side="top"
                            sideOffset={5}
                        >
                            {format(day, "MMM d")}: {count} step{count === 1 ? "" : "s"}
                            <TooltipArrow className="fill-black" />
                        </TooltipContent>
                    </Tooltip>
                    )
                })}
                </div>
            ))}
            </div>
        </div>
        </div>
    )
}