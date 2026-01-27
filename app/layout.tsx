import "./globals.css";
import { Metadata } from "next";
import { polysans } from "./font";
import { ThemeProvider } from "next-themes";
import { Navbar } from "@/components/Layout/Navbar";
import { FooterWithContact } from "@/components/Layout/Footer";

export const metadata: Metadata = {
  title: {
    template: "Blockchain - %s",
    default: "Blockchain Entertainment",
  },
  description: "Blockchain Entertainment ",
  icons: { icon: "/images/favicon.png" },
  keywords: ["cross-border payments"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${polysans.variable} bg-[#F8F8F8]`}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <Navbar />
          <div className="">{children}</div>
          <FooterWithContact />
        </ThemeProvider>
      </body>
    </html>
  );
}
