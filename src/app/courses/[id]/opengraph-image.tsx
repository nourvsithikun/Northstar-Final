import { courseApi } from "@/lib/api/courses";
import { getCourseTopic } from "@/lib/course-utils";
import {
  createOpenGraphImage,
  OPEN_GRAPH_CONTENT_TYPE,
  OPEN_GRAPH_SIZE,
} from "@/lib/open-graph";

export const alt = "Northstar course preview";
export const size = OPEN_GRAPH_SIZE;
export const contentType = OPEN_GRAPH_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const course = await courseApi.getById(id).catch(() => null);

  return createOpenGraphImage({
    eyebrow: course ? getCourseTopic(course) : "Northstar course",
    title: course?.title ?? "Practical learning starts here.",
    description:
      course?.description ?? "Explore focused technology courses and clear lessons.",
  });
}
