"use client";

import Link from "next/link";
import Image from "next/image";
import {Search} from "lucide-react";
import {useRouter} from "next/navigation";
import {useState} from "react";

export function MobileTopBar(){
  const router=useRouter();
  const [q,setQ]=useState("");

  function onSubmit(e:React.FormEvent){
    e.preventDefault();
    router.push(q.trim()?`/search?q=${encodeURIComponent(q.trim())}`:"/search");
  }

  return (
    <div className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-white/10 bg-[var(--vbc-black)]/90 px-4 backdrop-blur-xl lg:hidden">
      <Link href="/" className="flex h-full shrink-0 items-center overflow-visible">
        <Image src="/images/brand/vine-branch-tv-logo-cropped.png" alt="Vine Branch TV" width={747} height={576} className="h-11 w-auto object-contain" priority/>
      </Link>
      <form onSubmit={onSubmit} className="relative ml-auto min-w-0 flex-1 max-w-[310px]">
        <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/35" size={15}/>
        <input
          value={q}
          onChange={e=>setQ(e.target.value)}
          aria-label="Search sermons"
          placeholder="Search"
          className="h-10 w-full rounded-full border border-white/10 bg-white/5 pl-9 pr-3 text-xs text-white outline-none transition placeholder:text-white/35 focus:border-[#ff0000]"
        />
      </form>
    </div>
  );
}
