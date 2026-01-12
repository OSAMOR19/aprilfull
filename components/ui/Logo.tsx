// components/ui/Logo.tsx
import Link from "next/link";
import Image from "next/image";

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      {/* Light mode logo */}
      <Image
        src="/public/images/Logo.svg"
        alt="AprilFull"
        width={120}
        height={40}
        className="h-8 w-auto block dark:hidden"
        priority
        loading="eager"
      />

      {/* Dark mode logo */}
      <Image
        src="/public/images/Logo-white.svg"
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
