"use client";
import {createClient} from "@/lib/supabase/client";

/**
 * Uploads a file directly from the browser to Supabase Storage, bypassing
 * Next.js's Server Actions entirely (which sidesteps their body-size limit)
 * and giving real upload progress via XMLHttpRequest.
 */
export function uploadWithProgress(bucket:string,file:File,onProgress:(pct:number)=>void):Promise<string>{
  return new Promise((resolve,reject)=>{
    (async()=>{
      try {
      const supabase=createClient();
      const {data:{session}}=await supabase.auth.getSession();
      if(!session){reject(new Error("You're signed out — please log in again."));return;}

      const supabaseUrl=process.env.NEXT_PUBLIC_SUPABASE_URL!;
      const anonKey=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
      const ext=file.name.split(".").pop()||"bin";
      const path=`${crypto.randomUUID()}.${ext}`;

      const xhr=new XMLHttpRequest();
      xhr.open("POST",`${supabaseUrl}/storage/v1/object/${bucket}/${path}`);
      xhr.setRequestHeader("Authorization",`Bearer ${session.access_token}`);
      xhr.setRequestHeader("apikey",anonKey);
      xhr.setRequestHeader("Content-Type",file.type||"application/octet-stream");
      xhr.setRequestHeader("x-upsert","false");

      xhr.upload.onprogress=(e)=>{
        if(e.lengthComputable)onProgress(Math.round((e.loaded/e.total)*100));
      };
      xhr.onload=()=>{
        if(xhr.status>=200&&xhr.status<300){
          resolve(`${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`);
        }else{
          reject(new Error(`Upload failed (${xhr.status}). ${xhr.responseText||""}`));
        }
      };
      xhr.onerror=()=>reject(new Error("Network error during upload."));
      xhr.ontimeout=()=>reject(new Error("The upload timed out. Please try again."));
      xhr.onabort=()=>reject(new Error("The upload was cancelled."));
      xhr.send(file);
      } catch (err) {
        reject(err instanceof Error ? err : new Error("Unable to start upload."));
      }
    })();
  });
}
