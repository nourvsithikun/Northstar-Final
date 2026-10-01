import { AppShell } from "@/components/layout/app-shell";
import { ApiErrorState } from "@/components/ui/api-error";

export default function NotFound() {
  return <AppShell><section className="section page-state-section"><div className="container"><ApiErrorState title="We couldn’t find that page" message="The course or page may have moved, or the link may be incorrect." /></div></section></AppShell>;
}
