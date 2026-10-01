import { AppShell } from "@/components/layout/app-shell";
import { DeviceProfile } from "@/components/profile/device-profile";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Learning profile",
  description: "Review locally saved Northstar enrollment and recent learning activity.",
  path: "/profile",
});

export default function ProfilePage() {
  return <AppShell><section className="profile-page"><div className="container"><DeviceProfile /></div></section></AppShell>;
}
