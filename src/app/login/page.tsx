import { UnavailableFeature } from "@/components/ui/unavailable-feature";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Log in",
  description: "Learn how account access works on Northstar Learning.",
  path: "/login",
});

export default function LoginPage() {
  return <UnavailableFeature eyebrow="Log in" title="Accounts are not available yet." description="Northstar connects to a course API that currently supports course content and enrollment, but not identity or session management." />;
}
