import { CircularGallery } from "@/components/ui/circular-gallery-2";

/** @type {Array<{image: string, text: string}>} */
const galleryItems = [
  { image: "/src/assets/1.png", text: "Bridge" },
  { image: "/src/assets/2.png", text: "Bridge" },
  { image: "/src/assets/3.png", text: "Bridge" },
  { image: "/src/assets/4.jpg", text: "Bridge" },
  { image: "/src/assets/5.jpg", text: "Bridge" },
  { image: "/src/assets/6.jpg", text: "Bridge" },
  { image: "/src/assets/7.png", text: "Bridge" },
  { image: "/src/assets/8.png", text: "Bridge" },
  { image: "/src/assets/9.png", text: "Bridge" },
  { image: "/src/assets/10.jpg", text: "Bridge" },
  { image: "/src/assets/11.jpg", text: "Bridge" },
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
