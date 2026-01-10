"use client";

import React, { useState } from "react";

const Gallery = () => {
  const tabs = ["First Edition", "Second Edition", "Third Edition"];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const Images = [
    {
      src: "/images/gallery 1.png",
      edition: "First Edition",
    },

    {
      src: "/images/gallery2.png",
      edition: "First Edition",
    },
    {
      src: "/images/gallery3.png",
      edition: "First Edition",
    },
    {
      src: "/images/gallery4.png",
      edition: "First Edition",
    },
    {
      src: "/images/gallery5.png",
      edition: "First Edition",
    },
    {
      src: "/images/gallery6.png",
      edition: "First Edition",
    },
    {
      src: "/images/gallery7.png",
      edition: "First Edition",
    },
    {
      src: "/images/gallery8.png",
      edition: "First Edition",
    },
    {
      src: "/images/gallery9.png",
      edition: "First Edition",
    },
    {
      src: "/images/gallery10.png",
      edition: "First Edition",
    },
    {
      src: "/images/gallery11.png",
      edition: "First Edition",
    },
    {
      src: "/images/gallery12.png",
      edition: "First Edition",
    },
    {
      src: "/images/gallery13.png",
      edition: "First Edition",
    },
    {
      src: "/images/gallery14.png",
      edition: "First Edition",
    },
    {
      src: "/images/gallery15.png",
      edition: "Second Edition",
    },
    {
      src: "/images/gallery16.png",
      edition: "Second Edition",
    },
    {
      src: "/images/gallery17.png",
      edition: "Second Edition",
    },
    {
      src: "/images/gallery18.png",
      edition: "Second Edition",
    },
    {
      src: "/images/gallery19.png",
      edition: "Second Edition",
    },
    {
      src: "/images/gallery20.png",
      edition: "Second Edition",
    },
    {
      src: "/images/gallery21.png",
      edition: "Second Edition",
    },
    {
      src: "/images/gallery22.png",
      edition: "Second Edition",
    },
    {
      src: "/images/gallery23.png",
      edition: "Second Edition",
    },
    {
      src: "/images/gallery24.png",
      edition: "Second Edition",
    },
    {
      src: "/images/gallery25.png",
      edition: "Second Edition",
    },
    {
      src: "/images/gallery26.png",
      edition: "Second Edition",
    },
    {
      src: "/images/gallery27.png",
      edition: "Third Edition",
    },
    {
      src: "/images/gallery28.png",
      edition: "Third Edition",
    },
    {
      src: "/images/gallery29.png",
      edition: "Third Edition",
    },
    {
      src: "/images/gallery30.png",
      edition: "Third Edition",
    },
    {
      src: "/images/gallery31.png",
      edition: "Third Edition",
    },
    {
      src: "/images/gallery32.png",
      edition: "Third Edition",
    },
    {
      src: "/images/gallery33.png",
      edition: "Third Edition",
    },
    {
      src: "/images/gallery34.png",
      edition: "Third Edition",
    },
    {
      src: "/images/gallery35.png",
      edition: "Third Edition",
    },
    {
      src: "/images/gallery36.png",
      edition: "Third Edition",
    },
    {
      src: "/images/gallery37.png",
      edition: "Third Edition",
    },
    {
      src: "/images/gallery38.png",
      edition: "Third Edition",
    },
    {
      src: "/images/gallery39.png",
      edition: "Third Edition",
    },
    {
      src: "/images/gallery40.png",
      edition: "Third Edition",
    },
  ];

  const firstEditionImages = Images.filter(
    (image) => image.edition === "First Edition"
  );

  const secondEditionImages = Images.filter(
    (image) => image.edition === "Second Edition"
  );

  const thirdEditionImages = Images.filter(
    (image) => image.edition === "Third Edition"
  );

  const renderContent = () => {
    switch (activeTab) {
      case "First Edition":
        return (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {firstEditionImages.map((image, index) => (
                <div
                  key={index}
                  className="w-full flex items-center justify-center"
                >
                  <img
                    src={image.src}
                    alt="Gallery Image 2"
                    className="w-full h-[370px] object-cover rounded-lg"
                  />
                  ,
                </div>
              ))}
            </div>
          </div>
        );
      case "Second Edition":
        return (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {secondEditionImages.map((image, index) => (
                <div
                  key={index}
                  className="w-full flex items-center justify-center"
                >
                  <img
                    src={image.src}
                    alt="Gallery Image 2"
                    className="w-full h-[370px] object-cover rounded-lg"
                  />
                  ,
                </div>
              ))}
            </div>
          </div>
        );
      case "Third Edition":
        return (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {thirdEditionImages.map((image, index) => (
                <div
                  key={index}
                  className="w-full flex items-center justify-center"
                >
                  <img
                    src={image.src}
                    alt="Gallery Image 2"
                    className="w-full h-[370px] object-cover rounded-lg"
                  />
                  ,
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pt-32 dark:bg-linear-to-tl dark:from-purple-900 dark:via-gray-900 dark:to-black bg-white text-white p-8">
      <div className=" w-full flex flex-col items-center">
        <div className=" inline-flex items-center justify-center gap-2 p-3 shadow-2xl bg-[#150C18] rounded-2xl mb-12">
          {/* Tabs Gallery Page */}
          {tabs.map((tab) => (
            <div
              key={tab}
              className={`px-4 py-2 border ${
                activeTab === tab ? "border-purple-400 bg-purple-400" : "border"
              } rounded-2xl text-sm cursor-pointer hover:bg-purple-600/50 transition`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </div>
          ))}
        </div>
        <div className="w-full">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Gallery;
