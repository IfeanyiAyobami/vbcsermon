"use client";

import Image from "next/image";
import Link from "next/link";
import {useEffect,useState} from "react";
import {AudioLines,Bookmark,CalendarDays,ChevronDown,Download,FileText,Pause,Play,Share2,UserRound,Youtube} from "lucide-react";
import type {Sermon} from "@/data/sermons";
import {SermonCard} from "@/components/cards/SermonCard";
import {useAudioPlayer} from "./AudioPlayerProvider";

export function SermonDetailExperience({sermon,related}:{sermon:Sermon;related:Sermon[]}){
  const {current,isPlaying,toggle}=useAudioPlayer();
  const active=current?.id===sermon.id;
  const [notesOpen,setNotesOpen]=useState(false);
  const [saved,setSaved]=useState(false);

  useEffect(()=>{
    try{setSaved(JSON.parse(localStorage.getItem("vbc-saved-sermons")||"[]").includes(sermon.id))}catch{}
  },[sermon.id]);

  function toggleSaved(){
    try{
      const old:string[]=JSON.parse(localStorage.getItem("vbc-saved-sermons")||"[]");
      const next=old.includes(sermon.id)?old.filter(id=>id!==sermon.id):[...old,sermon.id];
      localStorage.setItem("vbc-saved-sermons",JSON.stringify(next));setSaved(next.includes(sermon.id));
    }catch{}
  }
  async function share(){
    const url=window.location.href;
    if(navigator.share){try{await navigator.share({title:sermon.title,text:sermon.description,url});return}catch{}}
    try{await navigator.clipboard.writeText(url)}catch{}
  }

  return <div className="sermon-detail-shell">
    <section className="sermon-listen-card">
      <div className="sermon-art"><Image src={sermon.image} alt={`${sermon.title} sermon artwork`} fill priority className="object-cover" sizes="(max-width:640px) 34vw, 220px"/></div>
      <div className="sermon-listen-copy">
        <div className="sermon-kicker"><AudioLines size={18}/><span>{active?"Now Playing":"Listen to Sermon"}</span></div>
        <h2 className="vbc-display">{sermon.title}</h2>
        <button type="button" disabled={!sermon.audioUrl} onClick={()=>toggle(sermon)} className="sermon-play-button">
          {active&&isPlaying?<Pause size={20} fill="currentColor"/>:<Play size={20} fill="currentColor"/>}
          <span>{active&&isPlaying?"Pause Sermon":"Play Sermon"}</span>
        </button>
      </div>
    </section>

    <section className="sermon-copy-block">
      <p className="sermon-series-label">{sermon.series}</p>
      <h1 className="vbc-display sermon-page-title">{sermon.title}</h1>
      <p className="sermon-description">{sermon.description}</p>
    </section>

    <div className="sermon-meta-panel">
      <div><UserRound/><span>{sermon.speaker}</span></div><i/>
      <div><CalendarDays/><span>{sermon.date}</span></div>
    </div>

    <div className="sermon-actions">
      <button onClick={toggleSaved}><Bookmark fill={saved?"currentColor":"none"}/><span>{saved?"Saved":"Save"}</span></button>
      <button onClick={share}><Share2/><span>Share</span></button>
      {sermon.audioUrl?<a href={sermon.audioUrl} download><Download/><span>Download</span></a>:<button disabled><Download/><span>Download</span></button>}
      <button disabled title="YouTube link not available"><Youtube/><span>Watch on YouTube</span></button>
    </div>

    <section className={`sermon-notes ${notesOpen?"is-open":""}`}>
      <button type="button" onClick={()=>setNotesOpen(v=>!v)} aria-expanded={notesOpen}>
        <span><FileText/>Sermon Notes</span><ChevronDown className="notes-chevron"/>
      </button>
      {notesOpen&&<div className="sermon-notes-content"><p>{sermon.description}</p>{sermon.topics?.length>0&&<div>{sermon.topics.map(t=><span key={t}>{t}</span>)}</div>}</div>}
    </section>

    {related.length>0&&<section className="sermon-latest">
      <div className="sermon-section-heading"><h2>Latest Sermons</h2><Link href="/sermons">View All <span>→</span></Link></div>
      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">{related.map(s=><SermonCard key={s.id} sermon={s}/>)}</div>
    </section>}
  </div>
}
