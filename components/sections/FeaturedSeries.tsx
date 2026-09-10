import {getFeaturedSeries} from "@/lib/data/series";
import {Container} from "@/components/ui/Container";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {SeriesCard} from "@/components/cards/SeriesCard";

export async function FeaturedSeries(){
  const series=await getFeaturedSeries();

  return (
    <section className="py-10">
      <Container>
        <SectionHeading eyebrow="Go deeper" title="Explore Series" href="/series"/>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {series.map(s=><SeriesCard key={s.id} item={s}/>)}
        </div>
      </Container>
    </section>
  );
}
