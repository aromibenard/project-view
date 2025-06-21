import Project from "@/components/project";
import { auth } from "@clerk/nextjs/server";
import { Suspense } from "react";

export default  async function Page ({ params 

} : { params: Promise<{ token: string }> }) {
    const token = await params
    const { userId } = await auth()

    return (
        <div className="font-[family-name:var(--font-geist-sans)] py-4 px-3">
            <Suspense fallback={<div>Loading...</div>}>
                <Project token={token.token} userId={userId} />
            </Suspense>
        </div>
    );
}