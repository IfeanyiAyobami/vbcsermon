"use client";
import {useMemo,useState} from "react";
import {Search} from "lucide-react";
import {sermons} from "@/data/sermons";
import {SermonCard} from "@/components/cards/SermonCard";

export function SearchClient({initialQuery=""}:{initialQuery?:string}){
  const [q,setQ]=useState(initialQuery);
  const results=useMemo(()=>{
    const v=q.trim().toLowerCase();
    if(!v)return sermons;
    return sermons.filter(s=>`${s.title} ${s.series} ${s.category} ${s.topics.join(" ")} ${s.description}`.toLowerCase().includes(v));
  },[q]);

  return (
    <div className="relative mt-10">
      <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30" size={21}/>
      <input
        value={q}
        onChange={e=>setQ(e.target.value)}
        placeholder="Search by title, series or topic..."
        className="w-full rounded-[20px] border border-white/10 bg-white/5 px-14 py-5 outline-none transition placeholder:text-white/35 focus:border-[#ff0000]"
      />
      <p className="mt-6 text-sm text-white/35">{results.length} {results.length===1?"result":"results"}</p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {results.map(s=><SermonCard key={s.id} sermon={s}/>)}
      </div>
    </div>
  );
}
