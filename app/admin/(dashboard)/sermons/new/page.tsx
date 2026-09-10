import {SermonForm} from "@/components/admin/SermonForm";
import {getSeriesOptions,getTopicOptions} from "@/lib/data/admin";
import {createSermon} from "@/app/admin/actions";

export const dynamic="force-dynamic";

export default async function NewSermonPage(){
  const [series,topics]=await Promise.all([getSeriesOptions(),getTopicOptions()]);

  return (
    <div>
      <h1 className="vbc-display text-4xl uppercase">Add Sermon</h1>
      <SermonForm action={createSermon} series={series} topics={topics}/>
    </div>
  );
}
