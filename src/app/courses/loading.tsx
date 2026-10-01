import { AppShell } from "@/components/layout/app-shell";

export default function CoursesLoading() {
  return (
    <AppShell>
      <section className="catalog-hero"><div className="container catalog-hero-inner"><div className="skeleton skeleton-kicker" /><div className="skeleton skeleton-title" /><div className="skeleton skeleton-copy" /></div></section>
      <section className="section"><div className="container"><div className="skeleton skeleton-control" /><div className="course-grid">{Array.from({ length: 6 }).map((_, index) => <div className="course-card skeleton-card" key={index}><div className="skeleton skeleton-image" /><div className="course-card-body"><div className="skeleton skeleton-line small" /><div className="skeleton skeleton-line" /><div className="skeleton skeleton-line medium" /></div></div>)}</div></div></section>
    </AppShell>
  );
}
