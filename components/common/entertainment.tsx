// components/home/EntertainmentSection.tsx
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function EntertainmentSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="md:py-20 py-5 bg-linear-to-br from-gray-50 to-purple-50 dark:bg-linear-to-tl dark:from-purple-900 dark:via-gray-900 dark:to-black"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Column - Purple Card */}
          <div
            className={`bg-linear-to-br from-purple-400 via-purple-500 to-purple-600 rounded-3xl p-8 md:p-10 lg:p-12 h-full flex flex-col transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="flex-1">
              <h2 className=" text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-black leading-[1.1] ">
                Entertain <span className="text-white">-</span>
                <br />
                Ment
                <br />
                Matters
                <br />
                In <span className="text-white/70">WEB3</span>
              </h2>
            </div>

            <div className="space-y-4 text-black">
              <p className="text-sm md:text-base lg:text-xl leading-relaxed">
                Entertainment is the emotional vehicle that carries the message
                of Web3 adoption and B3T has mastered this blend like no other
                event.
              </p>

              <p className="text-sm md:text-base lg:text-xl leading-relaxed">
                By integrating performances, comedy, influencers, and gamified
                interaction
              </p>
            </div>
          </div>

          {/* Right Column - Stacked Cards */}
          <div className="flex flex-col gap-6 lg:gap-8">
            {/* Text Card */}
            <div
              className={`bg-[#F3E7FF] text-black rounded-3xl p-8 md:p-10 transition-all duration-700 delay-200 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="space-y-4">
                <p className="text-sm md:text-base lg:text-lg leading-relaxed">
                  AprilFull combines blockchain education with dynamic
                  entertainment, to deliver an unparalleled experience for
                  attendees.
                </p>

                <p className="text-sm md:text-base lg:text-lg leading-relaxed">
                  By integrating education with engagement, Aprilfull ensures
                  participants remain captivated, while gaining invaluable
                  insights about Web3.
                </p>

                <p className="text-sm md:text-base lg:text-lg leading-relaxed">
                  B3T continues to redefine how blockchain knowledge is shared
                  on the continent.
                </p>
              </div>
            </div>

            {/* Image Card */}
            <div
              className={`relative h-[280px] md:h-[320px] lg:h-[350px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 delay-400 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <Image
                src="/images/enter01.png"
                alt="Happy event attendees enjoying the show"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
