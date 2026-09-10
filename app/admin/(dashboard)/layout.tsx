import Link from "next/link";
import Image from "next/image";
import {LogOut} from "lucide-react";
import {signOut} from "@/app/admin/actions";

export default function AdminLayout({children}:{children:React.ReactNode}){
  return (
    <div className="min-h-screen bg-[var(--vbc-black)] text-white">
      <header className="flex items-center justify-between border-b border-white/10 px-6 py-4">
        <Link href="/admin" className="flex items-center gap-3">
          <Image src="/images/brand/vine-branch-tv-logo-cropped.png" alt="Vine Branch TV" width={747} height={576} className="h-7 w-auto"/>
          <span className="vbc-display text-xl">Admin</span>
        </Link>
        <form action={signOut}>
          <button type="submit" className="flex items-center gap-2 text-sm font-semibold text-white/50 hover:text-white">
            <LogOut size={15}/> Log out
          </button>
        </form>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
    </div>
  );
}
