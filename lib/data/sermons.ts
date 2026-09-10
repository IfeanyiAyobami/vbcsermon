import {supabase} from "@/lib/supabase/server";
import type {Sermon} from "@/data/sermons";

// Formats a Postgres date ('2026-08-23') into the display format used across
// the site ('August 23, 2026') — matching what the static data used to look like.
function formatDate(iso:string){
  return new Date(iso+"T00:00:00").toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"});
}

const SERMON_SELECT=`
  id, slug, title, speaker, sermon_date, duration, description, image_url, audio_url, category, featured,
  series:series_id ( slug, title ),
  sermon_topics ( topics ( name ) )
`;

// Maps a raw Supabase row into the same `Sermon` shape components already expect.
function mapSermon(row:any):Sermon{
  return {
    id:row.id,
    slug:row.slug,
    title:row.title,
    series:row.series?.title??"",
    seriesSlug:row.series?.slug??"",
    category:row.category??"",
    topics:(row.sermon_topics??[]).map((st:any)=>st.topics?.name).filter(Boolean),
    speaker:row.speaker??"",
    date:formatDate(row.sermon_date),
    duration:row.duration??"",
    description:row.description??"",
    image:row.image_url??"",
    audioUrl:row.audio_url??undefined,
    featured:row.featured??false,
  };
}

export async function getAllSermons():Promise<Sermon[]>{
  const {data,error}=await supabase.from("sermons").select(SERMON_SELECT).order("sermon_date",{ascending:false});
  if(error){console.error("getAllSermons:",error.message);return [];}
  return (data??[]).map(mapSermon);
}

export async function getLatestSermons(limit=3):Promise<Sermon[]>{
  const {data,error}=await supabase.from("sermons").select(SERMON_SELECT).order("sermon_date",{ascending:false}).limit(limit);
  if(error){console.error("getLatestSermons:",error.message);return [];}
  return (data??[]).map(mapSermon);
}

export async function getFeaturedSermons():Promise<Sermon[]>{
  const {data,error}=await supabase.from("sermons").select(SERMON_SELECT).eq("featured",true).order("sermon_date",{ascending:false});
  if(error){console.error("getFeaturedSermons:",error.message);return [];}
  return (data??[]).map(mapSermon);
}

export async function getSermonBySlug(slug:string):Promise<Sermon|null>{
  const {data,error}=await supabase.from("sermons").select(SERMON_SELECT).eq("slug",slug).maybeSingle();
  if(error){console.error("getSermonBySlug:",error.message);return null;}
  return data?mapSermon(data):null;
}

export async function getSermonsBySeriesSlug(seriesSlug:string):Promise<Sermon[]>{
  const all=await getAllSermons();
  return all.filter(s=>s.seriesSlug===seriesSlug);
}

export async function getSermonsByTopic(topicName:string):Promise<Sermon[]>{
  const all=await getAllSermons();
  return all.filter(s=>s.topics.some(t=>t.toLowerCase()===topicName.toLowerCase()));
}

export async function searchSermons(query:string):Promise<Sermon[]>{
  const all=await getAllSermons();
  const v=query.trim().toLowerCase();
  if(!v)return all;
  return all.filter(s=>`${s.title} ${s.series} ${s.category} ${s.topics.join(" ")} ${s.description}`.toLowerCase().includes(v));
}
