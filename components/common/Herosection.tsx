import Image from "next/image";

export function HeroSection() {
  return (
    <div className="w-full md:min-h-screen">
      {/* Hero Content Section */}
      <section
        style={{
          clipPath: "ellipse(90% 100% at 50% 0%)",
        }}
        className="relative h-[500px] md:h-[750px] flex items-center justify-center bg-linear-to-br dark:from-purple-900 dark:via-gray-900 dark:to-black from-purple-50 to-white via-purple-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 relative">
          <div className="inline-block">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black">
              <span className="text-black dark:text-white">Blockchain </span>
              <span className="text-purple-400">&</span>
              <br />
              <span className="text-black dark:text-white">Entertainment </span>
              <span className="dark:text-purple-400 text-black inline-flex items-center justify-center">
                (
                <img
                  src="/images/bet-dark.svg"
                  alt="Moon"
                  className="w-12 h-12 md:w-28 md:h-28 ml-2 dark:inline-block hidden"
                />
                <img
                  src="/images/bet-light.svg"
                  alt="Moon"
                  className="w-12 h-12 md:w-28 md:h-28 ml-2 dark:hidden inline-block"
                />
                )
              </span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl dark:text-gray-300 text-[#140000] mt-6 max-w-3xl mx-auto">
            Africa's Premier WEB3 entertainment event
            <br />
            where innovation meets creativity
          </p>
        </div>

        {/* SVG Curve at bottom - both curves in same direction */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden z-10 leading-0">
          <svg
            className="relative block w-full h-[100px] md:h-[150px] "
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 Q600,200 1200,0 L1200,60 Q600,300 0,60 Z"
              fill="#D1A7FF"
            />
          </svg>
        </div>
      </section>

      {/* SECTION 2: Images */}
      <div className="grid grid-cols-5 gap-0 -mt-[100px] md:-mt-[150px] -z-20 overflow-clip relative">
        <div className="h-[250px] md:h-[500px] w-full">
          <Image
            className="w-full h-full md:h-[500px] object-cover"
            src="/images/01_new.jpg"
            alt=""
            width={300}
            height={600}
            priority
            loading="eager"
          />
        </div>
        <div className="h-[250px] md:h-[500px] w-full">
          <Image
            className="w-full h-full md:h-[500px] object-cover"
            src="/images/02_new.jpg"
            alt=""
            width={300}
            height={600}
            priority
            loading="eager"
          />
        </div>
        <div className="h-[250px] md:h-[500px] w-full">
          <Image
            className="w-full h-full md:h-[500px] object-cover mt-20"
            src="/images/03_new.jpg"
            alt=""
            width={300}
            height={600}
            priority
            loading="eager"
          />
        </div>
        <div className="h-[250px] md:h-[500px] w-full">
          <Image
            className="w-full h-full md:h-[500px] object-cover mt-20 md:mt-0"
            src="/images/04_new.jpg"
            alt=""
            width={300}
            height={600}
            priority
            loading="eager"
          />
        </div>
        <div className="h-[250px] md:h-[500px] w-full">
          <Image
            className="w-full h-full md:h-[500px] object-cover"
            src="/images/05_new.jpg"
            alt=""
            width={300}
            height={600}
            priority
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
}
