import { UnavailableFeature } from "@/components/ui/unavailable-feature";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Join Northstar",
  description: "Explore Northstar courses freely and start learning at your own pace.",
  path: "/register",
});

export default function RegisterPage() {
  return <UnavailableFeature eyebrow="Join Northstar" title="Explore freely—no account required." description="Registration is not part of the documented backend, so you can browse courses and read lessons without sharing personal information." />;
}
