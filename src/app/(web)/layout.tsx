import type { Metadata } from "next";
import { DM_Serif_Display, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { LivePreviewListener } from "@/components/live-preview-listener";
import { siteConfig } from "@/utilities/site-config";
import { mergeOpenGraph } from "@/utilities/merge-open-graph";
import { getClinicInfo } from "@/utilities/get-clinic-info";
import { getMenu } from "@/utilities/get-menu";

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-display",
  weight: ["400"],
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: mergeOpenGraph(),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [clinicInfo, menu] = await Promise.all([getClinicInfo(), getMenu()])

  return (
    <html lang="en">
      <body
        className={`${dmSerifDisplay.variable} ${outfit.variable} antialiased bg-cream text-bark overflow-x-hidden`}
      >
        <LivePreviewListener />
        <Header bookingUrl={clinicInfo.bookingUrl} menuItems={menu.items} />
        <main id="main-content">{children}</main>
        <Footer clinicInfo={clinicInfo} />
      </body>
    </html>
  );
}
