import Image from "next/image";
import Link from "next/link";
import {Play} from "lucide-react";
import type {Sermon} from "@/data/sermons";

export function SermonRowCard({sermon}:{sermon:Sermon}){
  return (
    <Link href={`/sermon/${sermon.slug}`} className="vbc-card group w-[240px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[.04] sm:w-[260px]">
      <div className="relative aspect-video overflow-hidden">
        <Image src={sermon.image} alt={sermon.title} fill className="vbc-card-image object-cover" sizes="260px"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent"/>
        <span className="absolute bottom-2.5 right-2.5 grid size-9 place-items-center rounded-full bg-white/95 text-[#170059] transition group-hover:scale-110">
          <Play size={13} fill="currentColor"/>
        </span>
      </div>
      <div className="p-4">
        <p className="truncate text-[10px] font-bold uppercase tracking-[.18em] text-red-400">{sermon.series}</p>
        <p className="vbc-display mt-1.5 truncate text-lg uppercase leading-none">{sermon.title}</p>
        <p className="mt-2 text-xs text-white/35">{sermon.date} · {sermon.duration}</p>
      </div>
    </Link>
  );
}
