import { SimpleHeader } from "../components/SimpleHeader";
import { SimpleHeroSection } from "../components/SimpleHeroSection";

export function Home() {
  return (
    <>
      <SimpleHeader />
      <main>
        <SimpleHeroSection />
        {/* You can add more sections here later */}
      </main>
    </>
  );
}
