import React, { useEffect, useRef } from "react";

type Status = "idle" | "pending" | "success" | "error";
type Size = "sm" | "md" | "lg" | "xl";

interface AnimatedTickProps {
    status?: Status;
    size?: Size;
    successColor?: string;
    errorColor?: string;
    pendingColor?: string;
    duration?: number;
    className?: string;
    // formAction?: () => void; // For use with useActionState
    isPending?: boolean; // From useActionState
    state?: any; // From useActionState
}

const AnimatedTick: React.FC<AnimatedTickProps> = ({
    status: externalStatus = "idle",
    size = "md",
    successColor = "#10b981",
    errorColor = "#ef4444",
    pendingColor = "#3b82f6",
    duration = 1000,
    className = "",
    // formAction,
    isPending: externalIsPending = false,
    state: actionState,
}) => {
    const pathRef = useRef<SVGPathElement>(null);
    const circleRef = useRef<SVGCircleElement>(null);

    // Determine status based on useActionState props or explicit status prop
    const derivedStatus = externalStatus !== "idle" 
        ? externalStatus 
        : externalIsPending 
        ? "pending" 
        : actionState?.error 
            ? "error" 
            : actionState?.success 
            ? "success" 
            : "idle";

    // Handle animations
    useEffect(() => {
        if (!pathRef.current || !circleRef.current) return;

        const path = pathRef.current;
        const circle = circleRef.current;
        const pathLength = path.getTotalLength();

        // Reset animations
        path.style.strokeDasharray = `${pathLength}`;
        path.style.strokeDashoffset = `${pathLength}`;
        circle.style.strokeDasharray = "0";

        if (derivedStatus === "success") {
            // Animate checkmark
            path.style.animation = `dash ${duration}ms ease-in-out forwards`;
            circle.style.stroke = successColor;
            path.setAttribute("d", "M14.1 27.2l7.1 7.2 16.7-16.8");
        } else if (derivedStatus === "error") {
            // Animate X mark
            path.style.animation = `dash ${duration}ms ease-in-out forwards`;
            circle.style.stroke = errorColor;
            path.setAttribute("d", "M16 16 L36 36 M36 16 L16 36");
        } else if (derivedStatus === "pending") {
            // Animate spinning circle
            circle.style.strokeDasharray = "100";
            circle.style.strokeDashoffset = "100";
            circle.style.animation = `dash ${duration * 2}ms linear infinite, spin ${duration}ms linear infinite`;
            circle.style.stroke = pendingColor;
        } else {
            // Reset to idle
            path.style.animation = "";
            circle.style.animation = "";
            path.setAttribute("d", "M14.1 27.2l7.1 7.2 16.7-16.8");
        }
    }, [derivedStatus, duration, successColor, errorColor, pendingColor]);

    const sizeClasses = {
        sm: "w-5 h-5",
        md: "w-8 h-8",
        lg: "w-12 h-12",
        xl: "w-16 h-16",
    };

    return (
        <svg 
            // type={formAction ? "submit" : "button"}
            // formAction={formAction}
            // disabled={derivedStatus === "pending"}
            className={`inline-flex items-center justify-center focus:outline-none disabled:opacity-75 transition-opacity ${className}`}
            aria-label={derivedStatus}
        >
        <svg
            className={`${sizeClasses[size]} ${derivedStatus === "pending" ? "animate-spin" : ""}`}
            viewBox="0 0 52 52"
        >
            <circle
                ref={circleRef}
                className="text-gray-200 dark:text-gray-600"
                cx="26"
                cy="26"
                r="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
            />
            <path
                ref={pathRef}
                fill="none"
                stroke={derivedStatus === "success" ? successColor : errorColor}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
        </svg>
        </svg>
    );
};

export default AnimatedTick;