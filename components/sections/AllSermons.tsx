import {getAllSermons} from "@/lib/data/sermons";
import {getAllTopics} from "@/lib/data/topics";
import {Container} from "@/components/ui/Container";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {SermonsExplorer} from "@/components/sections/SermonsExplorer";

export async function AllSermons(){
  const [sermons,topics]=await Promise.all([getAllSermons(),getAllTopics()]);

  return (
    <section className="py-10">
      <Container>
        <SectionHeading eyebrow="Browse everything" title="All Sermons" href="/sermons"/>
        <div className="mt-10">
          <SermonsExplorer sermons={sermons} topics={topics}/>
        </div>
      </Container>
    </section>
  );
}
