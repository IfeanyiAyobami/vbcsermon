import {SearchClient} from "@/components/search/SearchClient";

export default async function SearchPage({searchParams}:{searchParams:Promise<{q?:string}>}){
  const {q}=await searchParams;
  return (
    <main className="min-h-screen bg-[var(--vbc-black)] py-16 text-white lg:py-20">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <p className="text-[11px] font-bold uppercase tracking-[.32em] text-[#ff0000]">Find a message</p>
        <h1 className="vbc-display mt-3 text-6xl uppercase leading-none sm:text-8xl">Search</h1>
        <SearchClient initialQuery={q}/>
      </div>
    </main>
  );
}
