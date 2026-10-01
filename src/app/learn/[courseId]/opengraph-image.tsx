import { courseApi } from "@/lib/api/courses";
import {
  createOpenGraphImage,
  OPEN_GRAPH_CONTENT_TYPE,
  OPEN_GRAPH_SIZE,
} from "@/lib/open-graph";

export const alt = "Northstar course learning space";
export const size = OPEN_GRAPH_SIZE;
export const contentType = OPEN_GRAPH_CONTENT_TYPE;

export default async function Image({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const course = await courseApi.getById(courseId).catch(() => null);

  return createOpenGraphImage({
    eyebrow: "Continue learning",
    title: course?.title ?? "Your next lesson is ready.",
    description:
      course?.description ?? "Return to your course and continue making progress.",
    accent: "#17785a",
  });
}
