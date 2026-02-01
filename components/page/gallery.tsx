"use client";

import React, { useState } from "react";
import Image from "next/image";

// Define types for better type safety
type Edition = "First Edition" | "Second Edition" | "Third Edition";

interface GalleryImage {
  src: string;
  edition: Edition;
  alt: string;
}

const Gallery = () => {
  const tabs: Edition[] = ["First Edition", "Second Edition", "Third Edition"];
  const [activeTab, setActiveTab] = useState<Edition>(tabs[0]);

  // Centralized image data
  const images: GalleryImage[] = [
    // First Edition
    ...Array.from({ length: 14 }, (_, i) => ({
      src: `/images/gallery${i === 0 ? " 1" : i + 1}.png`,
      edition: "First Edition" as Edition,
      alt: `First Edition Gallery Image ${i + 1}`,
    })),
    // Second Edition
    ...Array.from({ length: 12 }, (_, i) => ({
      src: `/images/gallery${i + 15}.png`,
      edition: "Second Edition" as Edition,
      alt: `Second Edition Gallery Image ${i + 1}`,
    })),
    // Third Edition
    ...Array.from({ length: 14 }, (_, i) => ({
      src: `/images/gallery${i + 27}.png`,
      edition: "Third Edition" as Edition,
      alt: `Third Edition Gallery Image ${i + 1}`,
    })),
  ];

  // Filter images based on active tab
  const filteredImages = images.filter((image) => image.edition === activeTab);

  return (
    <div className="min-h-screen pt-32 dark:bg-gradient-to-br dark:from-purple-900 dark:via-gray-900 dark:to-black bg-white text-white p-8">
      <div className="w-full flex flex-col items-center">
        {/* Tabs */}
        <div className="inline-flex items-center justify-center gap-2 p-3 shadow-2xl bg-[#150C18] rounded-2xl mb-12">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 border rounded-2xl text-sm transition ${
                activeTab === tab
                  ? "border-purple-400 bg-purple-400"
                  : "border-gray-600 hover:bg-purple-600/50"
              }`}
              onClick={() => setActiveTab(tab)}
              aria-pressed={activeTab === tab}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="w-full max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredImages.map((image, index) => (
              <div
                key={`${image.edition}-${index}`}
                className="relative w-full h-[370px] overflow-hidden rounded-lg group"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  loading={index < 6 ? "eager" : "lazy"}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
