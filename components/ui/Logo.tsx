// components/ui/Logo.tsx
import Link from "next/link";
import { useEffect, useState } from "react";

export function Logo() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Link href="/" className="flex items-center space-x-2">
      <div className="h-8 w-[120px] bg-contain bg-no-repeat bg-center bg-[url('/images/logo-dark.svg')] dark:bg-[url('/images/logo-light.svg')]" />
    </Link>
  );
}
