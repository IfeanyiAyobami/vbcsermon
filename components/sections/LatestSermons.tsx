import {sermons} from "@/data/sermons";
import {Container} from "@/components/ui/Container";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {SermonCard} from "@/components/cards/SermonCard";

export function LatestSermons(){
  // Most recently preached first
  const latest=[...sermons].sort((a,b)=>new Date(b.date).getTime()-new Date(a.date).getTime()).slice(0,3);

  return (
    <section className="py-10">
      <Container>
        <SectionHeading eyebrow="The latest" title="Latest Sermons" href="/sermons"/>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map(s=><SermonCard key={s.id} sermon={s}/>)}
        </div>
      </Container>
    </section>
  );
}
