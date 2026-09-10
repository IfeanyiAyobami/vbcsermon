import Link from "next/link";
import {Plus} from "lucide-react";
import {getAllSermons} from "@/lib/data/sermons";
import {DeleteSermonButton} from "@/components/admin/DeleteSermonButton";

export const dynamic="force-dynamic";

export default async function AdminDashboardPage(){
  const sermons=await getAllSermons();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="vbc-display text-4xl uppercase">Sermons</h1>
        <Link href="/admin/sermons/new" className="flex items-center gap-2 rounded-full bg-[#ff0000] px-5 py-2.5 text-sm font-bold transition hover:bg-[#d90000]">
          <Plus size={16}/> Add sermon
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/[.04] text-white/40">
            <tr>
              <th className="px-5 py-3 font-semibold">Title</th>
              <th className="px-5 py-3 font-semibold">Series</th>
              <th className="px-5 py-3 font-semibold">Date</th>
              <th className="px-5 py-3 font-semibold">Audio</th>
              <th className="px-5 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {sermons.map(s=>(
              <tr key={s.id}>
                <td className="px-5 py-4 font-semibold">{s.title}</td>
                <td className="px-5 py-4 text-white/50">{s.series||"—"}</td>
                <td className="px-5 py-4 text-white/50">{s.date}</td>
                <td className="px-5 py-4">
                  {s.audioUrl?<span className="text-xs font-semibold text-green-400">Uploaded</span>:<span className="text-xs text-white/30">None yet</span>}
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="flex items-center justify-end gap-4">
                    <Link href={`/admin/sermons/${s.id}/edit`} className="text-xs font-semibold text-white/60 hover:text-white">Edit</Link>
                    <DeleteSermonButton id={s.id} title={s.title}/>
                  </div>
                </td>
              </tr>
            ))}
            {sermons.length===0&&(
              <tr><td colSpan={5} className="px-5 py-10 text-center text-white/30">No sermons yet — add your first one.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
