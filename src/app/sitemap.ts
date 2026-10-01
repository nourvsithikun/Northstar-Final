import type { MetadataRoute } from "next";
import { courseApi } from "@/lib/api/courses";
import { SITE_URL } from "@/lib/metadata";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const courses = await courseApi.getAll().catch(() => []);
  const staticPaths = ["", "/courses", "/about", "/dashboard", "/login", "/register", "/profile"];
  const lastModified = new Date();

  return [
    ...staticPaths.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency: path === "/courses" ? ("daily" as const) : ("weekly" as const),
      priority: path === "" ? 1 : 0.7,
    })),
    ...courses.flatMap((course) => [
      {
        url: `${SITE_URL}/courses/${course._id}`,
        lastModified,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      },
      {
        url: `${SITE_URL}/learn/${course._id}`,
        lastModified,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      },
    ]),
  ];
}
