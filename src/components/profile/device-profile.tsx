"use client";

import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { useEnrolledCourseIds, useRecentCourseIds } from "@/hooks/use-learning-storage";

export function DeviceProfile() {
  const enrolled = useEnrolledCourseIds();
  const recent = useRecentCourseIds();

  return (
    <div className="profile-card">
      <div className="profile-avatar" aria-hidden="true">NL</div>
      <div className="profile-intro"><span>LOCAL LEARNING PROFILE</span><h1>Your learning, on this device</h1><p>No personal information is stored because the backend does not expose user or profile endpoints.</p></div>
      <div className="profile-stats">
        <div><strong>{enrolled.length}</strong><span>Enrolled courses</span></div>
        <div><strong>{recent.length}</strong><span>Recently opened</span></div>
      </div>
      <div className="notice-card profile-notice"><span><Icon name="lock" /></span><div><strong>Private by default</strong><p>Enrollment shortcuts and lesson checkmarks stay in this browser. Clearing site storage removes them.</p></div></div>
      <div className="profile-actions"><Link className="button button-primary" href="/dashboard">Open My learning <Icon name="arrow-right" /></Link><Link className="button button-secondary" href="/courses">Browse courses</Link></div>
    </div>
  );
}
