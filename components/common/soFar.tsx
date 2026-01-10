// components/home/ReachSection.tsx
import Image from "next/image";

const stats = [
  {
    id: 1,
    number: "2 States",
    description: "Lagos & Delta",
  },
  {
    id: 2,
    number: "3",
    description: "Editions",
  },
  {
    id: 3,
    number: "1000+",
    description: "Attendees",
  },
];

export function ReachSection() {
  return (
    <section className="py-32 bg-linear-to-br bg-[#F8F1FD] dark:bg-[#22132d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex flex-col lg:flex-row items-center gap-10">
          {/* Left Side - Image */}
          <div className="relative h-[400px] w-full lg:h-[550px] rounded-3xl overflow-hidden">
            <Image
              src="/images/event01.jpg"
              alt="Event Audience"
              fill
              className="object-cover w-full h-full"
            />
          </div>

          <div className="lg:absolute top-0 right-0 w-full lg:w-[55%] px-4 pb-4 bg-[#F8F1FD] dark:bg-[#22132d] rounded-bl-3xl ">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-[#140000] dark:text-white mb-3">
                Our Reach So Far
              </h2>
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-3">
                Here is how far we have gone on the mission <br /> to Educate &
                Entertain
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.id}
                  className="bg-[#C17BFF] rounded-2xl p-6 text-center text-white"
                >
                  <div className="text-3xl md:text-4xl font-black mb-2 whitespace-nowrap">
                    {stat.number}
                  </div>
                  <div className="text-sm text-black md:text-base font-medium">
                    {stat.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
