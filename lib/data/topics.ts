import {supabase} from "@/lib/supabase/server";

export async function getAllTopics():Promise<string[]>{
  const {data,error}=await supabase.from("topics").select("name").order("name",{ascending:true});
  if(error){console.error("getAllTopics:",error.message);return [];}
  return (data??[]).map(t=>t.name);
}
