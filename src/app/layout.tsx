import type { Metadata } from "next";
import {
  createPageMetadata,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/metadata";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...createPageMetadata({
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    path: "/",
    absoluteTitle: true,
  }),
  title: {
    default: "Northstar Learning",
    template: "%s | Northstar Learning",
  },
  applicationName: SITE_NAME,
  keywords: ["online learning", "technology courses", "programming lessons"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
