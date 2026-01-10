export function HeroSection() {
  return (
    <div className="w-full min-h-screen">
      <div
        className="relative"
        style={{
          clipPath: "ellipse(90% 100% at 50% 0%)",
        }}
      >
        {/* Hero Content Section with curve cut-out */}
        <section className="relative h-[650px] flex items-center justify-center bg-linear-to-tl dark:from-purple-900 dark:via-gray-900 dark:to-black from-purple-50 to-white via-purple-200 ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 relative">
            <div className="inline-block ">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black">
                <span className="text-black dark:text-white">Blockchain </span>
                <span className="text-purple-400">&</span>
                <br />
                <span className="text-black dark:text-white">
                  Entertainment{" "}
                </span>
                <span className="dark:text-purple-400 text-black inline-flex items-center justify-center">
                  (
                  <img
                    src="/images/bet-dark.svg"
                    alt="Moon"
                    className=" w-12 h-12 md:w-20 md:h-20 ml-2 dark:inline-block hidden"
                  />
                  <img
                    src="/images/bet-light.svg"
                    alt="Moon"
                    className=" w-12 h-12 md:w-20 md:h-20 ml-2 dark:hidden inline-block"
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
        </section>
      </div>
      {/* SECTION 2: Images - 500px height, NO GAPS */}
      <div className="grid grid-cols-5 gap-0 -mt-28 overflow-clip">
        <div className="h-[400px] w-full">
          <img
            className="w-full h-full object-cover"
            src="/images/01.jpg"
            alt=""
            width={300}
            height={500}
          />
        </div>
        <div className="h-[400px] w-full">
          <img
            className="w-full h-full object-cover"
            src="/images/02.png"
            alt=""
            width={300}
            height={500}
          />
        </div>
        <div className="h-[400px] w-full">
          <img
            className="w-full h-full object-center mt-9"
            src="/images/03.png"
            alt=""
            width={300}
            height={500}
          />
        </div>
        <div className="h-[400px] w-full">
          <img
            className="w-full h-full object-cover"
            src="/images/04.png"
            alt=""
            width={300}
            height={500}
          />
        </div>
        <div className="h-[400px] w-full">
          <img
            className="w-full h-full object-cover"
            src="/images/05.png"
            alt=""
            width={300}
            height={500}
          />
        </div>
      </div>
    </div>
  );
}
