"use client";

import { useMemo, useState } from "react";
import { CourseCard } from "@/components/courses/course-card";
import { Icon } from "@/components/ui/icon";
import {
  courseTopics,
  getCourseTopic,
  learnerCount,
  lessonCount,
  type CourseTopic,
} from "@/lib/course-utils";
import type { Course } from "@/types/course";

type SortOption = "recommended" | "title" | "lessons" | "learners";

export function CourseExplorer({
  courses,
  initialQuery = "",
  initialTopic = "All",
}: {
  courses: Course[];
  initialQuery?: string;
  initialTopic?: CourseTopic | "All";
}) {
  const [query, setQuery] = useState(initialQuery);
  const [topic, setTopic] = useState<CourseTopic | "All">(initialTopic);
  const [sort, setSort] = useState<SortOption>("recommended");

  const visibleCourses = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const filtered = courses.filter((course) => {
      const matchesSearch =
        !normalized ||
        course.title.toLowerCase().includes(normalized) ||
        course.description.toLowerCase().includes(normalized);
      const matchesTopic = topic === "All" || getCourseTopic(course) === topic;
      return matchesSearch && matchesTopic;
    });

    return [...filtered].sort((a, b) => {
      if (sort === "title") return a.title.localeCompare(b.title);
      if (sort === "lessons") return lessonCount(b) - lessonCount(a);
      if (sort === "learners") return learnerCount(b) - learnerCount(a);
      return 0;
    });
  }, [courses, query, sort, topic]);

  return (
    <div>
      <div className="explorer-controls">
        <label className="search-control">
          <span className="sr-only">Search courses</span>
          <Icon name="search" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="What do you want to learn?"
          />
        </label>
        <label className="sort-control">
          <span>Sort by</span>
          <select value={sort} onChange={(event) => setSort(event.target.value as SortOption)}>
            <option value="recommended">Recommended</option>
            <option value="title">Title A–Z</option>
            <option value="lessons">Most lessons</option>
            <option value="learners">Most learners</option>
          </select>
          <Icon name="chevron-down" />
        </label>
      </div>

      <div className="topic-filters" aria-label="Filter by topic">
        {(["All", ...courseTopics] as const).map((item) => (
          <button
            type="button"
            key={item}
            className={topic === item ? "topic-chip active" : "topic-chip"}
            onClick={() => setTopic(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="results-heading" aria-live="polite">
        <p>
          <strong>{visibleCourses.length}</strong> {visibleCourses.length === 1 ? "course" : "courses"}
        </p>
        {(query || topic !== "All") && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setTopic("All");
            }}
          >
            Clear filters
          </button>
        )}
      </div>

      {visibleCourses.length ? (
        <div className="course-grid">
          {visibleCourses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      ) : (
        <div className="empty-state compact-empty">
          <Icon name="search" />
          <h2>No matching courses</h2>
          <p>Try a broader search or choose a different topic.</p>
          <button
            type="button"
            className="button button-secondary"
            onClick={() => {
              setQuery("");
              setTopic("All");
            }}
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
