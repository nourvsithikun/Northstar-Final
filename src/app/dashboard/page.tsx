import { DashboardContent } from "@/components/dashboard/dashboard-content";
import { AppShell } from "@/components/layout/app-shell";
import { ApiErrorState } from "@/components/ui/api-error";
import { courseApi } from "@/lib/api/courses";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "My learning",
  description: "Continue enrolled courses and return to your latest lessons.",
  path: "/dashboard",
});

export default async function DashboardPage() {
  const courses = await courseApi.getAll().catch(() => null);
  if (!courses) {
    return <AppShell><section className="section page-state-section"><div className="container"><ApiErrorState title="Your learning library couldn’t be loaded" /></div></section></AppShell>;
  }
  return <AppShell><DashboardContent courses={courses} /></AppShell>;
}
