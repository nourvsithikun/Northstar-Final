import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "cn";
import { Button } from "@/components/ui/button";

interface ShadcnSpaceButtonProps {
  children: ReactNode;
  href: string;
  className?: string;
}

const ShadcnSpaceButton = ({
  children,
  href,
  className,
}: ShadcnSpaceButtonProps) => {
  return (
    <div
      className={cn(
        "shadcn-space-cta relative inline-flex h-fit w-fit overflow-hidden rounded-lg",
        className,
      )}
      data-component-source="shadcn-space/button-06"
    >
      <span className="shadcn-space-cta-glow" aria-hidden="true" />

      <Button
        asChild
        className="shadcn-space-cta-button relative z-10 h-12 rounded-[7px] px-6 text-sm font-bold shadow-none"
      >
        <Link href={href}>
          {children}
          <ArrowRight className="size-4" />
        </Link>
      </Button>
    </div>
  );
};

export default ShadcnSpaceButton;

