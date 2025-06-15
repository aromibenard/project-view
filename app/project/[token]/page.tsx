import Project from "@/components/project";
import { Suspense } from "react";

export default function Page ({ params 

} : { params: Promise<{ token: string }> }) {
    const tokenPromise = params
    return (
        <div className="font-[family-name:var(--font-geist-sans)] py-16 px-3">
            <Suspense fallback={<div>Loading...</div>}>
                <Project tokenPromise={tokenPromise} />
            </Suspense>
        </div>
    );
}