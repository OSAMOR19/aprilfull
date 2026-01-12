// components/ui/Logo.tsx
import Link from "next/link";
import Image from "next/image";
import dark from "../../public/images/Logo.svg";
import light from "../../public/images/Logo-white.svg";

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      {/* Light mode logo */}
      <Image
        src={dark}
        alt="AprilFull"
        width={120}
        height={40}
        className="h-8 w-auto dark:hidden"
        priority
        loading="eager"
      />

      {/* Dark mode logo */}
      <Image
        src={light}
        alt="AprilFull"
        width={120}
        height={40}
        className="h-8 w-auto hidden dark:block"
        priority
        loading="eager"
      />
    </Link>
  );
}
