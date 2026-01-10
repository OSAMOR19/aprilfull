import React from "react";

const Team = () => {
  const teamMembers = [
    {
      name: "Edwin (Xploit)",
      role: "Convener",
      img: "/images/edwin.png",
      category: "primary",
    },
    {
      name: "Linda (Nenyenwa)",
      role: "CM/Marketing Lead",
      img: "/images/linda.png",
      category: "primary",
    },
    {
      name: "CyberZik",
      role: "Developer",
      img: "/images/cyber.png",
      category: "primary",
    },
    {
      name: "Kelechi",
      role: "Creative Lead",
      img: "/images/kelechi.png",
      category: "primary",
    },
    {
      name: "Favor Nduka",
      role: "Partnership Manager",
      img: "/images/favor.png",
      category: "primary",
    },
    {
      name: "Funmilola",
      role: "Hospitality/Welfare Lead",
      img: "/images/funmi.png",
      category: "secondary",
    },
    {
      name: "Chris",
      role: "Hospitality/Welfare Co-Lead",
      img: "/images/chris.png",
      category: "secondary",
    },
    {
      name: "Faith",
      role: "Content Lead",
      img: "/images/faith.png",
      category: "secondary",
    },
    {
      name: "Benedict (Unpredictable)",
      role: "Social Media Manager",
      img: "/images/benedict.png",
      category: "secondary",
    },
    {
      name: "Apostle Dan",
      role: "Videography Lead",
      img: "/images/apostle.png",
      category: "secondary",
    },
  ];

  return (
    <div className="min-h-screen pt-32 md:pt-20 flex items-center justify-center dark:bg-linear-to-tl dark:from-purple-900 dark:via-gray-900 dark:to-black bg-white text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center text-[#CC9CFF] mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meet the{" "}
            <span className=" text-black dark:text-white drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
              TEAM
            </span>{" "}
            building the
          </h2>
          <h3 className="text-2xl md:text-3xl font-semibold mb-2">
            biggest global blend of
          </h3>
          <h1 className="text-2xl md:text-3xl font-bold drop-shadow-[0_0_15px_rgba(168,85,247,0.7)]">
            Blockchain + Entertainment.
          </h1>
        </div>

        {/* Team Grid */}
        <div className="space-y-12">
          {/* First Row - Primary Members */}
          <div className="w-full h-full flex flex-wrap justify-center gap-6 md:gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="w-44 md:w-52 bg-transparent backdrop-blur-lg rounded-t-2xl p-2 border hover:border-purple-400 hover:shadow-[0_10px_30px_rgba(168,85,247,0.3)] transition-all duration-300 hover:-translate-y-2"
              >
                <div className=" mx-auto mb-3 rounded-t-2xl flex items-center justify-center overflow-clip">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full "
                  />
                </div>
                <div>
                  <h3 className="text-base text-[#CC9CFF] font-semibold mb-1 truncate">
                    {member.name}
                  </h3>
                  <p className="text-xs text-black dark:text-white">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
