import { HomeBentoSection } from "./_sections/bento";
import { HomeCTASection } from "./_sections/cta";
import { HomeHeroSection } from "./_sections/hero";

export default function HomePage() {
    return (
        <main className="flex min-h-screen flex-col gap-y-8 py-4 md:gap-y-12 md:py-8">
            <HomeHeroSection />
            <HomeBentoSection />
            <HomeCTASection />
        </main>
    );
}
