import type {Metadata} from "next";
import "@fontsource/anton";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/700.css";
import "@fontsource/dm-sans/800.css";
import "./globals.css";
import {AppShell} from "@/components/layout/AppShell";

export const metadata:Metadata={title:{default:"VBC Sermons",template:"%s | VBC Sermons"},description:"Explore VBC sermons, series and teaching."};

export default function RootLayout({children}:{children:React.ReactNode}){
  return (
    <html lang="en">
      <body className="font-[var(--font-body)]">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
