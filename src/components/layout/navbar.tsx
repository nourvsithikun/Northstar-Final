"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { Logo } from "@/components/layout/logo";

const links = [
  { href: "/courses", label: "Explore" },
  { href: "/dashboard", label: "My learning" },
  { href: "/about", label: "About us" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container nav-inner">
        <Logo />

        <nav className="nav-desktop" aria-label="Primary navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              className={pathname.startsWith(link.href) ? "nav-link active" : "nav-link"}
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          <Link className="nav-login" href="/login">
            Log in
          </Link>
          <Link className="button button-primary button-small nav-join" href="/register">
            Join for free
          </Link>
          <button
            type="button"
            className="nav-menu-button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <Icon name={open ? "x" : "menu"} />
          </button>
        </div>
      </div>

      {open && (
        <nav className="mobile-menu" aria-label="Mobile navigation">
          <div className="container mobile-menu-inner">
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ))}
            <Link href="/login" onClick={() => setOpen(false)}>
              Log in
            </Link>
            <Link href="/register" onClick={() => setOpen(false)}>
              Join for free
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
