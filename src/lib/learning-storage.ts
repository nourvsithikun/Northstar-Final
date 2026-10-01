const ENROLLMENT_KEY = "northstar:enrolled-courses";
const COMPLETION_PREFIX = "northstar:completed-lessons:";
const RECENT_KEY = "northstar:recent-courses";

function readList(key: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const value = JSON.parse(window.localStorage.getItem(key) ?? "[]") as unknown;
    return Array.isArray(value)
      ? value.filter((item): item is string => typeof item === "string")
      : [];
  } catch {
    return [];
  }
}

function writeList(key: string, values: string[]) {
  window.localStorage.setItem(key, JSON.stringify([...new Set(values)]));
  window.dispatchEvent(new Event("northstar:storage"));
}

export function getEnrolledCourseIds() {
  return readList(ENROLLMENT_KEY);
}

export function saveEnrolledCourse(courseId: string) {
  writeList(ENROLLMENT_KEY, [...getEnrolledCourseIds(), courseId]);
}

export function getCompletedLessonIds(courseId: string) {
  return readList(`${COMPLETION_PREFIX}${courseId}`);
}

export function toggleCompletedLesson(courseId: string, lessonId: string) {
  const completed = getCompletedLessonIds(courseId);
  writeList(
    `${COMPLETION_PREFIX}${courseId}`,
    completed.includes(lessonId)
      ? completed.filter((id) => id !== lessonId)
      : [...completed, lessonId],
  );
}

export function touchRecentCourse(courseId: string) {
  const recent = readList(RECENT_KEY).filter((id) => id !== courseId);
  writeList(RECENT_KEY, [courseId, ...recent].slice(0, 5));
}

export function getRecentCourseIds() {
  return readList(RECENT_KEY);
}
