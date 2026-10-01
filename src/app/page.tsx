import Link from "next/link";
import { Hero1 } from "@/components/hero1";
import { AppShell } from "@/components/layout/app-shell";
import { CourseCard } from "@/components/courses/course-card";
import ShadcnSpaceButton from "@/components/shadcn-space/button/button-06";
import { Icon } from "@/components/ui/icon";
import { courseApi } from "@/lib/api/courses";
import {
  courseTopics,
  formatCount,
  getCourseTopic,
  learnerCount,
  lessonCount,
} from "@/lib/course-utils";
import type { Course } from "@/types/course";
import { createPageMetadata, SITE_DESCRIPTION, SITE_NAME } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  path: "/",
  absoluteTitle: true,
});

export default async function Home() {
  let courses: Course[] = [];
  let serviceAvailable = true;

  try {
    courses = await courseApi.getAll();
  } catch {
    serviceAvailable = false;
  }

  const featured = courses.filter((course) => lessonCount(course) > 0).slice(0, 4);
  const totalLessons = courses.reduce((sum, course) => sum + lessonCount(course), 0);
  const totalLearners = courses.reduce((sum, course) => sum + learnerCount(course), 0);
  const topicStats = courseTopics
    .map((topic) => ({
      topic,
      count: courses.filter((course) => getCourseTopic(course) === topic).length,
    }))
    .filter((item) => item.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 4);

  return (
    <AppShell>
      <Hero1
        className="northstar-shadcn-hero"
        badge={{ text: `${courses.length || "Live"} practical courses` }}
        heading={<>Skills that move you <em>forward.</em></>}
        description="Build practical technology skills through focused courses and clear, thoughtfully sequenced lessons."
        buttons={{
          primary: { text: "Explore courses", url: "/courses" },
          secondary: { text: "My learning", url: "/dashboard" },
        }}
      >
        <div className="northstar-hero-search-wrap">
            <form className="hero-search" action="/courses">
              <Icon name="search" />
              <label className="sr-only" htmlFor="home-search">Search the course catalog</label>
              <input id="home-search" name="q" placeholder="What do you want to learn?" />
              <button type="submit">Search courses</button>
            </form>
            <div className="hero-trust">
              <span>Learn at your pace</span>
              <span>Real course content</span>
              <span>Free to explore</span>
            </div>
        </div>
      </Hero1>

      <section className="stats-bar" aria-label="Platform statistics">
        <div className="container stats-grid">
          <div><strong>{courses.length || "—"}</strong><span>Courses to explore</span></div>
          <div><strong>{totalLessons || "—"}</strong><span>Practical lessons</span></div>
          <div><strong>{formatCount(totalLearners)}</strong><span>API enrollments</span></div>
          <div><strong>6</strong><span>Technology focuses</span></div>
        </div>
      </section>

      {!serviceAvailable && (
        <div className="container service-notice" role="status">
          <Icon name="compass" />
          <div>
            <strong>The live catalog is temporarily unavailable.</strong>
            <span>The page is ready; course data will appear when the API responds.</span>
          </div>
        </div>
      )}

      <section className="section featured-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Handpicked to get you started</span>
              <h2>Featured courses</h2>
              <p>Practical subjects, clearly structured and ready when you are.</p>
            </div>
            <Link className="text-link" href="/courses">View all courses <Icon name="arrow-right" /></Link>
          </div>
          {featured.length ? (
            <div className="course-grid featured-grid">
              {featured.map((course) => <CourseCard key={course._id} course={course} featured />)}
            </div>
          ) : (
            <div className="empty-state compact-empty">
              <Icon name="book" />
              <h3>Courses will appear here</h3>
              <p>We’re waiting for the live catalog to respond.</p>
            </div>
          )}
        </div>
      </section>

      <section className="section topic-section">
        <div className="container">
          <div className="section-heading centered-heading">
            <div>
              <span className="eyebrow">Find your direction</span>
              <h2>Explore by focus</h2>
              <p>Topic groups are organized from the subjects in the live catalog.</p>
            </div>
          </div>
          <div className="topic-grid">
            {topicStats.map(({ topic, count }, index) => (
              <Link key={topic} href={`/courses?topic=${encodeURIComponent(topic)}`} className="topic-card">
                <span className={`topic-icon topic-icon-${index + 1}`}>
                  <Icon name={index === 0 ? "code" : index === 1 ? "layers" : index === 2 ? "target" : "compass"} />
                </span>
                <div><h3>{topic}</h3><p>{count} {count === 1 ? "course" : "courses"}</p></div>
                <Icon name="arrow-right" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section value-section">
        <div className="container value-grid">
          <div className="value-copy">
            <span className="eyebrow">Built around momentum</span>
            <h2>Learning that fits real life.</h2>
            <p>
              Open a course, move through focused text lessons, and keep your place on this device—without unnecessary friction.
            </p>
            <Link className="button button-primary" href="/courses">Start exploring <Icon name="arrow-right" /></Link>
          </div>
          <div className="value-points">
            <div><span><Icon name="target" /></span><div><h3>Clear, focused lessons</h3><p>Each course is broken into a sequence you can complete one step at a time.</p></div></div>
            <div><span><Icon name="clock" /></span><div><h3>Learn on your schedule</h3><p>Your on-device lesson progress is ready when you return.</p></div></div>
            <div><span><Icon name="book" /></span><div><h3>Direct from the source</h3><p>Catalog and curriculum content come from the live learning API.</p></div></div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container cta-inner">
          <div><span className="eyebrow light">Your next skill starts here</span><h2>Ready to learn something new?</h2><p>Explore the catalog and open your first lesson in minutes.</p></div>
          <ShadcnSpaceButton href="/courses">Browse all courses</ShadcnSpaceButton>
        </div>
      </section>
    </AppShell>
  );
}
