"use client";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {Search} from "lucide-react";

export function Topbar(){
  const router=useRouter();
  const [q,setQ]=useState("");

  function onSubmit(e:React.FormEvent){
    e.preventDefault();
    router.push(q.trim()?`/search?q=${encodeURIComponent(q.trim())}`:"/search");
  }

  return (
    <div className="sticky top-0 z-30 hidden h-[78px] items-center border-b border-white/10 bg-[var(--vbc-black)]/85 px-8 backdrop-blur-xl lg:flex">
      <form onSubmit={onSubmit} className="relative w-full max-w-md">
        <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35" size={17}/>
        <input
          value={q}
          onChange={e=>setQ(e.target.value)}
          placeholder="Search messages, series and more..."
          className="w-full rounded-full border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-white/35 focus:border-[#ff0000]"
        />
      </form>
    </div>
  );
}
