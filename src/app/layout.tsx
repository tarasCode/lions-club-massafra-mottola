import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import LayoutWrapper from "@/components/LayoutWrapper";
import { ToastProvider } from "@/components/Toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["700", "800"],
});

export const metadata: Metadata = {
  title: "Lions Club Massafra-Mottola Le Cripte",
  description:
    "Lions Club Massafra-Mottola Le Cripte ODV - Noi Serviamo. Organizzazione di volontariato dedita al servizio delle comunità di Massafra e Mottola. Fondata nel 1992.",
  keywords:
    "Lions Club, Massafra, Mottola, ODV, volontariato, servizio comunità, Puglia",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#003366" />
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <ToastProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </ToastProvider>
      </body>
    </html>
  );
}
