import { SimpleHeader } from "../components/SimpleHeader";
import { SimpleHeroSection } from "../components/SimpleHeroSection";
import { WaitingListCta } from "../components/WaitingListCta";
import { SimpleFooter } from "../components/SimpleFooter";
import { L4kHome } from "./L4kHome";

export function Home() {
  return (
    <>
      {/* <SimpleHeader />
      <main>
        <SimpleHeroSection />
        <WaitingListCta />
        {/* You can add more sections here later 
      </main>
      <SimpleFooter /> */}
      <L4kHome />
    </>
  );
}
