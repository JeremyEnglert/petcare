import type { Metadata } from "next";
import { DM_Serif_Display, Outfit } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { LivePreviewListener } from "@/components/live-preview-listener";
import { siteConfig } from "@/utilities/site-config";
import { mergeOpenGraph } from "@/utilities/merge-open-graph";
import { getClinicInfo } from "@/utilities/get-clinic-info";
import { getMenu } from "@/utilities/get-menu";
import { getSchemaHours } from "@/utilities/format-hours";

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
      <GoogleAnalytics gaId="G-4KPK43B46H" />
      <body
        className={`${dmSerifDisplay.variable} ${outfit.variable} antialiased bg-cream text-bark overflow-x-hidden`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'VeterinaryCare',
              name: siteConfig.name,
              description: siteConfig.description,
              url: siteConfig.url,
              telephone: clinicInfo.phone || undefined,
              email: clinicInfo.email || undefined,
              ...(clinicInfo.address?.street && {
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: clinicInfo.address.street,
                  addressLocality: clinicInfo.address.city || undefined,
                  addressRegion: clinicInfo.address.state || undefined,
                  postalCode: clinicInfo.address.zip || undefined,
                  addressCountry: 'US',
                },
              }),
              ...(() => {
                const schemaHours = getSchemaHours(clinicInfo.hours)
                return schemaHours.length > 0 ? { openingHoursSpecification: schemaHours } : {}
              })(),
              ...(clinicInfo.socialMedia && {
                sameAs: [
                  clinicInfo.socialMedia.facebook,
                  clinicInfo.socialMedia.instagram,
                  clinicInfo.socialMedia.tiktok,
                ].filter(Boolean),
              }),
              priceRange: '$$',
              image: `${siteConfig.url}/opengraph-image`,
            }),
          }}
        />
        <LivePreviewListener />
        <Header bookingUrl={clinicInfo.bookingUrl} menuItems={menu.items} />
        <main id="main-content">{children}</main>
        <Footer clinicInfo={clinicInfo} />
      </body>
    </html>
  );
}
