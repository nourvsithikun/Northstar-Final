import Link from "next/link";
import { CourseThumbnail } from "@/components/courses/course-thumbnail";
import { Icon } from "@/components/ui/icon";
import {
  formatCount,
  getCourseTopic,
  learnerCount,
  lessonCount,
} from "@/lib/course-utils";
import type { Course } from "@/types/course";

export function CourseCard({ course, featured = false }: { course: Course; featured?: boolean }) {
  const topic = getCourseTopic(course);
  const lessons = lessonCount(course);
  const learners = learnerCount(course);

  return (
    <article className={featured ? "course-card featured-card" : "course-card"}>
      <Link href={`/courses/${course._id}`} aria-label={`View ${course.title}`}>
        <CourseThumbnail src={course.thumbnail} alt="" />
      </Link>
      <div className="course-card-body">
        <div className="course-card-topline">
          <span className="topic-label">{topic}</span>
          <span className="lesson-label">
            <Icon name="book" />
            {lessons} {lessons === 1 ? "lesson" : "lessons"}
          </span>
        </div>
        <h3>
          <Link href={`/courses/${course._id}`}>{course.title}</Link>
        </h3>
        <p>{course.description}</p>
        <div className="course-card-footer">
          <span>
            <Icon name="users" />
            {formatCount(learners)} enrolled
          </span>
          <Link className="card-link" href={`/courses/${course._id}`}>
            View course <Icon name="arrow-right" />
          </Link>
        </div>
      </div>
    </article>
  );
}
