import localFont from "next/font/local";

export const montserrat = localFont({
  variable: "--font-montserrat", // <— name of the CSS custom property
  display: "swap",
  src: [
    {
      path: "../public/fonts/Montserrat-VariableFont_wght.ttf",
      weight: "100 900",
      style: "normal",
    },
  ],
});

export const roboto = localFont({
  variable: "--font-roboto", // <— name of the CSS custom property
  display: "swap",
  src: [
    {
      path: "../public/fonts/Roboto-VariableFont_wdth,wght.ttf",
      weight: "100 900",
      style: "normal",
    },
  ],
});

export const nunito = localFont({
  variable: "--font-nunito", // <— name of the CSS custom property
  display: "swap",
  src: [
    {
      path: "../public/fonts/NunitoSans-VariableFont_YTLC,opsz,wdth,wght.ttf",
      weight: "100 900",
      style: "normal",
    },
  ],
});
export const polysans = localFont({
  variable: "--font-polysans", // <— name of the CSS custom property
  display: "swap",
  src: [
    {
      path: "../public/fonts/polysanstrial-slim.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/polysanstrial-neutral.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/polysanstrial-bulky.otf",
      weight: "700",
      style: "normal",
    },
  ],
});
