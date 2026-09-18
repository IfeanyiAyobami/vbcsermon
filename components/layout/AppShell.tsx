import {Sidebar} from "@/components/layout/Sidebar";
import {Topbar} from "@/components/layout/Topbar";
import {MobileTopBar} from "@/components/layout/MobileTopBar";
import {MobileNav} from "@/components/layout/MobileNav";
import {Footer} from "@/components/layout/Footer";
import {AudioPlayerProvider} from "@/components/sermon/AudioPlayerProvider";

export function AppShell({children}:{children:React.ReactNode}){
  return (
    <AudioPlayerProvider>
    <div className="min-h-screen bg-[var(--vbc-black)]">
      <Sidebar/>
      <MobileTopBar/>
      <div className="lg:pl-60">
        <Topbar/>
        <main className="pb-20 lg:pb-0">{children}</main>
        <Footer/>
      </div>
      <MobileNav/>
    </div>
    </AudioPlayerProvider>
  );
}
