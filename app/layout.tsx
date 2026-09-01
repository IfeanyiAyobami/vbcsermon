import type {Metadata} from "next";
import {Anton,DM_Sans} from "next/font/google";
import "./globals.css";
import {AppShell} from "@/components/layout/AppShell";
const anton=Anton({subsets:["latin"],weight:"400",variable:"--font-anton"});
const dmSans=DM_Sans({subsets:["latin"],variable:"--font-body"});
export const metadata:Metadata={title:{default:"VBC Sermons",template:"%s | VBC Sermons"},description:"Explore VBC sermons, series and teaching."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" className={`${anton.variable} ${dmSans.variable}`}><body className="font-[var(--font-body)]"><AppShell>{children}</AppShell></body></html>}