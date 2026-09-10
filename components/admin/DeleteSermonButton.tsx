"use client";
import {useTransition} from "react";
import {deleteSermon} from "@/app/admin/actions";

export function DeleteSermonButton({id,title}:{id:string;title:string}){
  const [pending,startTransition]=useTransition();

  return (
    <button
      onClick={()=>{
        if(confirm(`Delete "${title}"? This can't be undone.`)){
          startTransition(()=>{deleteSermon(id);});
        }
      }}
      disabled={pending}
      className="text-xs font-semibold text-red-400 transition hover:underline disabled:opacity-50"
    >
      {pending?"Deleting…":"Delete"}
    </button>
  );
}
