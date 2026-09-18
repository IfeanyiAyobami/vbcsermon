import {supabase} from "@/lib/supabase/server";
import type {SermonSeries} from "@/data/series";

function mapSeries(row:any):SermonSeries{
  return {
    id:row.id,
    slug:row.slug,
    title:row.title,
    description:row.description??"",
    date:row.date_label??"",
    image:row.image_url??"",
    count:row.message_count??0,
  };
}

export async function getFeaturedSeries():Promise<SermonSeries[]>{
  const {data,error}=await supabase.from("series").select("*").eq("featured",true).order("created_at",{ascending:true});
  if(error){console.error("getFeaturedSeries:",error.message);return [];}
  return (data??[]).map(mapSeries);
}

export async function getAllSeries():Promise<SermonSeries[]>{
  const {data,error}=await supabase.from("series").select("*").order("created_at",{ascending:false});
  if(error){console.error("getAllSeries:",error.message);return [];}
  return (data??[]).map(mapSeries);
}

export async function getSeriesBySlug(slug:string):Promise<SermonSeries|null>{
  const {data,error}=await supabase.from("series").select("*").eq("slug",slug).maybeSingle();
  if(error){console.error("getSeriesBySlug:",error.message);return null;}
  return data?mapSeries(data):null;
}
