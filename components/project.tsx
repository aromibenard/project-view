import { use } from "react";

export default function Project({ tokenPromise }: { tokenPromise: Promise<{ token: string }> }) {
    const token = use(tokenPromise);
    
    return (
        <div className="font-[family-name:var(--font-geist-sans)] py-16 px-3">
            {token.token}
        </div>
    );
}