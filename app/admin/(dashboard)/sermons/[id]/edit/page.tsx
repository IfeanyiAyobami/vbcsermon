import {notFound} from "next/navigation";
import {SermonForm} from "@/components/admin/SermonForm";
import {getSeriesOptions,getTopicOptions,getSermonForEdit} from "@/lib/data/admin";
import {updateSermon} from "@/app/admin/actions";

export const dynamic="force-dynamic";

export default async function EditSermonPage({params}:{params:Promise<{id:string}>}){
  const {id}=await params;
  const [series,topics,existing]=await Promise.all([getSeriesOptions(),getTopicOptions(),getSermonForEdit(id)]);
  if(!existing)notFound();

  return (
    <div>
      <h1 className="vbc-display text-4xl uppercase">Edit Sermon</h1>
      <SermonForm action={updateSermon.bind(null,id)} series={series} topics={topics} existing={existing}/>
    </div>
  );
}
