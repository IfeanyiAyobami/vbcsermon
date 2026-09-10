import Link from "next/link";
import Image from "next/image";

export function MobileTopBar(){
  return (
    <div className="sticky top-0 z-30 flex h-16 items-center border-b border-white/10 bg-[var(--vbc-black)]/90 px-5 backdrop-blur-xl lg:hidden">
      <Link href="/">
        <Image src="/images/brand/vine-branch-tv-logo-cropped.png" alt="Vine Branch TV" width={747} height={576} className="h-7 w-auto"/>
      </Link>
    </div>
  );
}
