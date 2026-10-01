"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Logo } from "@/components/layout/logo";
import { Icon } from "@/components/ui/icon";
import { useCompletedLessonIds } from "@/hooks/use-learning-storage";
import { toggleCompletedLesson, touchRecentCourse } from "@/lib/learning-storage";
import type { CourseCurriculum } from "@/types/course";

export function LearningExperience({ course }: { course: CourseCurriculum }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const completed = useCompletedLessonIds(course._id);
  const current = course.lessons[currentIndex];
  const percent = course.lessons.length
    ? Math.round((completed.length / course.lessons.length) * 100)
    : 0;

  useEffect(() => {
    touchRecentCourse(course._id);
  }, [course._id]);

  const readingMinutes = useMemo(() => {
    if (!current) return 0;
    return Math.max(1, Math.ceil(current.content.split(/\s+/).length / 180));
  }, [current]);

  if (!current) {
    return (
      <div className="learn-empty-page">
        <Logo />
        <div className="empty-state">
          <Icon name="book" />
          <h1>No lessons are available yet</h1>
          <p>This course is in the catalog, but its curriculum has not been published.</p>
          <Link className="button button-primary" href={`/courses/${course._id}`}>Back to course</Link>
        </div>
      </div>
    );
  }

  function goToLesson(index: number) {
    setCurrentIndex(index);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="learn-shell">
      <header className="learn-header">
        <div className="learn-header-brand"><Logo compact /><span>{course.title}</span></div>
        <div className="learn-header-progress">
          <div><span>Your progress</span><strong>{percent}%</strong></div>
          <span className="progress-track"><span style={{ width: `${percent}%` }} /></span>
        </div>
        <Link className="learn-exit" href={`/courses/${course._id}`}>Exit course</Link>
        <button className="learn-menu" type="button" aria-label="Open lesson list" onClick={() => setSidebarOpen(true)}><Icon name="menu" /></button>
      </header>

      <div className="learn-layout">
        {sidebarOpen && <button className="learn-overlay" aria-label="Close lesson list" onClick={() => setSidebarOpen(false)} />}
        <aside className={sidebarOpen ? "lesson-sidebar open" : "lesson-sidebar"}>
          <div className="lesson-sidebar-heading">
            <div><span>COURSE CONTENT</span><strong>{course.lessons.length} lessons</strong></div>
            <button type="button" onClick={() => setSidebarOpen(false)} aria-label="Close lesson list"><Icon name="x" /></button>
          </div>
          <ol>
            {course.lessons.map((lesson, index) => {
              const isComplete = completed.includes(lesson._id);
              const isCurrent = currentIndex === index;
              return (
                <li key={lesson._id}>
                  <button className={isCurrent ? "active" : ""} type="button" onClick={() => goToLesson(index)}>
                    <span className={isComplete ? "lesson-status complete" : "lesson-status"}>{isComplete ? <Icon name="check" /> : index + 1}</span>
                    <span><small>Lesson {index + 1}</small><strong>{lesson.title}</strong></span>
                  </button>
                </li>
              );
            })}
          </ol>
          <div className="sidebar-note"><Icon name="target" /><p>Progress is stored locally on this device because the API does not expose student progress.</p></div>
        </aside>

        <article className="lesson-content">
          <div className="lesson-content-inner">
            <div className="lesson-breadcrumb"><span>{course.title}</span><Icon name="arrow-right" /><span>Lesson {currentIndex + 1}</span></div>
            <div className="lesson-kicker"><span>Lesson {String(currentIndex + 1).padStart(2, "0")}</span><span><Icon name="clock" /> {readingMinutes} min read</span></div>
            <h1>{current.title}</h1>
            <div className="lesson-rule" />
            <div className="lesson-prose">
              {current.content.split(/\n{2,}/).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>

            <div className="completion-card">
              <div><span><Icon name={completed.includes(current._id) ? "check" : "target"} /></span><div><h2>{completed.includes(current._id) ? "Lesson complete" : "Finished this lesson?"}</h2><p>{completed.includes(current._id) ? "Nice work. You can continue whenever you’re ready." : "Mark it complete to update your on-device course progress."}</p></div></div>
              <button className={completed.includes(current._id) ? "button button-success" : "button button-primary"} type="button" onClick={() => toggleCompletedLesson(course._id, current._id)}>
                <Icon name="check" /> {completed.includes(current._id) ? "Completed" : "Mark complete"}
              </button>
            </div>

            <nav className="lesson-navigation" aria-label="Lesson navigation">
              <button type="button" disabled={currentIndex === 0} onClick={() => goToLesson(currentIndex - 1)}><Icon name="arrow-left" /><span><small>Previous</small><strong>{course.lessons[currentIndex - 1]?.title ?? "First lesson"}</strong></span></button>
              <button type="button" disabled={currentIndex === course.lessons.length - 1} onClick={() => goToLesson(currentIndex + 1)}><span><small>Next</small><strong>{course.lessons[currentIndex + 1]?.title ?? "Course complete"}</strong></span><Icon name="arrow-right" /></button>
            </nav>
          </div>
        </article>
      </div>
    </main>
  );
}
