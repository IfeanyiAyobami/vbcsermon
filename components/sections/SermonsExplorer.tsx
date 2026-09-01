"use client";
import {useMemo,useState} from "react";
import {sermons} from "@/data/sermons";
import {topics} from "@/data/topics";
import {SermonCard} from "@/components/cards/SermonCard";

export function SermonsExplorer({initialTopic}:{initialTopic?:string}){
  const normalized=(t:string)=>t.toLowerCase().replaceAll(" ","-");
  const startTopic=initialTopic?topics.find(t=>normalized(t)===initialTopic)??null:null;
  const [active,setActive]=useState<string|null>(startTopic);

  const results=useMemo(()=>active?sermons.filter(s=>s.topics.some(t=>t.toLowerCase()===active.toLowerCase())):sermons,[active]);

  return (
    <div>
      <div className="vbc-scrollbar-none -mx-5 flex gap-2.5 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0">
        <button
          onClick={()=>setActive(null)}
          className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold transition ${active===null?"border-[#ff0000] bg-[#ff0000] text-white":"border-white/10 bg-white/5 text-white/55 hover:border-white/25 hover:text-white"}`}
        >
          All
        </button>
        {topics.map(t=>{
          const isActive=active?.toLowerCase()===t.toLowerCase();
          return (
            <button
              key={t}
              onClick={()=>setActive(t)}
              className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold transition ${isActive?"border-[#ff0000] bg-[#ff0000] text-white":"border-white/10 bg-white/5 text-white/55 hover:border-white/25 hover:text-white"}`}
            >
              {t}
            </button>
          );
        })}
      </div>

      <p className="mt-6 text-sm text-white/35">
        {active?<>Showing <span className="font-semibold text-white">{results.length}</span> {results.length===1?"message":"messages"} on <span className="font-semibold text-white">{active}</span></>:<>Showing all <span className="font-semibold text-white">{results.length}</span> messages</>}
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {results.length?results.map(s=><SermonCard key={s.id} sermon={s}/>):
          <div className="col-span-full rounded-2xl border border-dashed border-white/15 bg-white/[.03] py-16 text-center">
            <p className="text-white/35">No sermons are tagged under this topic yet.</p>
            <button onClick={()=>setActive(null)} className="mt-4 text-sm font-semibold text-[#ff0000] hover:underline">Clear filter</button>
          </div>
        }
      </div>
    </div>
  );
}
