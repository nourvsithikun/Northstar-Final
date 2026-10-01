import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LearningExperience } from "@/components/learning/learning-experience";
import { ApiErrorState } from "@/components/ui/api-error";
import { ApiError } from "@/lib/api/client";
import { courseApi } from "@/lib/api/courses";
import { createPageMetadata } from "@/lib/metadata";

type LearnPageProps = { params: Promise<{ courseId: string }> };

export async function generateMetadata({ params }: LearnPageProps): Promise<Metadata> {
  const { courseId } = await params;
  const course = await courseApi.getById(courseId).catch(() => null);

  return createPageMetadata({
    title: course ? `Learn ${course.title}` : "Course lesson",
    description:
      course?.description ?? "Continue a focused course lesson on Northstar Learning.",
    path: `/learn/${courseId}`,
  });
}

export default async function LearnPage({ params }: LearnPageProps) {
  const { courseId } = await params;
  const result = await courseApi
    .getCurriculum(courseId)
    .then((course) => ({ course, error: null }))
    .catch((error: unknown) => ({ course: null, error }));

  if (!result.course) {
    const error = result.error;
    if (error instanceof ApiError && error.status === 404) notFound();
    return <section className="section page-state-section"><div className="container"><ApiErrorState title="The learning space couldn’t be loaded" /></div></section>;
  }

  return <LearningExperience course={result.course} />;
}
