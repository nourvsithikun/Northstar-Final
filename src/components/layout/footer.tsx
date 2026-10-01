import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/layout/logo";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo />
          <p>
            Practical technology courses, organized for focused learning at your own pace.
          </p>
        </div>
        <div>
          <h2>Learn</h2>
          <Link href="/courses">Browse courses</Link>
          <Link href="/dashboard">My learning</Link>
        </div>
        <div>
          <h2>Account</h2>
          <Link href="/login">Log in</Link>
          <Link href="/register">Create account</Link>
          <Link href="/profile">Profile</Link>
        </div>
        <div>
          <h2>Platform</h2>
          <Link href="/about">About us</Link>
          <a href="https://e-learning.cheat.casa/api-docs">API documentation</a>
          <a href="mailto:hello@northstar.example">Contact</a>
        </div>
      </div>
      <div className="container footer-school">
        <div className="footer-school-logo">
          <Image
            src="/images/about/istad-logo.jpg"
            alt="ISTAD — Institute of Science and Technology Advanced Development"
            width={108}
            height={108}
            sizes="108px"
          />
        </div>
        <div>
          <span>Our academic home</span>
          <strong>Institute of Science and Technology Advanced Development</strong>
          <p>Northstar Learning was created as an ISTAD student project.</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Northstar Learning</span>
        <span>Built for curious minds.</span>
      </div>
    </footer>
  );
}
