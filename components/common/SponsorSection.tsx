// components/home/SponsorsSection.tsx
import Image from "next/image";

const sponsors = [
  { id: 1, name: "Bitget Wallet", logo: "/images/sponsor 01.png" },
  { id: 2, name: "Avalanche", logo: "/images/sponsor 02.png" },
  { id: 3, name: "Asset Chain", logo: "/images/sponsor 03.png" },
  { id: 4, name: "CoinEx", logo: "/images/sponsor 04.png" },
  { id: 5, name: "Vent", logo: "/images/sponsor 05.png" },
];

export function SponsorsSection() {
  return (
    <section className="p-10 bg-black dark:bg-gray-950">
      <div className="">
        <h2 className="text-4xl  font-bold text-white text-center mb-16">
          Past Gold Sponsors
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.id}
              className="flex items-center justify-center p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
            >
              <Image
                src={sponsor.logo}
                alt={sponsor.name}
                width={150}
                height={50}
                className="h-12 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
