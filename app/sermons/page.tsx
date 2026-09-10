import {Container} from "@/components/ui/Container";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {SermonsExplorer} from "@/components/sections/SermonsExplorer";
import {getAllSermons} from "@/lib/data/sermons";
import {getAllTopics} from "@/lib/data/topics";

export const revalidate=60;

export default async function SermonsPage({searchParams}:{searchParams:Promise<{topic?:string}>}){
  const {topic}=await searchParams;
  const [sermons,topics]=await Promise.all([getAllSermons(),getAllTopics()]);

  return (
    <main className="min-h-screen bg-[var(--vbc-black)] py-16 text-white lg:py-20">
      <Container>
        <SectionHeading eyebrow="The archive" title="All Sermons"/>
        <div className="mt-10">
          <SermonsExplorer sermons={sermons} topics={topics} initialTopic={topic}/>
        </div>
      </Container>
    </main>
  );
}
