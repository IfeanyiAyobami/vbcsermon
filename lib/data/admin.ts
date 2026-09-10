import {createAdminClient} from "@/lib/supabase/admin-server";

export type SeriesOption={id:string;title:string};
export type TopicOption={id:string;name:string};

export async function getSeriesOptions():Promise<SeriesOption[]>{
  const supabase=await createAdminClient();
  const {data,error}=await supabase.from("series").select("id,title").order("title");
  if(error){console.error("getSeriesOptions:",error.message);return [];}
  return data??[];
}

export async function getTopicOptions():Promise<TopicOption[]>{
  const supabase=await createAdminClient();
  const {data,error}=await supabase.from("topics").select("id,name").order("name");
  if(error){console.error("getTopicOptions:",error.message);return [];}
  return data??[];
}

export type SermonEditData={
  id:string;title:string;series_id:string|null;speaker:string;sermon_date:string;
  duration:string;category:string;description:string;image_url:string|null;audio_url:string|null;
  topicIds:string[];
};

export async function getSermonForEdit(id:string):Promise<SermonEditData|null>{
  const supabase=await createAdminClient();
  const {data,error}=await supabase.from("sermons")
    .select("id,title,series_id,speaker,sermon_date,duration,category,description,image_url,audio_url,sermon_topics(topic_id)")
    .eq("id",id).maybeSingle();
  if(error||!data){if(error)console.error("getSermonForEdit:",error.message);return null;}
  return {
    id:data.id,title:data.title,series_id:data.series_id,speaker:data.speaker??"",
    sermon_date:data.sermon_date,duration:data.duration??"",category:data.category??"",
    description:data.description??"",image_url:data.image_url,audio_url:data.audio_url,
    topicIds:(data.sermon_topics??[]).map((t:any)=>t.topic_id),
  };
}
