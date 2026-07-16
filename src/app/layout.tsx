import { Be_Vietnam_Pro, Plus_Jakarta_Sans } from "next/font/google";

import { AppHeader } from "@/components/layout/app-header";
import { BottomNav } from "@/components/layout/bottom-nav";
import { AppProviders } from "@/components/shared/app-providers";

import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-headline",
  weight: ["400", "500", "700", "800"],
  display: "swap",
});

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata = {
  title: "Farewell, Paska! 👋",
  description: "Paska is leaving CMK for Tripatra on July 17. Leave a note on his farewell wall!",
  openGraph: {
    title: "Farewell, Paska! 👋",
    description: "Paska is leaving CMK for Tripatra on July 17. Leave a note on his farewell wall!",
    images: [{ url: "/og", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Farewell, Paska! 👋",
    description: "Paska is leaving CMK for Tripatra on July 17. Leave a note on his farewell wall!",
    images: ["/og"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${plusJakarta.variable} ${beVietnam.variable} h-full antialiased`}
    >
      <body className="overflow-x-hidden bg-[#f9f9f9] text-[#1b1b1b]">
        <AppProviders>
          <AppHeader />
          {/* pt-[108px] accounts for fixed ticker (~36px) + pill header (~56px) + gap */}
          <main className="relative min-h-screen pt-[108px] pb-28">
            {children}
          </main>
          <BottomNav />
        </AppProviders>
      </body>
    </html>
  );
}
