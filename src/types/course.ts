export interface Lesson {
  _id: string;
  title: string;
  content: string;
  course: string;
  __v?: number;
}

export interface CourseMaterial {
  _id?: string;
  name?: string;
  url?: string;
}

export interface Course {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  enrolledStudents: unknown[];
  quizzes: unknown[];
  materials: Array<CourseMaterial | string>;
  lessons: Array<string | Lesson>;
  __v?: number;
}

export interface CourseCurriculum {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  lessons: Lesson[];
}

export interface EnrollmentResponse {
  message?: string;
  course?: Course;
  [key: string]: unknown;
}
