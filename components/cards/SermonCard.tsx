import Image from "next/image";
import Link from "next/link";
import {CalendarDays,Clock3,Play} from "lucide-react";
import type {Sermon} from "@/data/sermons";

export function SermonCard({sermon,light=false}:{sermon:Sermon;light?:boolean}){
  return (
    <article className={`vbc-card group overflow-hidden rounded-[16px] border sm:rounded-[24px] ${light?"border-black/10 bg-white":"border-white/10 bg-white/[.045]"}`}>
      <Link href={`/sermon/${sermon.slug}`}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image src={sermon.image} alt={sermon.title} fill className="vbc-card-image object-cover" sizes="(max-width:640px) 50vw,(max-width:1024px) 33vw,25vw"/>
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent"/>
          <span className="absolute left-2 top-2 rounded-full bg-[#ff0000] px-2 py-1 text-[7px] font-bold uppercase tracking-[.15em] sm:left-4 sm:top-4 sm:px-3 sm:py-1.5 sm:text-[9px] sm:tracking-[.2em]">Sermon</span>
          <span className="absolute bottom-2 right-2 grid size-8 place-items-center rounded-full bg-white text-[#170059] transition group-hover:scale-110 sm:bottom-4 sm:right-4 sm:size-12">
            <Play size={12} fill="currentColor" className="sm:hidden"/>
            <Play size={16} fill="currentColor" className="hidden sm:block"/>
          </span>
        </div>
        <div className="p-3 sm:p-6">
          <p className={`text-[8px] font-bold uppercase tracking-[.15em] sm:text-[10px] sm:tracking-[.2em] ${light?"text-[#ff0000]":"text-red-400"}`}>{sermon.series}</p>
          <h3 className={`vbc-display mt-1.5 text-[15px] uppercase leading-[1.1] sm:mt-3 sm:text-[29px] sm:leading-[.9] ${light?"text-[#170059]":"text-white"}`}>{sermon.title}</h3>
          <p className={`mt-2 hidden line-clamp-2 text-sm leading-6 sm:block ${light?"text-black/45":"text-white/40"}`}>{sermon.description}</p>
          <div className={`mt-2 flex items-center justify-between border-t pt-2 text-[9px] sm:mt-6 sm:pt-4 sm:text-[11px] ${light?"border-black/10 text-black/45":"border-white/10 text-white/40"}`}>
            <span className="flex items-center gap-1 sm:gap-1.5"><CalendarDays size={10} className="sm:hidden"/><CalendarDays size={13} className="hidden sm:block"/>{sermon.date}</span>
            <span className="flex items-center gap-1 sm:gap-1.5"><Clock3 size={10} className="sm:hidden"/><Clock3 size={13} className="hidden sm:block"/>{sermon.duration}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
