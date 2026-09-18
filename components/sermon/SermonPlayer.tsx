"use client";

import Image from "next/image";
import {AudioLines,Pause,Play} from "lucide-react";
import type {Sermon} from "@/data/sermons";
import {useAudioPlayer} from "./AudioPlayerProvider";

export function SermonPlayer({sermon}:{sermon:Sermon}){
  const {current,isPlaying,toggle}=useAudioPlayer();
  const active=current?.id===sermon.id;

  if(!sermon.audioUrl)return (
    <div className="overflow-hidden rounded-[28px] border border-white/10 bg-black">
      <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-[#170059] to-[#040451]">
        <div className="text-center"><div className="mx-auto grid size-20 place-items-center rounded-full bg-white/10 text-2xl">🎙️</div><p className="mt-5 text-sm text-white/50">Audio coming soon · {sermon.title}</p></div>
      </div>
    </div>
  );

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/[.13] bg-gradient-to-br from-[#210073]/95 via-[#15005c]/95 to-[#080451]/95 p-5 shadow-[0_22px_70px_rgba(8,0,70,.28),inset_0_1px_0_rgba(255,255,255,.06)] sm:p-7">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(102,78,255,.16),transparent_36%),radial-gradient(circle_at_100%_100%,rgba(255,20,48,.08),transparent_34%)]"/>
      <div className="relative z-10 flex items-center gap-5 sm:gap-7">
        <div className="relative aspect-square w-[112px] shrink-0 overflow-hidden rounded-[18px] border border-white/10 bg-white/5 shadow-[0_16px_35px_rgba(0,0,0,.28)] sm:w-[154px] lg:w-[176px]">
          {sermon.image&&<Image src={sermon.image} alt={`${sermon.title} sermon artwork`} fill priority className="object-cover" sizes="(max-width:640px) 112px, (max-width:1024px) 154px, 176px"/>}
        </div>

        <div className="min-w-0 flex-1 py-1">
          <div className="flex items-center gap-2 text-red-400">
            <AudioLines size={16} strokeWidth={2.4}/>
            <p className="text-[10px] font-bold uppercase tracking-[.26em]">{active?"Now playing":"Listen to sermon"}</p>
          </div>
          <h2 className="vbc-display mt-2 line-clamp-2 text-[clamp(1.55rem,3vw,2.65rem)] uppercase leading-[.95] text-white">{sermon.title}</h2>
          <p className="mt-2 hidden text-xs text-white/50 sm:block">{sermon.series} <span className="mx-1.5 text-white/25">•</span> {sermon.date} <span className="mx-1.5 text-white/25">•</span> {sermon.duration}</p>
          <button onClick={()=>toggle(sermon)} className="mt-5 inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#170059] shadow-[0_8px_25px_rgba(0,0,0,.18)] transition hover:scale-[1.03] sm:px-6">
            {active&&isPlaying?<><Pause size={17} fill="currentColor"/> Pause sermon</>:<><Play size={17} fill="currentColor"/> Play sermon</>}
          </button>
          <p className="mt-3 hidden text-[11px] leading-5 text-white/40 md:block">Playback continues in the global player while you browse.</p>
        </div>
      </div>
    </div>
  );
}
