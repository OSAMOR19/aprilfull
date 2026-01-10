import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const GetInTouch = () => {
  return (
    <section className="py-20 bg-linear-to-br from-[#000000] to-[#CC9CFF] dark:from-black dark:to-[#CC9CFF] text-center px-4">
      <div className="text-center">
        <h2 className="text-5xl md:text-6xl font-black text-white mb-8">
          Get In Touch With Us
        </h2>
        <Link
          href="mailto:contact@aprilfull.com"
          className="inline-flex items-center gap-3 bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-full font-semibold transition-all hover:scale-105"
        >
          Send us a mail
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
};

export default GetInTouch;
