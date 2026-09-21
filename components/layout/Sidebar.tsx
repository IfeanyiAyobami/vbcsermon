"use client";
import Link from "next/link";
import Image from "next/image";
import {usePathname} from "next/navigation";
import {Home,Radio,Clapperboard,ExternalLink,ListMusic} from "lucide-react";

const navLinks=[
  {label:"Home",href:"/",icon:Home},
  {label:"Live",href:"/live",icon:Radio},
  {label:"Series",href:"/series",icon:Clapperboard},
  {label:"Playlists",href:"/playlists",icon:ListMusic},
];

export function Sidebar(){
  const pathname=usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col border-r border-white/10 bg-[var(--vbc-panel)] lg:flex">
      <Link href="/" className="flex h-[78px] shrink-0 items-center border-b border-white/10 px-7">
        <Image src="/images/brand/vine-branch-tv-logo-cropped.png" alt="Vine Branch TV" width={747} height={576} className="h-14 w-auto object-contain"/>
      </Link>

      <nav className="flex flex-1 flex-col gap-1.5 p-4">
        {navLinks.map(l=>{
          const active=l.href==="/"?pathname==="/":pathname.startsWith(l.href);
          const Icon=l.icon;
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`flex items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-semibold transition ${active?"bg-[#ff0000] text-white":"text-white/55 hover:bg-white/5 hover:text-white"}`}
            >
              <Icon size={19}/>
              {l.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-4">
        <a href="https://www.vinebranchurch.org/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-semibold text-white/55 transition hover:bg-white/5 hover:text-white">
          <ExternalLink size={19}/>
          Visit VBC
        </a>
      </div>
    </aside>
  );
}
