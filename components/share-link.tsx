"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils"; // Utility to combine classes (optional)
import { usePathname, useSearchParams } from "next/navigation";

interface ShareLinkProps {
    link?: string;
    className?: string;
}

export const ShareLink: React.FC<ShareLinkProps> = ({ link, className }) => {
    const [copied, setCopied] = useState(false);

    const pathname = usePathname()
    const searchParams = useSearchParams()

    const query = searchParams.toString(); // ?tab=profile
    const fullPath = `${pathname}${query ? `?${query}` : ""}`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(link ?? fullPath);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    };

    return (
        <div
            className={cn(
                "flex items-center my-4 justify-between gap-2 border rounded-xl p-3 shadow-sm bg-muted text-muted-foreground max-w-full",
                className
            )}
        >
        <div className="truncate text-sm font-medium">{link ?? fullPath}</div>
        <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            className="shrink-0"
        >
            {copied ? (
            <Check className="w-4 h-4 text-green-500 transition-all" />
            ) : (
            <Copy className="w-4 h-4" />
            )}
        </Button>
        </div>
    );
};
