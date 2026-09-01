"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {Home,Radio,Clapperboard,Search} from "lucide-react";

const navLinks=[
  {label:"Home",href:"/",icon:Home},
  {label:"Live",href:"/live",icon:Radio},
  {label:"Series",href:"/series",icon:Clapperboard},
  {label:"Search",href:"/search",icon:Search},
];

export function MobileNav(){
  const pathname=usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-white/10 bg-[var(--vbc-panel)]/95 backdrop-blur-xl lg:hidden" style={{paddingBottom:"env(safe-area-inset-bottom)"}}>
      {navLinks.map(l=>{
        const active=l.href==="/"?pathname==="/":pathname.startsWith(l.href);
        const Icon=l.icon;
        return (
          <Link key={l.href} href={l.href} className="flex flex-1 flex-col items-center gap-1 py-3">
            <Icon size={20} className={active?"text-[#ff0000]":"text-white/45"}/>
            <span className={`text-[10px] font-semibold ${active?"text-white":"text-white/45"}`}>{l.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
