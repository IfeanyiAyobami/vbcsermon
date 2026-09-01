import {Container} from "@/components/ui/Container";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {SermonsExplorer} from "@/components/sections/SermonsExplorer";

export function AllSermons(){
  return (
    <section className="py-10">
      <Container>
        <SectionHeading eyebrow="Browse everything" title="All Sermons" href="/sermons"/>
        <div className="mt-10">
          <SermonsExplorer/>
        </div>
      </Container>
    </section>
  );
}
