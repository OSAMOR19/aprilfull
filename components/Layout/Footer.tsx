// components/layout/FooterWithContact.tsx
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { CiMail } from "react-icons/ci";
import { TfiLinkedin } from "react-icons/tfi";
import { FaTiktok, FaXTwitter } from "react-icons/fa6";

export function FooterWithContact() {
  return (
    <>
      {/* Footer */}
      <footer className="bg-black border-t border-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <Image
              src="/images/logo-light.svg"
              alt="AprilFull"
              width={120}
              height={40}
              className="h-8 w-auto "
              priority
            />
            <div className="flex gap-6">
              <a
                href="mailto:contact@aprilfull.com"
                className="text-white hover:text-purple-400"
              >
                <CiMail size={24} />
              </a>
              <a href="#" className="text-white hover:text-purple-400">
                <TfiLinkedin size={24} />
              </a>
              <a href="#" className="text-white hover:text-purple-400">
                <FaTiktok size={24} />
              </a>
              <a href="#" className="text-white hover:text-purple-400">
                <FaXTwitter size={24} />
              </a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-900 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 AprilFull. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
