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
// FILE UPLOAD HELPERS
// ─────────────────────────────────────────────
async function uploadFile(bucket:string,file:File):Promise<string|null>{
  if(!file||file.size===0)return null;
  const supabase=await createAdminClient();
  const ext=file.name.split(".").pop();
  const path=`${crypto.randomUUID()}.${ext}`;

  const {error}=await supabase.storage.from(bucket).upload(path,file,{cacheControl:"3600",upsert:false});
  if(error){console.error(`upload to ${bucket}:`,error.message);return null;}

  const {data}=supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

// ─────────────────────────────────────────────
// SERMON CRUD
// ─────────────────────────────────────────────
function slugify(title:string){
  return title.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");
}

export async function createSermon(_prevState:unknown,formData:FormData){
  const supabase=await createAdminClient();

  const title=String(formData.get("title")||"");
  const seriesId=String(formData.get("series_id")||"")||null;
  const speaker=String(formData.get("speaker")||"");
  const sermonDate=String(formData.get("sermon_date")||"");
  const duration=String(formData.get("duration")||"");
  const category=String(formData.get("category")||"");
  const description=String(formData.get("description")||"");
  const topicIds=formData.getAll("topic_ids") as string[];

  const imageFile=formData.get("image") as File|null;
  const audioFile=formData.get("audio") as File|null;

  const imageUrl=imageFile&&imageFile.size>0?await uploadFile("sermon-images",imageFile):null;
  const audioUrl=audioFile&&audioFile.size>0?await uploadFile("sermon-audio",audioFile):null;

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
  const seriesId=String(formData.get("series_id")||"")||null;
  const speaker=String(formData.get("speaker")||"");
  const sermonDate=String(formData.get("sermon_date")||"");
  const duration=String(formData.get("duration")||"");
  const category=String(formData.get("category")||"");
  const description=String(formData.get("description")||"");
  const topicIds=formData.getAll("topic_ids") as string[];

  const imageFile=formData.get("image") as File|null;
  const audioFile=formData.get("audio") as File|null;

  const update:Record<string,unknown>={
    title,series_id:seriesId,speaker,sermon_date:sermonDate,duration,category,description,
  };

  if(imageFile&&imageFile.size>0){
    const url=await uploadFile("sermon-images",imageFile);
    if(url)update.image_url=url;
  }
  if(audioFile&&audioFile.size>0){
    const url=await uploadFile("sermon-audio",audioFile);
    if(url)update.audio_url=url;
  }

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
