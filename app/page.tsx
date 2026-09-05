import { SkipIntro } from "@/components/layout/SkipIntro";
import { CinematicOpening } from "@/components/opening/CinematicOpening";
import { HeroVideoScrub } from "@/components/opening/HeroVideoScrub";
import { OpeningContinue } from "@/components/opening/OpeningContinue";

export default function Home() {
  return (
    <main className="relative">
      <SkipIntro />
      <HeroVideoScrub />
      <CinematicOpening />
      <OpeningContinue />
    </main>
  );
}
