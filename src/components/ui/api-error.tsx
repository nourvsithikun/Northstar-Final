import Link from "next/link";
import { Icon } from "@/components/ui/icon";

export function ApiErrorState({
  title = "We couldn’t load this right now",
  message = "The course service may be temporarily unavailable. Please try again in a moment.",
}: {
  title?: string;
  message?: string;
}) {
  return (
    <div className="empty-state api-error-state">
      <span className="empty-icon"><Icon name="compass" /></span>
      <h1>{title}</h1>
      <p>{message}</p>
      <div className="empty-actions">
        <Link className="button button-primary" href="/courses">
          Browse courses
        </Link>
        <Link className="button button-secondary" href="/">
          Return home
        </Link>
      </div>
    </div>
  );
}
