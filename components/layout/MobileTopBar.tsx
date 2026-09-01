import Link from "next/link";

export function MobileTopBar(){
  return (
    <div className="sticky top-0 z-30 flex h-16 items-center border-b border-white/10 bg-[var(--vbc-black)]/90 px-5 backdrop-blur-xl lg:hidden">
      <Link href="/" className="vbc-display text-2xl leading-none">VBC<span className="text-[#ff0000]">.</span></Link>
    </div>
  );
}
