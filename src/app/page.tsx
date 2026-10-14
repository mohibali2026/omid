import { HomeHero } from "@/components/home-hero";
import { HomeStory } from "@/components/home-story";

export default function Home() {
  return (
    <main className="flex-1">
      <HomeHero />
      <HomeStory />
    </main>
  );
}
