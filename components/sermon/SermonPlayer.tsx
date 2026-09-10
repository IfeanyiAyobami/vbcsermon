export function SermonPlayer({title,audioUrl}:{title:string;audioUrl?:string}){
  if(audioUrl){
    return (
      <div className="overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-[#170059] to-[#040451] p-8">
        <p className="text-[10px] font-bold uppercase tracking-[.25em] text-red-400">Now playing</p>
        <p className="vbc-display mt-2 text-2xl uppercase leading-none">{title}</p>
        <audio controls preload="none" className="mt-6 w-full" src={audioUrl}>
          Your browser doesn't support audio playback.
        </audio>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[28px] border border-white/10 bg-black">
      <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-[#170059] to-[#040451]">
        <div className="text-center">
          <div className="mx-auto grid size-20 place-items-center rounded-full bg-white/10 text-2xl">🎙️</div>
          <p className="mt-5 text-sm text-white/50">Audio coming soon · {title}</p>
        </div>
      </div>
    </div>
  );
}
