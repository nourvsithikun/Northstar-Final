import { apiFetch } from "@/lib/api/client";
import type {
  Course,
  CourseCurriculum,
  EnrollmentResponse,
  Lesson,
} from "@/types/course";

export const courseApi = {
  getAll: () => apiFetch<Course[]>("/api/courses"),
  getById: (courseId: string) =>
    apiFetch<Course>(`/api/courses/${encodeURIComponent(courseId)}`),
  getCurriculum: (courseId: string) =>
    apiFetch<CourseCurriculum>(
      `/api/courses/${encodeURIComponent(courseId)}/lessons`,
    ),
  getLesson: (courseId: string, lessonId: string) =>
    apiFetch<{ lesson?: Lesson; course?: Course } | Lesson>(
      `/api/courses/${encodeURIComponent(courseId)}/lessons/${encodeURIComponent(lessonId)}`,
    ),
  enroll: (courseId: string) =>
    apiFetch<EnrollmentResponse>(
      `/api/courses/${encodeURIComponent(courseId)}/enroll`,
      {
        method: "POST",
        cache: "no-store",
        revalidate: false,
      },
    ),
};
