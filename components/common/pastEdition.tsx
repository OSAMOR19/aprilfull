import Link from "next/link";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

const PastEditions = () => {
  const editions = [
    {
      id: 1,
      title: "1st Edition",
      image: "/images/edition01.png",
      location: "Victoria Island, Lagos State, Nigeria",
      description:
        "AprilFull brought together over 100 attendees from 7 states across Nigeria, featuring a vibrant mix of Web3 enthusiasts, Web2 professionals, influencers, founders, and tech learners. The event delivered keynote sessions from blockchain pioneers, insightful panel discussions on emerging trends, and live performances that made blockchain education fun, engaging, and highly relatable.",
    },
    {
      id: 2,
      title: "2nd Edition",
      image: "/images/edition02.png",
      location: "Ikeja, Lagos State, Nigeria",
      description:
        "This edition expanded to over 300 participants from across Nigeria and Georgia (USA), featuring a stronger educational structure built around impactful keynote speeches and engaging panel sessions. The event also included interactive workshops and networking opportunities, all supported by leading Web3 brands.",
    },
    {
      id: 3,
      title: "3rd Edition",
      image: "/images/edition03.png",
      location: "Asaba, Delta State, Nigeria",
      description:
        "Attendance grew to over 500 participants - the highest recorded turnout for any Web3 event in the state.",
    },
  ];

  const EditionCards = ({
    img,
    title,
    location,
    description,
  }: {
    img: string;
    title: string;
    location: string;
    description: string;
  }) => {
    return (
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10 mt-10 text-black dark:text-white">
        <div
          style={{
            background: `url(${img})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          className="w-full lg:w-[631px] h-[391px] rounded-2xl overflow-hidden"
        >
          {/* overlay */}
          <div className="h-full flex flex-col justify-end p-6 ">
            <Link
              href={"/gallery"}
              className="text-white lg:w-40 inline-flex items-center gap-2 font-medium text-lg border-2 p-3 rounded-2xl border-white cursor-pointer"
            >
              View Gallery <FaArrowRightLong />
            </Link>
          </div>
        </div>
        <div className="w-full lg:w-[500px] px-5">
          {/* content  */}
          <h3 className="text-2xl font-bold mt-6">{title}</h3>
          <p className="  mt-2">{location}</p>
          <p className="  mt-4">{description}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="py-16 bg-white dark:bg-linear-to-br dark:from-purple-900 dark:via-gray-900 dark:to-black">
      <h3 className="text-3xl font-black text-center">Past Editions</h3>
      <div className="max-w-7xl mx-auto">
        {editions.map((edition) => (
          <EditionCards
            key={edition.id}
            img={edition.image}
            title={edition.title}
            location={edition.location}
            description={edition.description}
          />
        ))}
      </div>
    </div>
  );
};

export default PastEditions;
