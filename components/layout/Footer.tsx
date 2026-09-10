import Link from "next/link";
import {Instagram,Youtube,Facebook} from "lucide-react";

// TODO: swap "#" for your real church website URLs once this sits alongside it.
const CHURCH_SITE_URL="#";
const GIVE_URL="#";

export function Footer(){
  return (
    <footer className="border-t border-white/10 bg-[var(--vbc-panel)]">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="text-3xl font-extrabold uppercase tracking-tight">
            <span className="text-white">Vine</span><span className="text-[#ff0000]">Branch</span><span className="text-white">Church</span>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-7 text-white/40">
            Jesus is the vine, we are the branches — revisit every message preached at Vine Branch Church, anytime.
          </p>
          <a href={GIVE_URL} className="mt-6 inline-block rounded-full bg-[#ff0000] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#d90000]">
            Give Now
          </a>
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-[.3em] text-white/40">Explore</p>
          <div className="mt-5 grid gap-3 text-sm text-white/60">
            <Link href="/" className="hover:text-white">Home</Link>
            <Link href="/live" className="hover:text-white">Live</Link>
            <Link href="/series" className="hover:text-white">Series</Link>
            <Link href="/sermons" className="hover:text-white">All Sermons</Link>
            <Link href="/search" className="hover:text-white">Search</Link>
          </div>
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-[.3em] text-white/40">Church</p>
          <div className="mt-5 grid gap-3 text-sm text-white/60">
            <a href={CHURCH_SITE_URL} className="hover:text-white">About</a>
            <a href={CHURCH_SITE_URL} className="hover:text-white">Ministries</a>
            <a href={CHURCH_SITE_URL} className="hover:text-white">Contact</a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1280px] flex-col-reverse items-center gap-4 px-5 py-6 sm:flex-row sm:justify-between sm:px-8">
          <span className="text-xs text-white/30">© {new Date().getFullYear()} Vine Branch Church. All rights reserved.</span>
          <div className="flex items-center gap-4 text-white/40">
            <a href="#" aria-label="Instagram" className="hover:text-white"><Instagram size={17}/></a>
            <a href="#" aria-label="Facebook" className="hover:text-white"><Facebook size={17}/></a>
            <a href="#" aria-label="YouTube" className="hover:text-white"><Youtube size={17}/></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
