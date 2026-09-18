"use server";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {createAdminClient} from "@/lib/supabase/admin-server";

// ─────────────────────────────────────────────
// AUTH
// ─────────────────────────────────────────────
export async function signIn(_prevState:unknown,formData:FormData){
  const email=String(formData.get("email"));
  const password=String(formData.get("password"));
  const supabase=await createAdminClient();

  const {error}=await supabase.auth.signInWithPassword({email,password});
  if(error)return {error:error.message};

  redirect("/admin");
}

export async function signOut(){
  const supabase=await createAdminClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

// ─────────────────────────────────────────────
// SERMON CRUD
// Note: audio/image files are uploaded directly from the browser to Supabase
// Storage (see lib/uploadWithProgress.ts) before these actions ever run — that
// gives real upload progress and avoids Server Actions' request body limit.
// These actions only ever receive the resulting URLs as plain text fields.
// ─────────────────────────────────────────────
function slugify(title:string){
  return title.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");
}

// Resolves the series_id field from the form. If "__new__" was chosen, creates
// a fresh series row first (using new_series_title, and the sermon's own thumbnail
// as the series thumbnail) and returns its real id.
async function resolveSeriesId(supabase:Awaited<ReturnType<typeof createAdminClient>>,formData:FormData,imageUrl:string|null):Promise<string|null|{error:string}>{
  const raw=String(formData.get("series_id")||"");
  if(!raw)return null;
  if(raw!=="__new__")return raw;

  const newTitle=String(formData.get("new_series_title")||"").trim();
  if(!newTitle)return {error:"Enter a name for the new series."};

  const dateLabel=new Date().toLocaleDateString("en-US",{month:"short",year:"numeric"});
  const {data,error}=await supabase.from("series").insert({
    slug:slugify(newTitle),
    title:newTitle,
    description:"",
    message_count:1,
    featured:false,
    date_label:dateLabel,
    image_url:imageUrl,
  }).select("id").single();

  if(error)return {error:`Couldn't create series: ${error.message}`};
  return data.id;
}

export async function createSermon(_prevState:unknown,formData:FormData){
  const supabase=await createAdminClient();

  const title=String(formData.get("title")||"");
  const speaker=String(formData.get("speaker")||"");
  const sermonDate=String(formData.get("sermon_date")||"");
  const duration=String(formData.get("duration")||"");
  const category=String(formData.get("category")||"");
  const description=String(formData.get("description")||"");
  const topicIds=formData.getAll("topic_ids") as string[];

  const imageUrl=String(formData.get("image_url")||"")||null;
  const audioUrl=String(formData.get("audio_url")||"")||null;

  const seriesResult=await resolveSeriesId(supabase,formData,imageUrl);
  if(seriesResult&&typeof seriesResult==="object")return seriesResult;
  const seriesId=seriesResult;

  const {data:sermon,error}=await supabase.from("sermons").insert({
    slug:slugify(title),
    title,
    series_id:seriesId,
    speaker,
    sermon_date:sermonDate,
    duration,
    category,
    description,
    image_url:imageUrl,
    audio_url:audioUrl,
  }).select("id").single();

  if(error){return {error:error.message};}

  if(topicIds.length>0){
    await supabase.from("sermon_topics").insert(topicIds.map(topicId=>({sermon_id:sermon.id,topic_id:topicId})));
  }

  revalidatePath("/","layout");
  redirect("/admin");
}

export async function updateSermon(sermonId:string,_prevState:unknown,formData:FormData){
  const supabase=await createAdminClient();

  const title=String(formData.get("title")||"");
  const speaker=String(formData.get("speaker")||"");
  const sermonDate=String(formData.get("sermon_date")||"");
  const duration=String(formData.get("duration")||"");
  const category=String(formData.get("category")||"");
  const description=String(formData.get("description")||"");
  const topicIds=formData.getAll("topic_ids") as string[];

  // Only present if a NEW file was uploaded — empty means "keep the existing one".
  const newImageUrl=String(formData.get("image_url")||"")||null;
  const newAudioUrl=String(formData.get("audio_url")||"")||null;

  const seriesResult=await resolveSeriesId(supabase,formData,newImageUrl);
  if(seriesResult&&typeof seriesResult==="object")return seriesResult;
  const seriesId=seriesResult;

  const update:Record<string,unknown>={
    title,series_id:seriesId,speaker,sermon_date:sermonDate,duration,category,description,
  };
  if(newImageUrl)update.image_url=newImageUrl;
  if(newAudioUrl)update.audio_url=newAudioUrl;

  const {error}=await supabase.from("sermons").update(update).eq("id",sermonId);
  if(error){return {error:error.message};}

  await supabase.from("sermon_topics").delete().eq("sermon_id",sermonId);
  if(topicIds.length>0){
    await supabase.from("sermon_topics").insert(topicIds.map(topicId=>({sermon_id:sermonId,topic_id:topicId})));
  }

  revalidatePath("/","layout");
  redirect("/admin");
}

export async function deleteSermon(sermonId:string){
  const supabase=await createAdminClient();
  const {error}=await supabase.from("sermons").delete().eq("id",sermonId);
  if(error){return {error:error.message};}
  revalidatePath("/","layout");
}
