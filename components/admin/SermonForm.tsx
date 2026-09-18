"use client";
import {startTransition,useActionState,useState,useRef} from "react";
import {CheckCircle2,XCircle,Loader2} from "lucide-react";
import {uploadWithProgress} from "@/lib/uploadWithProgress";
import type {SeriesOption,TopicOption,SermonEditData} from "@/lib/data/admin";

type FormState={error?:string};
const initialState:FormState={};

type FileStatus={status:"idle"|"uploading"|"done"|"error";progress:number;error?:string;url?:string};
const idleStatus:FileStatus={status:"idle",progress:0};

export function SermonForm({
  action,series,topics,existing,
}:{
  action:(prevState:FormState|undefined,formData:FormData)=>Promise<FormState|undefined>;
  series:SeriesOption[];
  topics:TopicOption[];
  existing?:SermonEditData;
}){
  const [state,formAction,pending]=useActionState(action,initialState);
  const [seriesChoice,setSeriesChoice]=useState(existing?.series_id??"");
  const [imageStatus,setImageStatus]=useState<FileStatus>(idleStatus);
  const [audioStatus,setAudioStatus]=useState<FileStatus>(idleStatus);
  const [submitting,setSubmitting]=useState(false);
  const formRef=useRef<HTMLFormElement>(null);

  async function handleSubmit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    setSubmitting(true);
    const formData=new FormData(e.currentTarget);

    const imageFile=formData.get("image") as File|null;
    const audioFile=formData.get("audio") as File|null;
    formData.delete("image");
    formData.delete("audio");

    if(imageFile&&imageFile.size>0){
      setImageStatus({status:"uploading",progress:0});
      try{
        const url=await uploadWithProgress("sermon-images",imageFile,pct=>setImageStatus({status:"uploading",progress:pct}));
        setImageStatus({status:"done",progress:100,url});
        formData.set("image_url",url);
      }catch(err){
        setImageStatus({status:"error",progress:0,error:err instanceof Error?err.message:"Upload failed"});
        setSubmitting(false);
        return;
      }
    }

    if(audioFile&&audioFile.size>0){
      setAudioStatus({status:"uploading",progress:0});
      try{
        const url=await uploadWithProgress("sermon-audio",audioFile,pct=>setAudioStatus({status:"uploading",progress:pct}));
        setAudioStatus({status:"done",progress:100,url});
        formData.set("audio_url",url);
      }catch(err){
        setAudioStatus({status:"error",progress:0,error:err instanceof Error?err.message:"Upload failed"});
        setSubmitting(false);
        return;
      }
    }

    // useActionState dispatchers must run inside an Action/transition context.
    // The uploads above are intentionally awaited first, so manually dispatch the
    // final FormData inside startTransition to preserve React pending state.
    startTransition(()=>{
      formAction(formData);
    });
    setSubmitting(false);
  }

  const busy=pending||submitting;
  const buttonLabel=
    imageStatus.status==="uploading"?`Uploading thumbnail… ${imageStatus.progress}%`:
    audioStatus.status==="uploading"?`Uploading audio… ${audioStatus.progress}%`:
    pending?"Saving…":
    existing?"Save changes":"Create sermon";

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="flex flex-col gap-5">
        {state?.error&&<p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{state.error}</p>}

        <Field label="Title">
          <input name="title" required defaultValue={existing?.title} className={inputClass}/>
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Date">
            <input name="sermon_date" type="date" required defaultValue={existing?.sermon_date} className={inputClass}/>
          </Field>
          <Field label="Duration">
            <input name="duration" placeholder="58:12" defaultValue={existing?.duration} className={inputClass}/>
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Speaker">
            <input name="speaker" defaultValue={existing?.speaker??"Sola Kolade"} className={inputClass}/>
          </Field>
          <Field label="Category">
            <input name="category" placeholder="Faith" defaultValue={existing?.category} className={inputClass}/>
          </Field>
        </div>

        <Field label="Series">
          <select
            name="series_id"
            value={seriesChoice}
            onChange={e=>setSeriesChoice(e.target.value)}
            className={inputClass}
            style={{backgroundColor:"#170059",color:"#fff"}}
          >
            <option value="" style={optionStyle}>— No series —</option>
            {series.map(s=><option key={s.id} value={s.id} style={optionStyle}>{s.title}</option>)}
            <option value="__new__" style={optionStyle}>+ Create new series…</option>
          </select>
          {seriesChoice==="__new__"&&(
            <input
              name="new_series_title"
              required
              autoFocus
              placeholder="New series name"
              className={`${inputClass} mt-2`}
            />
          )}
        </Field>

        <Field label="Description">
          <textarea name="description" rows={4} defaultValue={existing?.description} className={inputClass}/>
        </Field>

        <Field label="Topics">
          <div className="flex flex-wrap gap-2">
            {topics.map(t=>(
              <label key={t.id} className="flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 has-[:checked]:border-[#ff0000] has-[:checked]:bg-[#ff0000] has-[:checked]:text-white">
                <input type="checkbox" name="topic_ids" value={t.id} defaultChecked={existing?.topicIds.includes(t.id)} className="hidden"/>
                {t.name}
              </label>
            ))}
          </div>
        </Field>
      </div>

      <div className="flex flex-col gap-5">
        <Field label="Thumbnail image">
          {existing?.image_url&&imageStatus.status==="idle"&&<img src={existing.image_url} alt="" className="mb-2 aspect-video w-full rounded-xl object-cover"/>}
          <input
            name="image"
            type="file"
            accept="image/*"
            disabled={busy}
            onChange={()=>setImageStatus(idleStatus)}
            className={fileClass}
          />
          <p className="mt-1 text-xs text-white/30">{existing?"Leave empty to keep the current image.":"JPG or PNG recommended."}</p>
          <UploadProgress status={imageStatus}/>
        </Field>

        <Field label="Audio file">
          {existing?.audio_url&&audioStatus.status==="idle"&&<audio controls src={existing.audio_url} className="mb-2 w-full"/>}
          <input
            name="audio"
            type="file"
            accept="audio/*,.mp3,.m4a,.wav,.aac,.ogg,.wma,.flac"
            disabled={busy}
            onChange={()=>setAudioStatus(idleStatus)}
            className={fileClass}
          />
          <p className="mt-1 text-xs text-white/30">MP3, M4A, WAV, AAC and most other audio formats are accepted.</p>
          <UploadProgress status={audioStatus}/>
        </Field>

        <button type="submit" disabled={busy} className="mt-2 rounded-xl bg-[#ff0000] py-3.5 text-sm font-bold text-white transition hover:bg-[#d90000] disabled:opacity-60">
          {buttonLabel}
        </button>
      </div>
    </form>
  );
}

function UploadProgress({status}:{status:FileStatus}){
  if(status.status==="idle")return null;
  if(status.status==="uploading"){
    return (
      <div className="mt-2">
        <div className="flex items-center gap-2 text-xs text-white/60">
          <Loader2 size={13} className="animate-spin"/> Uploading… {status.progress}%
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-[#ff0000] transition-all" style={{width:`${status.progress}%`}}/>
        </div>
      </div>
    );
  }
  if(status.status==="done"){
    return <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-green-400"><CheckCircle2 size={14}/> Uploaded successfully</p>;
  }
  return <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-red-400"><XCircle size={14}/> {status.error||"Upload failed"}</p>;
}

const inputClass="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#ff0000]";
const fileClass="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70 file:mr-3 file:rounded-lg file:border-0 file:bg-[#ff0000] file:px-3 file:py-1.5 file:text-xs file:font-bold file:text-white";
const optionStyle={backgroundColor:"#ff0000",color:"#fff"};

function Field({label,children}:{label:string;children:React.ReactNode}){
  return (
    <div>
      <label className="text-xs font-semibold text-white/40">{label}</label>
      {children}
    </div>
  );
}
