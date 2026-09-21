import {notFound} from "next/navigation";
import {Container} from "@/components/ui/Container";
import {SermonCard} from "@/components/cards/SermonCard";
import {getAllTopics} from "@/lib/data/topics";
import {getSermonsByTopic} from "@/lib/data/sermons";

export const revalidate=60;

export default async function TopicPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const topics=await getAllTopics();
  const topic=topics.find(t=>t.toLowerCase().replaceAll(" ","-")===slug);
  if(!topic)notFound();
  const results=await getSermonsByTopic(topic);

  return (
    <main className="min-h-screen bg-[var(--vbc-black)] py-20 text-white lg:py-28">
      <Container>
        <p className="text-[11px] font-bold uppercase tracking-[.3em] text-[#ff0000]">Topic</p>
        <h1 className="vbc-display mt-3 max-w-full text-[clamp(2.8rem,14vw,4.5rem)] uppercase leading-[.88] [overflow-wrap:anywhere]">{topic}</h1>
        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {results.length?results.map(s=><SermonCard key={s.id} sermon={s}/>):<p className="text-white/40">No sermons are currently assigned to this topic.</p>}
        </div>
      </Container>
    </main>
  );
}
