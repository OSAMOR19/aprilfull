// components/home/ImageGallery.tsx
import Image from "next/image";

const galleryImages = [
  {
    id: 1,
    src: "/images/gallery/event-1.jpg",
    alt: "Speaker at BET event",
  },
  {
    id: 2,
    src: "/images/gallery/event-2.jpg",
    alt: "Audience at conference",
  },
  {
    id: 3,
    src: "/images/gallery/event-3.jpg",
    alt: "Networking session",
  },
];

export function ImageGallery() {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className="relative aspect-video rounded-2xl overflow-hidden group"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              {/* Purple overlay on hover */}
              <div className="absolute inset-0 bg-purple-600/0 group-hover:bg-purple-600/20 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
