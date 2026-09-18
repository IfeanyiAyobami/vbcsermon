"use client";
import Image from "next/image";
import Link from "next/link";
import {Pause,Play} from "lucide-react";
import type {Sermon} from "@/data/sermons";
import {useAudioPlayer} from "@/components/sermon/AudioPlayerProvider";

export function SermonRowCard({sermon}:{sermon:Sermon}){
  const {current,isPlaying,toggle}=useAudioPlayer();const active=current?.id===sermon.id;
  return <article className={`vbc-card group w-[240px] shrink-0 overflow-hidden rounded-2xl border bg-white/[.04] sm:w-[260px] ${active?"border-red-500/70":"border-white/10"}`}>
    <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-[#170059] to-[#040451]">
      <Link href={`/sermon/${sermon.slug}`} className="absolute inset-0 z-10" aria-label={`View ${sermon.title}`}>{sermon.image&&<Image src={sermon.image} alt={sermon.title} fill className="vbc-card-image object-cover" sizes="260px"/>}<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent"/></Link>
      <button type="button" disabled={!sermon.audioUrl} onClick={()=>toggle(sermon)} className="absolute bottom-2.5 right-2.5 z-20 grid size-9 place-items-center rounded-full bg-white/95 text-[#170059] transition hover:scale-110 disabled:opacity-40" aria-label={active&&isPlaying?`Pause ${sermon.title}`:`Play ${sermon.title}`}>{active&&isPlaying?<Pause size={13} fill="currentColor"/>:<Play size={13} fill="currentColor"/>}</button>
    </div>
    <Link href={`/sermon/${sermon.slug}`} className="block p-4"><p className="truncate text-[10px] font-bold uppercase tracking-[.18em] text-red-400">{active?"Now playing":sermon.series}</p><p className="vbc-display mt-1.5 truncate text-lg uppercase leading-none">{sermon.title}</p><p className="mt-2 text-xs text-white/35">{sermon.date} · {sermon.duration}</p></Link>
  </article>;
}
