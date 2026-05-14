import { CircularGallery } from "@/components/ui/circular-gallery-2";
import cert1 from "@/assets/1.png";
import cert2 from "@/assets/2.png";
import cert3 from "@/assets/3.png";
import cert4 from "@/assets/4.jpg";
import cert5 from "@/assets/5.jpg";
import cert6 from "@/assets/6.jpg";
import cert7 from "@/assets/7.png";
import cert8 from "@/assets/8.png";
import cert9 from "@/assets/9.png";
import cert10 from "@/assets/10.jpg";
import cert11 from "@/assets/11.jpg";

/** @type {Array<{image: string, text: string}>} */
const galleryItems = [
  { image: cert1, text: "Bridge" },
  { image: cert2, text: "Bridge" },
  { image: cert3, text: "Bridge" },
  { image: cert4, text: "Bridge" },
  { image: cert5, text: "Bridge" },
  { image: cert6, text: "Bridge" },
  { image: cert7, text: "Bridge" },
  { image: cert8, text: "Bridge" },
  { image: cert9, text: "Bridge" },
  { image: cert10, text: "Bridge" },
  { image: cert11, text: "Bridge" },
];

export default function CircularGalleryDemo() {
  return (
    <div className="relative h-[600px] w-full rounded-lg">
      <CircularGallery
        items={galleryItems}
        bend={3}
        borderRadius={0.05}
        scrollEase={0.02}
      />
    </div>
  );
}
