import {notFound} from "next/navigation";
import {Container} from "@/components/ui/Container";
import {SermonCard} from "@/components/cards/SermonCard";
import {getSeriesBySlug} from "@/lib/data/series";
import {getSermonsBySeriesSlug} from "@/lib/data/sermons";

export const revalidate=60;

export default async function SeriesDetailPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const item=await getSeriesBySlug(slug);
  if(!item)notFound();
  const items=await getSermonsBySeriesSlug(item.slug);

  return (
    <main className="min-h-screen bg-[var(--vbc-black)] py-16 lg:py-24">
      <Container>
        <p className="text-[11px] font-bold uppercase tracking-[.3em] text-red-400">{item.date}</p>
        <h1 className="vbc-display mt-3 max-w-full text-[clamp(2.8rem,14vw,6rem)] uppercase leading-[.88] [overflow-wrap:anywhere] sm:text-9xl sm:[overflow-wrap:normal]">{item.title}</h1>
        <p className="mt-6 max-w-2xl text-white/50">{item.description}</p>
        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {items.map(s=><SermonCard key={s.id} sermon={s}/>)}
        </div>
      </Container>
    </main>
  );
}
