"use client";
import Link from "next/link";
import Image from "next/image";
import {useEffect,useState} from "react";
import {Play,Info} from "lucide-react";
import {Container} from "@/components/ui/Container";
import {sermons} from "@/data/sermons";

const slides=sermons.slice(0,3);

export function Hero(){
  const [active,setActive]=useState(0);

  useEffect(()=>{
    const t=setInterval(()=>setActive(i=>(i+1)%slides.length),6500);
    return ()=>clearInterval(t);
  },[]);

  const slide=slides[active];

  return (
    <section className="relative h-[560px] w-full overflow-hidden sm:h-[620px]">
      {slides.map((s,i)=>(
        <div key={s.id} className={`absolute inset-0 transition-opacity duration-700 ${i===active?"opacity-100":"opacity-0"}`}>
          {/* Image placeholder — swap for real photography/thumbnails per message */}
          <Image src={s.image} alt={s.title} fill priority={i===0} className="object-cover" sizes="100vw"/>
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--vbc-black)] via-[var(--vbc-black)]/70 to-transparent"/>
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--vbc-black)] via-transparent to-transparent"/>
        </div>
      ))}

      <Container className="relative flex h-full items-end pb-16 sm:items-center sm:pb-0">
        <div className="max-w-xl">
          <span className="inline-block rounded-full bg-[#ff0000] px-3 py-1 text-[10px] font-bold uppercase tracking-[.25em]">Featured</span>
          <h1 className="vbc-display mt-5 text-[clamp(38px,7vw,72px)] uppercase leading-[1.05] sm:leading-[.88]">{slide.title}</h1>
          <p className="mt-3 text-sm font-semibold text-white/50">{slide.category} • {slide.series}</p>
          <p className="mt-4 line-clamp-2 max-w-md text-sm leading-7 text-white/55 sm:text-base">{slide.description}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link href={`/sermon/${slide.slug}`} className="inline-flex items-center gap-2.5 rounded-full bg-[#ff0000] px-6 py-3.5 text-sm font-bold transition hover:-translate-y-0.5 hover:bg-[#d90000]">
              <Play size={16} fill="currentColor"/> Play now
            </Link>
            <Link href={`/sermon/${slide.slug}`} className="inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold backdrop-blur transition hover:bg-white/20">
              <Info size={16}/> More info
            </Link>
          </div>
        </div>
      </Container>

      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((s,i)=>(
          <button
            key={s.id}
            onClick={()=>setActive(i)}
            aria-label={`Show slide ${i+1}`}
            className={`h-1.5 rounded-full transition-all ${i===active?"w-7 bg-[#ff0000]":"w-1.5 bg-white/30 hover:bg-white/50"}`}
          />
        ))}
      </div>
    </section>
  );
}
