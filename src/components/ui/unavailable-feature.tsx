import Link from "next/link";
import { Icon } from "@/components/ui/icon";

export function UnavailableFeature({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="auth-page">
      <div className="auth-copy">
        <Link className="back-link" href="/">
          <Icon name="arrow-left" /> Back to home
        </Link>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
        <div className="notice-card">
          <span><Icon name="lock" /></span>
          <div>
            <strong>Accounts are not exposed by the current API</strong>
            <p>
              The live backend does not document sign-in, registration, users, or sessions, so this interface does not collect credentials or simulate an account.
            </p>
          </div>
        </div>
        <div className="auth-actions">
          <Link className="button button-primary" href="/courses">
            Explore the catalog <Icon name="arrow-right" />
          </Link>
          <Link className="button button-secondary" href="/dashboard">
            View device learning
          </Link>
        </div>
      </div>
      <div className="auth-visual" aria-hidden="true">
        <div className="auth-visual-card">
          <div className="mini-logo"><Icon name="book" /></div>
          <span>LEARN AT YOUR PACE</span>
          <h2>One useful lesson can change your direction.</h2>
          <div className="quote-line" />
          <p>Start with a course. Build a habit. Keep moving.</p>
        </div>
      </div>
    </section>
  );
}
