import {Radio,Clock3} from "lucide-react";
import Image from "next/image";
import {sermons} from "@/data/sermons";
import {Container} from "@/components/ui/Container";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {SermonRowCard} from "@/components/cards/SermonRowCard";

// Placeholder service times — update with your actual weekly schedule.
const schedule=[
  {day:"Sunday",time:"9:00 AM",label:"First Service"},
  {day:"Sunday",time:"11:00 AM",label:"Second Service"},
  {day:"Wednesday",time:"6:00 PM",label:"Midweek Service"},
];

export default function LivePage(){
  const recent=sermons.slice(0,6);

  return (
    <main className="min-h-screen bg-[var(--vbc-black)] py-16 text-white lg:py-20">
      <Container>
        <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.32em] text-[#ff0000]">
          <Radio size={14}/> Live
        </p>
        <h1 className="vbc-display mt-3 text-6xl uppercase leading-none sm:text-8xl">Join Us Live</h1>
        <p className="mt-5 max-w-xl text-white/50">No service is streaming right now. Here's when to join us next, and the most recent broadcasts in the meantime.</p>

        <div className="relative mt-10 overflow-hidden rounded-3xl border border-white/10">
          <Image src="/images/sermons/new-realms-live.jpg" alt="Vine Branch TV" width={1280} height={640} className="w-full object-cover" priority/>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {schedule.map(s=>(
            <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[.04] p-6">
              <p className="text-[10px] font-bold uppercase tracking-[.2em] text-red-400">{s.day}</p>
              <p className="vbc-display mt-2 text-3xl uppercase">{s.time}</p>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-white/45"><Clock3 size={13}/>{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <SectionHeading eyebrow="In the meantime" title="Recent Broadcasts" href="/sermons"/>
          <div className="vbc-scrollbar-none mt-6 flex gap-4 overflow-x-auto pb-2">
            {recent.map(s=><SermonRowCard key={s.id} sermon={s}/>)}
          </div>
        </div>
      </Container>
    </main>
  );
}
