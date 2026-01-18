export function Logo() {
  return (
    <>
      {/* Dark mode logo */}
      <img
        src="/images/logo-white.svg"
        alt="AprilFull"
        width={120}
        height={40}
        className="h-8 w-auto hidden dark:block"
        loading="eager"
      />
      {/* Light mode logo */}
      <img
        src="/images/logo-dark.svg"
        alt="AprilFull"
        width={120}
        height={40}
        className="h-8 w-auto block dark:hidden"
        loading="eager"
      />
    </>
  );
}
