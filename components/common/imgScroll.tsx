"use client";

const ImgScroll = () => {
  return (
    <div className="relative overflow-hidden bg-[#2E0C4C] py-8">
      {/* Infinite scrolling container */}
      <div className="relative">
        {/* First scrolling set */}
        <div className="flex animate-scroll space-x-4">
          {[...Array(10)].map((_, index) => (
            <div key={index} className="shrink-0">
              <img
                src="/images/scroll.png"
                alt={`Sample ${index + 1}`}
                className="rounded-lg   object-cover"
              />
            </div>
          ))}
        </div>

        {/* Duplicate set for seamless loop */}
        <div className="flex animate-scroll space-x-4 absolute top-0 left-full">
          {[...Array(10)].map((_, index) => (
            <div key={`duplicate-${index}`} className="shrink-0">
              <img
                src="/images/scroll.png"
                alt={`Sample ${index + 11}`}
                className="rounded-lg   object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        /* Pause animation on hover */
        .relative:hover .animate-scroll {
          animation-play-state: paused;
        }

        /* Gradient fade at edges */
        .relative::before,
        .relative::after {
          content: "";
          position: absolute;
          top: 0;
          width: 100px;
          height: 100%;
          z-index: 2;
          pointer-events: none;
        }

        .relative::before {
          left: 0;
          background: linear-gradient(to right, #2e0c4c 0%, transparent 100%);
        }

        .relative::after {
          right: 0;
          background: linear-gradient(to left, #2e0c4c 0%, transparent 100%);
        }
      `}</style>
    </div>
  );
};

export default ImgScroll;
