import {Hero} from "@/components/sections/Hero";
import {LatestSermons} from "@/components/sections/LatestSermons";
import {ContinueListening} from "@/components/sections/ContinueListening";
import {AllSermons} from "@/components/sections/AllSermons";
import {FeaturedSeries} from "@/components/sections/FeaturedSeries";
import {getFeaturedSermons} from "@/lib/data/sermons";

export const revalidate=60;

export default async function HomePage(){
  const heroSlides=await getFeaturedSermons();

  return (
    <>
      <Hero slides={heroSlides}/>
      <ContinueListening/>
      <LatestSermons/>
      <AllSermons/>
      <FeaturedSeries/>
    </>
  );
}
