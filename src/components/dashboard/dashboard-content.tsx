"use client";

import Link from "next/link";
import { CourseThumbnail } from "@/components/courses/course-thumbnail";
import { Icon } from "@/components/ui/icon";
import { useCompletedLessonIds, useEnrolledCourseIds, useRecentCourseIds } from "@/hooks/use-learning-storage";
import type { Course } from "@/types/course";

function LearningCourseRow({ course, recent }: { course: Course; recent: boolean }) {
  const completed = useCompletedLessonIds(course._id);
  const total = course.lessons.length;
  const percent = total ? Math.round((completed.length / total) * 100) : 0;

  return (
    <article className="dashboard-course-row">
      <CourseThumbnail src={course.thumbnail} alt="" />
      <div className="dashboard-course-info">
        {recent && <span className="recent-label">Recently opened</span>}
        <h3>{course.title}</h3>
        <p>{course.description}</p>
        <div className="dashboard-progress"><span className="progress-track"><span style={{ width: `${percent}%` }} /></span><strong>{percent}%</strong></div>
        <span>{completed.length} of {total} lessons complete</span>
      </div>
      {total ? <Link className="button button-secondary" href={`/learn/${course._id}`}>{percent ? "Continue" : "Start course"}<Icon name="arrow-right" /></Link> : <span className="coming-soon">Lessons coming soon</span>}
    </article>
  );
}

export function DashboardContent({ courses }: { courses: Course[] }) {
  const enrolledIds = useEnrolledCourseIds();
  const recentIds = useRecentCourseIds();
  const enrolled = enrolledIds.map((id) => courses.find((course) => course._id === id)).filter((course): course is Course => Boolean(course));
  const recentCourseId = recentIds.find((id) => enrolledIds.includes(id));
  const availableLessons = enrolled.reduce((sum, course) => sum + course.lessons.length, 0);

  return (
    <>
      <section className="dashboard-welcome">
        <div className="container dashboard-welcome-inner">
          <div><span className="eyebrow light">My learning</span><h1>Welcome back.</h1><p>Pick up where you left off or find your next course.</p></div>
          <Link className="button button-light" href="/courses">Explore courses <Icon name="arrow-right" /></Link>
        </div>
      </section>
      <section className="section dashboard-section">
        <div className="container">
          <div className="dashboard-stats">
            <div><span><Icon name="book" /></span><div><strong>{enrolled.length}</strong><p>Enrolled courses</p></div></div>
            <div><span><Icon name="layers" /></span><div><strong>{availableLessons}</strong><p>Available lessons</p></div></div>
            <div><span><Icon name="target" /></span><div><strong>{recentIds.length}</strong><p>Recently opened</p></div></div>
          </div>

          <div className="dashboard-heading"><div><span className="eyebrow">Your library</span><h2>Enrolled courses</h2></div><span className="device-note">Saved on this device</span></div>
          {enrolled.length ? (
            <div className="dashboard-course-list">{enrolled.map((course) => <LearningCourseRow key={course._id} course={course} recent={course._id === recentCourseId} />)}</div>
          ) : (
            <div className="empty-state dashboard-empty"><span className="empty-icon"><Icon name="book" /></span><h2>Your learning library is ready</h2><p>Enroll in a course to add it here. The live API does not provide user accounts, so this list is stored only on this device.</p><Link className="button button-primary" href="/courses">Find a course <Icon name="arrow-right" /></Link></div>
          )}
        </div>
      </section>
    </>
  );
}
