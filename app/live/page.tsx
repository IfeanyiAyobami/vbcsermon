import {Radio,Clock3,PlayCircle} from "lucide-react";
import Image from "next/image";
import {sermons} from "@/data/sermons";
import {Container} from "@/components/ui/Container";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {SermonRowCard} from "@/components/cards/SermonRowCard";

// Real weekly schedule.
const schedule=[
  {day:"Sunday",time:"8:00AM",label:"First Service"},
  {day:"Sunday",time:"10:00 AM",label:"Second Service"},
  {day:"Tuesday",time:"5:30 PM",label:"Hotline To Heaven"},
  {day:"Thursday",time:"5:30PM",label:"Hour Of Emphasis (Interdenominational Teaching Service)"},
];

// TODO: replace "#" with your actual live stream link (YouTube Live, Facebook Live, or church app).
const LIVE_STREAM_URL="#";

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

        <a
          href={LIVE_STREAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#ff0000] px-7 py-4 text-sm font-bold transition hover:-translate-y-0.5 hover:bg-[#d90000]"
        >
          <PlayCircle size={19}/> Click to join live
        </a>

        <div className="relative mt-10 overflow-hidden rounded-3xl border border-white/10">
          <Image src="/images/sermons/new-realms-live.jpg" alt="Vine Branch TV" width={1280} height={640} className="w-full object-cover" priority/>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {schedule.map(s=>(
            <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[.04] p-6">
              <p className="text-[10px] font-bold uppercase tracking-[.2em] text-red-400">{s.day}</p>
              {s.time&&<p className="vbc-display mt-2 text-2xl uppercase leading-tight">{s.time}</p>}
              <p className={`flex items-start gap-1.5 text-sm text-white/45 ${s.time?"mt-1":"mt-2"}`}><Clock3 size={13} className="mt-0.5 shrink-0"/>{s.label}</p>
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
