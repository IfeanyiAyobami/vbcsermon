import {Container} from "@/components/ui/Container";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {SermonsExplorer} from "@/components/sections/SermonsExplorer";

export default async function SermonsPage({searchParams}:{searchParams:Promise<{topic?:string}>}){
  const {topic}=await searchParams;
  return (
    <main className="min-h-screen bg-[var(--vbc-black)] py-16 text-white lg:py-20">
      <Container>
        <SectionHeading eyebrow="The archive" title="All Sermons"/>
        <div className="mt-10">
          <SermonsExplorer initialTopic={topic}/>
        </div>
      </Container>
    </main>
  );
}
