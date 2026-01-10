import "./globals.css";
import { Metadata } from "next";
import { polysans } from "./font";
import { ThemeProvider } from "next-themes";
import { Navbar } from "@/components/Layout/Navbar";
import { FooterWithContact } from "@/components/Layout/Footer";

export const metadata: Metadata = {
  title: {
    template: "Cre8core - %s",
    default: "Cre8core",
  },
  description:
    "Send, Spend, Shop Perform cross-border transaction with ease on Cre8core.",
  icons: { icon: "/images/favicon.png" },
  keywords: [
    "cross-border payments",
    "NFC",
    "NFC payments",
    "Contactless payments",
    "QR payments",
    "international money transfer",
    "send money to Africa",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
