import {getLatestSermons} from "@/lib/data/sermons";
import {Container} from "@/components/ui/Container";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {SermonCard} from "@/components/cards/SermonCard";

export async function LatestSermons(){
  const latest=await getLatestSermons(3);

  return (
    <section className="py-10">
      <Container>
        <SectionHeading eyebrow="The latest" title="Latest Sermons" href="/sermons"/>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {latest.map(s=><SermonCard key={s.id} sermon={s}/>)}
        </div>
      </Container>
    </section>
  );
}
