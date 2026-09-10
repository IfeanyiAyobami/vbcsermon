import {Container} from "@/components/ui/Container";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {SeriesCard} from "@/components/cards/SeriesCard";
import {getAllSeries} from "@/lib/data/series";

export const revalidate=60;

export default async function SeriesPage(){
  const series=await getAllSeries();
  return (
    <main className="min-h-screen bg-[var(--vbc-black)] py-20 lg:py-28">
      <Container>
        <SectionHeading eyebrow="Go deeper" title="All Series"/>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {series.map(s=><SeriesCard key={s.id} item={s}/>)}
        </div>
      </Container>
    </main>
  );
}
