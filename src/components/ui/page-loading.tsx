import { AppShell } from "@/components/layout/app-shell";

export function PageLoading({ immersive = false }: { immersive?: boolean }) {
  const content = (
    <section className={immersive ? "learn-loading" : "section page-state-section"} aria-label="Loading page">
      <div className="loading-pulse" role="status">
        <span />
        <span />
        <span />
        <p>Loading your course…</p>
      </div>
    </section>
  );

  return immersive ? content : <AppShell>{content}</AppShell>;
}
