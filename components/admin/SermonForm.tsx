"use client";
import {useActionState} from "react";
import type {SeriesOption,TopicOption,SermonEditData} from "@/lib/data/admin";

type FormState={error?:string};
const initialState:FormState={};

export function SermonForm({
  action,series,topics,existing,
}:{
  action:(prevState:FormState|undefined,formData:FormData)=>Promise<FormState|undefined>;
  series:SeriesOption[];
  topics:TopicOption[];
  existing?:SermonEditData;
}){
  const [state,formAction,pending]=useActionState(action,initialState);

  return (
    <form action={formAction} className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
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
          <select name="series_id" defaultValue={existing?.series_id??""} className={inputClass}>
            <option value="">— No series —</option>
            {series.map(s=><option key={s.id} value={s.id}>{s.title}</option>)}
          </select>
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
          {existing?.image_url&&<img src={existing.image_url} alt="" className="mb-2 aspect-video w-full rounded-xl object-cover"/>}
          <input name="image" type="file" accept="image/*" className={fileClass}/>
          <p className="mt-1 text-xs text-white/30">{existing?"Leave empty to keep the current image.":"JPG or PNG recommended."}</p>
        </Field>

        <Field label="Audio file (MP3)">
          {existing?.audio_url&&<audio controls src={existing.audio_url} className="mb-2 w-full"/>}
          <input name="audio" type="file" accept="audio/*" className={fileClass}/>
          <p className="mt-1 text-xs text-white/30">{existing?"Leave empty to keep the current audio.":"Keep under ~48MB (compressed MP3)."}</p>
        </Field>

        <button type="submit" disabled={pending} className="mt-2 rounded-xl bg-[#ff0000] py-3.5 text-sm font-bold text-white transition hover:bg-[#d90000] disabled:opacity-50">
          {pending?"Saving...":existing?"Save changes":"Create sermon"}
        </button>
      </div>
    </form>
  );
}

const inputClass="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#ff0000]";
const fileClass="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70 file:mr-3 file:rounded-lg file:border-0 file:bg-[#ff0000] file:px-3 file:py-1.5 file:text-xs file:font-bold file:text-white";

function Field({label,children}:{label:string;children:React.ReactNode}){
  return (
    <div>
      <label className="text-xs font-semibold text-white/40">{label}</label>
      {children}
    </div>
  );
}
