import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { CourseThumbnail } from "@/components/courses/course-thumbnail";
import { EnrollButton } from "@/components/courses/enroll-button";
import { ApiErrorState } from "@/components/ui/api-error";
import { Icon } from "@/components/ui/icon";
import { ApiError } from "@/lib/api/client";
import { courseApi } from "@/lib/api/courses";
import { formatCount, getCourseTopic, learnerCount } from "@/lib/course-utils";
import { createPageMetadata } from "@/lib/metadata";

type CoursePageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    const course = await courseApi.getById(id);
    return createPageMetadata({
      title: course.title,
      description: course.description,
      path: `/courses/${id}`,
    });
  } catch {
    return createPageMetadata({
      title: "Course",
      description: "Explore a practical course on Northstar Learning.",
      path: "/courses",
    });
  }
}

export default async function CourseDetailPage({ params }: CoursePageProps) {
  const { id } = await params;
  const courseResult = await courseApi
    .getById(id)
    .then((course) => ({ course, error: null }))
    .catch((error: unknown) => ({ course: null, error }));

  if (!courseResult.course) {
    const error = courseResult.error;
    if (error instanceof ApiError && error.status === 404) notFound();
    return <AppShell><section className="section page-state-section"><div className="container"><ApiErrorState title="This course couldn’t be loaded" /></div></section></AppShell>;
  }

  const course = courseResult.course;
  const curriculumResult = await courseApi.getCurriculum(id).catch(() => null);
  const lessons = curriculumResult?.lessons ?? [];

  return (
      <AppShell>
        <section className="detail-hero">
          <div className="container">
            <Link className="back-link detail-back" href="/courses"><Icon name="arrow-left" /> All courses</Link>
            <div className="detail-hero-grid">
              <div className="detail-copy">
                <span className="topic-pill">{getCourseTopic(course)}</span>
                <h1>{course.title}</h1>
                <p>{course.description}</p>
                <div className="detail-meta">
                  <span><Icon name="book" /><strong>{lessons.length}</strong> lessons</span>
                  <span><Icon name="users" /><strong>{formatCount(learnerCount(course))}</strong> enrolled</span>
                  <span><Icon name="clock" />Self-paced</span>
                </div>
              </div>
              <CourseThumbnail className="detail-thumbnail" src={course.thumbnail} alt={`${course.title} course cover`} priority />
            </div>
          </div>
        </section>

        <section className="section course-detail-section">
          <div className="container detail-layout">
            <div className="detail-main">
              <div className="detail-block">
                <span className="eyebrow">Course overview</span>
                <h2>What you’ll study</h2>
                <p className="detail-description">
                  {course.description}. Follow the curriculum in order or open any lesson when you need a focused refresher.
                </p>
                <div className="detail-points">
                  <div><span><Icon name="check" /></span><p>Work through structured lessons at your own pace</p></div>
                  <div><span><Icon name="check" /></span><p>Read focused explanations from the live course curriculum</p></div>
                  <div><span><Icon name="check" /></span><p>Track lesson completion locally on this device</p></div>
                </div>
              </div>

              <div className="detail-block curriculum-block">
                <div className="curriculum-heading">
                  <div><span className="eyebrow">Curriculum</span><h2>Course lessons</h2></div>
                  <span>{lessons.length} {lessons.length === 1 ? "lesson" : "lessons"}</span>
                </div>
                {lessons.length ? (
                  <ol className="curriculum-list">
                    {lessons.map((lesson, index) => (
                      <li key={lesson._id}>
                        <span className="curriculum-number">{String(index + 1).padStart(2, "0")}</span>
                        <div><h3>{lesson.title}</h3><p>{lesson.content}</p></div>
                        <Icon name="arrow-right" />
                      </li>
                    ))}
                  </ol>
                ) : (
                  <div className="empty-state compact-empty curriculum-empty">
                    <Icon name="book" /><h3>No lessons published yet</h3><p>You can enroll now and return when the curriculum is available.</p>
                  </div>
                )}
              </div>
            </div>

            <aside className="enroll-card">
              <span className="enroll-price">Free access</span>
              <h2>Start learning today</h2>
              <p>Enrollment is sent to the live course API. Your course shortcut is then saved on this device.</p>
              <EnrollButton courseId={course._id} hasLessons={lessons.length > 0} />
              <div className="enroll-divider" />
              <h3>This course includes</h3>
              <ul>
                <li><Icon name="book" /> {lessons.length} text lessons</li>
                <li><Icon name="clock" /> Self-paced access</li>
                <li><Icon name="target" /> On-device progress</li>
              </ul>
              <small>No payment or account information is required by the API.</small>
            </aside>
          </div>
        </section>
      </AppShell>
  );
}
