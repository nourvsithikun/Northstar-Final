import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link className="logo" href="/" aria-label="Northstar Learn home">
      <span className="logo-mark" aria-hidden="true">
        <span />
        <span />
      </span>
      {!compact && <span>Northstar</span>}
    </Link>
  );
}
