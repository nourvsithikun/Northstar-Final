import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  CirclePlay,
  Clock3,
} from "lucide-react";
import { cn } from "cn";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Image {
  src: string;
  alt: string;
  srcDark?: string;
}
interface HeroButton {
  text: string;
  url: string;
  icon?: ReactNode;
}
interface Buttons {
  primary?: HeroButton;
  secondary?: HeroButton;
}
interface Badge {
  text: string;
  announcement?: string;
  url?: string;
}

interface HeroBasicProps {
  badge?: Badge;
  heading: ReactNode;
  description: string;
  buttons?: Buttons;
  image?: Image;
  children?: ReactNode;
  className?: string;
}

type Hero1Props = HeroBasicProps;
type Props = Partial<Hero1Props>;

const defaultProps: Hero1Props = {
  badge: {
    text: "Changelog v1.1",
    announcement: "Check out our latest updates",
  },
  heading: "Blocks Built With Shadcn & Tailwind",
  description:
    "Finely crafted components built with React, Tailwind and shadcn/ui. Developers can copy and paste these blocks directly into their project.",
  buttons: {
    primary: {
      text: "Browse Components",
      url: "https://shadcnblocks.com",
    },
    secondary: {
      text: "View GitHub",
      url: "https://shadcnblocks.com",
    },
  },
};

const Hero1 = (props: Props) => {
  const { badge, heading, description, buttons, image, children, className } = {
    ...defaultProps,
    ...props,
  };

  return (
    <section
      className={cn("py-24 lg:py-32", className)}
      data-component-source="shadcnblocks/hero1"
    >
      <div className="container mx-auto">
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col items-center gap-5 text-center lg:items-start lg:text-left">
            {badge && (
              <Badge variant="outline">
                {badge.text}
                <ArrowUpRight className="size-4" />
              </Badge>
            )}
            <h1 className="max-w-xl text-5xl font-bold tracking-[-0.055em] text-pretty md:text-6xl lg:max-w-3xl lg:text-7xl">
              {heading}
            </h1>
            <p className="max-w-5xl text-balance text-muted-foreground lg:text-xl">
              {description}
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              {buttons?.primary && (
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link href={buttons.primary.url}>
                    {buttons.primary.text}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              )}
              {buttons?.secondary && (
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <Link href={buttons.secondary.url}>{buttons.secondary.text}</Link>
                </Button>
              )}
            </div>
            {children}
          </div>
          {image ? (
            <div className="shadcnblocks-hero-image relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-muted shadow-2xl">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="shadcnblocks-hero-preview" aria-label="Learning dashboard preview">
              <div className="shadcnblocks-preview-toolbar">
                <div className="shadcnblocks-preview-brand">
                  <span><BookOpen /></span>
                  <div><small>NORTHSTAR CLASSROOM</small><strong>Frontend foundations</strong></div>
                </div>
                <span className="shadcnblocks-preview-status">In progress</span>
              </div>

              <div className="shadcnblocks-preview-summary">
                <div>
                  <small>WEEKLY PROGRESS</small>
                  <strong>Keep your momentum.</strong>
                  <p>Two focused lessons left to reach this week&apos;s goal.</p>
                </div>
                <div className="shadcnblocks-progress-ring">
                  <span>68%</span>
                  <small>complete</small>
                </div>
              </div>

              <div className="shadcnblocks-preview-lessons">
                <div className="complete">
                  <span><CheckCircle2 /></span>
                  <div><small>LESSON 01</small><strong>Core concepts</strong></div>
                  <em>18 min</em>
                </div>
                <div className="active">
                  <span><CirclePlay /></span>
                  <div><small>LESSON 02</small><strong>Build your first project</strong></div>
                  <em>Continue</em>
                </div>
                <div>
                  <span><Clock3 /></span>
                  <div><small>UP NEXT</small><strong>Practice and review</strong></div>
                  <em>24 min</em>
                </div>
              </div>

              <div className="shadcnblocks-preview-foot">
                <div className="shadcnblocks-avatars" aria-hidden="true"><span>JD</span><span>AK</span><span>+8</span></div>
                <p><strong>1,240 learners</strong><span> building skills with you</span></p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export { Hero1 };
