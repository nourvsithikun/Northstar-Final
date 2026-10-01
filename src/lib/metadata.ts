import type { Metadata } from "next";

export const SITE_NAME = "Northstar Learning";
export const SITE_DESCRIPTION =
  "Discover practical technology courses and learn one clear lesson at a time.";

function normalizeSiteUrl(value: string) {
  const url = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  return url.replace(/\/$/, "");
}

const deployedSiteUrl =
  process.env.URL ??
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.VERCEL_PROJECT_PRODUCTION_URL ??
  process.env.VERCEL_URL ??
  "http://localhost:3000";

export const SITE_URL = normalizeSiteUrl(deployedSiteUrl);

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
}

export function createPageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: PageMetadataOptions): Metadata {
  const socialTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: socialTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
    },
  };
}
