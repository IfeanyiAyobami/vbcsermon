import {Hero} from "@/components/sections/Hero";
import {LatestSermons} from "@/components/sections/LatestSermons";
import {AllSermons} from "@/components/sections/AllSermons";
import {FeaturedSeries} from "@/components/sections/FeaturedSeries";

export default function HomePage(){
  return (
    <>
      <Hero/>
      <LatestSermons/>
      <AllSermons/>
      <FeaturedSeries/>
    </>
  );
}
