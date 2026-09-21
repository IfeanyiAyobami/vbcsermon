"use client";

import {createContext,useCallback,useContext,useEffect,useRef,useState} from "react";
import Image from "next/image";
import {Pause,Play,RotateCcw,RotateCw,SkipBack,SkipForward,X} from "lucide-react";
import type {Sermon} from "@/data/sermons";

type PlayerContextValue={
  current:Sermon|null;
  isPlaying:boolean;
  currentTime:number;
  duration:number;
  play:(sermon:Sermon)=>void;
  toggle:(sermon?:Sermon)=>void;
  seek:(seconds:number)=>void;
  skip:(seconds:number)=>void;
  close:()=>void;
};

const PlayerContext=createContext<PlayerContextValue|null>(null);

function fmt(seconds:number){
  if(!Number.isFinite(seconds)||seconds<0)return "00:00";
  const h=Math.floor(seconds/3600),m=Math.floor((seconds%3600)/60),s=Math.floor(seconds%60);
  return h?`${h}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`:`${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
}

export function AudioPlayerProvider({children}:{children:React.ReactNode}){
  const audioRef=useRef<HTMLAudioElement|null>(null);
  const currentRef=useRef<Sermon|null>(null);
  const [current,setCurrent]=useState<Sermon|null>(null);
  const [isPlaying,setIsPlaying]=useState(false);
  const [currentTime,setCurrentTime]=useState(0);
  const [duration,setDuration]=useState(0);
  const countedRef=useRef<string|null>(null);

  useEffect(()=>{
    const audio=new Audio();
    audio.preload="metadata";
    audioRef.current=audio;
    const time=()=>{
      setCurrentTime(audio.currentTime||0);
      if(currentRef.current&&audio.currentTime>=20&&countedRef.current!==currentRef.current.id){
        countedRef.current=currentRef.current.id;
        let listenerId=localStorage.getItem("vbc-listener-id");
        if(!listenerId){listenerId=crypto.randomUUID();localStorage.setItem("vbc-listener-id",listenerId)}
        fetch("/api/analytics/play",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({sermonId:currentRef.current.id,listenerId,listenedSeconds:Math.floor(audio.currentTime)}),keepalive:true}).catch(()=>{});
      }
    };
    const meta=()=>setDuration(Number.isFinite(audio.duration)?audio.duration:0);
    const playing=()=>setIsPlaying(true);
    const paused=()=>setIsPlaying(false);
    const ended=()=>setIsPlaying(false);
    audio.addEventListener("timeupdate",time); audio.addEventListener("loadedmetadata",meta);
    audio.addEventListener("play",playing); audio.addEventListener("pause",paused); audio.addEventListener("ended",ended);
    return()=>{audio.pause();audio.removeEventListener("timeupdate",time);audio.removeEventListener("loadedmetadata",meta);audio.removeEventListener("play",playing);audio.removeEventListener("pause",paused);audio.removeEventListener("ended",ended)};
  },[]);

  const play=useCallback((sermon:Sermon)=>{
    if(!sermon.audioUrl)return;
    const audio=audioRef.current;if(!audio)return;
    if(current?.id!==sermon.id){audio.src=sermon.audioUrl;audio.load();currentRef.current=sermon;setCurrent(sermon);setCurrentTime(0);setDuration(0)}
    audio.play().catch(()=>setIsPlaying(false));
  },[current]);

  const toggle=useCallback((sermon?:Sermon)=>{
    const audio=audioRef.current;if(!audio)return;
    if(sermon&&current?.id!==sermon.id){play(sermon);return}
    if(!current&&sermon){play(sermon);return}
    if(audio.paused)audio.play().catch(()=>setIsPlaying(false));else audio.pause();
  },[current,play]);

  const seek=useCallback((seconds:number)=>{const a=audioRef.current;if(a)a.currentTime=Math.max(0,Math.min(seconds,a.duration||seconds))},[]);
  const skip=useCallback((seconds:number)=>{const a=audioRef.current;if(a)seek(a.currentTime+seconds)},[seek]);
  const close=useCallback(()=>{const a=audioRef.current;if(a){a.pause();a.removeAttribute("src");a.load()}currentRef.current=null;setCurrent(null);setCurrentTime(0);setDuration(0)},[]);

  return <PlayerContext.Provider value={{current,isPlaying,currentTime,duration,play,toggle,seek,skip,close}}>
    {children}
    {current&&<GlobalAudioPlayer sermon={current}/>} 
  </PlayerContext.Provider>;
}

export function useAudioPlayer(){const ctx=useContext(PlayerContext);if(!ctx)throw new Error("useAudioPlayer must be used inside AudioPlayerProvider");return ctx}

function GlobalAudioPlayer({sermon}:{sermon:Sermon}){
  const {isPlaying,currentTime,duration,toggle,seek,skip,close}=useAudioPlayer();
  return <div className="fixed inset-x-2 bottom-[72px] z-[80] overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-r from-[#24118f]/90 via-[#31209c]/85 to-[#20117b]/90 p-2.5 shadow-[0_18px_55px_rgba(9,0,75,0.48),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl backdrop-saturate-150 sm:inset-x-4 sm:bottom-4 lg:left-[256px] lg:p-3 before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_12%_120%,rgba(255,20,45,0.22),transparent_32%),radial-gradient(circle_at_85%_-30%,rgba(82,111,255,0.22),transparent_38%)] before:content-['']">
    <div className="relative z-10 flex items-center gap-3">
      <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-white/5 sm:size-14">{sermon.image&&<Image src={sermon.image} alt="" fill className="object-cover" sizes="56px"/>}</div>
      <div className="min-w-0 w-[180px] sm:w-[260px]">
        <p className="truncate text-sm font-bold text-white">{sermon.title}</p><p className="truncate text-[11px] text-white/45">{sermon.series}</p>
      </div>
      <div className="hidden flex-1 items-center gap-3 md:flex">
        <span className="w-12 text-right text-[10px] text-white/45">{fmt(currentTime)}</span>
        <input aria-label="Audio progress" type="range" min={0} max={duration||1} step={1} value={Math.min(currentTime,duration||1)} onChange={e=>seek(Number(e.target.value))} className="h-1 flex-1 cursor-pointer accent-[#ff172f]"/>
        <span className="w-12 text-[10px] text-white/45">{fmt(duration)}</span>
      </div>
      <div className="ml-auto flex items-center gap-1 sm:gap-2">
        <button onClick={()=>skip(-10)} aria-label="Back 10 seconds" className="grid size-8 place-items-center rounded-full text-white/70 hover:bg-white/10 hover:text-white"><RotateCcw size={16}/></button>
        <button onClick={()=>toggle()} aria-label={isPlaying?"Pause":"Play"} className="grid size-10 place-items-center rounded-full bg-white text-black hover:scale-105">{isPlaying?<Pause size={18} fill="currentColor"/>:<Play size={18} fill="currentColor"/>}</button>
        <button onClick={()=>skip(10)} aria-label="Forward 10 seconds" className="grid size-8 place-items-center rounded-full text-white/70 hover:bg-white/10 hover:text-white"><RotateCw size={16}/></button>
        <button onClick={close} aria-label="Close player" className="ml-1 grid size-8 place-items-center rounded-full text-white/45 hover:bg-white/10 hover:text-white"><X size={18}/></button>
      </div>
    </div>
    <div className="relative z-10 mt-2 flex items-center gap-2 md:hidden"><span className="text-[9px] text-white/40">{fmt(currentTime)}</span><input aria-label="Audio progress" type="range" min={0} max={duration||1} step={1} value={Math.min(currentTime,duration||1)} onChange={e=>seek(Number(e.target.value))} className="h-1 flex-1 accent-[#ff172f]"/><span className="text-[9px] text-white/40">{fmt(duration)}</span></div>
  </div>
}
