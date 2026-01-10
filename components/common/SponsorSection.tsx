// components/home/SponsorsSection.tsx
import Image from "next/image";

const sponsors = [
  { id: 1, name: "Bitget Wallet", logo: "/images/logos/bitget.png" },
  { id: 2, name: "Avalanche", logo: "/images/logos/avalanche.png" },
  { id: 3, name: "Asset Chain", logo: "/images/logos/assetchain.png" },
  { id: 4, name: "CoinEx", logo: "/images/logos/coinex.png" },
  { id: 5, name: "Vent", logo: "/images/logos/vent.png" },
];

export function SponsorsSection() {
  return (
    <section className="py-20 bg-black dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
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
