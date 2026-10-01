import { AppShell } from "@/components/layout/app-shell";
import { CourseExplorer } from "@/components/courses/course-explorer";
import { ApiErrorState } from "@/components/ui/api-error";
import { courseApi } from "@/lib/api/courses";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Explore courses",
  description: "Browse practical technology courses from the live course catalog.",
  path: "/courses",
});

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; topic?: string }>;
}) {
  const query = await searchParams;
  const courses = await courseApi.getAll().catch(() => null);

  if (!courses) {
    return (
      <AppShell>
        <section className="section page-state-section"><div className="container"><ApiErrorState /></div></section>
      </AppShell>
    );
  }

  const allowedTopics = [
    "Frontend",
    "Backend",
    "Data & AI",
    "Cloud & DevOps",
    "Foundations",
    "Design",
  ] as const;
  const initialTopic = allowedTopics.find((topic) => topic === query.topic) ?? "All";

  return (
    <AppShell>
      <section className="catalog-hero">
        <div className="container catalog-hero-inner">
          <span className="eyebrow">Course catalog</span>
          <h1>Learn the skills shaping tomorrow.</h1>
          <p>Browse focused courses in development, data, cloud, design, and more.</p>
        </div>
      </section>
      <section className="section catalog-section">
        <div className="container">
          <CourseExplorer courses={courses} initialQuery={query.q ?? ""} initialTopic={initialTopic} />
        </div>
      </section>
    </AppShell>
  );
}
