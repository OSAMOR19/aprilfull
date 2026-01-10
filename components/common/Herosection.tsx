export function HeroSection() {
  return (
    <div className="relative">
      {/* Hero Content Section with curve cut-out */}
      <section className="relative flex items-center justify-center bg-gradient-to-br from-purple-900 via-gray-900 to-black pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 relative">
          <div className="inline-block border-2 border-cyan-400 rounded-lg p-8 mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black">
              <span className="text-white">Blockchain </span>
              <span className="text-purple-400">&</span>
              <br />
              <span className="text-white">Entertainment </span>
              <span className="text-purple-400">(BET)</span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Africa's Premier WEB3 entertainment event
            <br />
            where innovation meets creativity
          </p>
        </div>
      </section>

      {/* Very thin curve divider */}
      <div className="h-[50px] bg-red-500 z-20">
        <svg
          viewBox="0 0 1200 5"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M0,0 Q600,5 1200,0 L1200,5 L0,5 Z"
            className="fill-white dark:fill-gray-900"
          />
        </svg>
      </div>

      {/* Image Gallery Section */}
      <section className="bg-white dark:bg-gray-900 relative z-10 ">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Your images */}
            <img src="/images/01.jpg" alt="" />
            <img src="/images/01.jpg" alt="" />
            <img src="/images/01.jpg" alt="" />
          </div>
        </div>
      </section>
    </div>
  );
}
