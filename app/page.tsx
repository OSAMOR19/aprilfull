import { EntertainmentSection } from "@/components/common/entertainment";
import { FAQSection } from "@/components/common/FAQs";
import GetInTouch from "@/components/common/getInTouch";
import { HeroSection } from "@/components/common/Herosection";
import { ImageGallery } from "@/components/common/ImageGallery";
import ImgScroll from "@/components/common/imgScroll";
import PastEditions from "@/components/common/pastEdition";
import { ReachSection } from "@/components/common/soFar";
import { SponsorsSection } from "@/components/common/SponsorSection";
import { FooterWithContact } from "@/components/Layout/Footer";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <SponsorsSection />
      <EntertainmentSection />
      <ReachSection />
      <PastEditions />
      <ImgScroll />
      <FAQSection />
      <GetInTouch />
    </main>
  );
}
