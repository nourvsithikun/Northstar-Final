import type { Course } from "@/types/course";

export type CourseTopic =
  | "Frontend"
  | "Backend"
  | "Data & AI"
  | "Cloud & DevOps"
  | "Foundations"
  | "Design";

export const courseTopics: CourseTopic[] = [
  "Frontend",
  "Backend",
  "Data & AI",
  "Cloud & DevOps",
  "Foundations",
  "Design",
];

export function getCourseTopic(course: Pick<Course, "title" | "description">) {
  const text = `${course.title} ${course.description}`.toLowerCase();

  if (/ui\/ux|css|design principles/.test(text))
    return "Design" satisfies CourseTopic;
  if (/react|vue|next|frontend/.test(text)) return "Frontend" satisfies CourseTopic;
  if (/node|mongo|sql|graphql|backend/.test(text))
    return "Backend" satisfies CourseTopic;
  if (/machine|data|python|algorithm/.test(text))
    return "Data & AI" satisfies CourseTopic;
  if (/docker|aws|devops|cloud|git/.test(text))
    return "Cloud & DevOps" satisfies CourseTopic;
  return "Foundations" satisfies CourseTopic;
}

export function lessonCount(course: Course) {
  return course.lessons?.length ?? 0;
}

export function learnerCount(course: Course) {
  return course.enrolledStudents?.length ?? 0;
}

export function formatCount(value: number) {
  return new Intl.NumberFormat("en", { notation: "compact" }).format(value);
}
