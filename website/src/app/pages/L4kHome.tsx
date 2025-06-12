import { L4kTopBar } from "../components/L4kTopBar";
import { L4kNav } from "../components/L4kNav";
import { L4kAgeSelect } from "../components/L4kAgeSelect";
import { L4kHero } from "../components/L4kHero";
import { L4kAbout } from "../components/L4kAbout";

export function L4kHome() {
  return (
    <div className="min-h-screen">
      <L4kTopBar />
      <L4kNav />
      <L4kAgeSelect />
      <L4kHero />
      <L4kAbout />
    </div>
  );
} 