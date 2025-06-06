import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] py-18 px-3">
      <Link href="/dashboard" className={buttonVariants({ variant: "default" })}> 
        Get Started 
      </Link>
    </div>
  )
}
