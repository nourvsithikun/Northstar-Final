import {
  createOpenGraphImage,
  OPEN_GRAPH_CONTENT_TYPE,
  OPEN_GRAPH_SIZE,
} from "@/lib/open-graph";

export const alt = "Explore the Northstar course catalog";
export const size = OPEN_GRAPH_SIZE;
export const contentType = OPEN_GRAPH_CONTENT_TYPE;

export default function Image() {
  return createOpenGraphImage({
    eyebrow: "Course catalog",
    title: "Learn the skills shaping tomorrow.",
    description: "Explore practical courses in development, data, cloud, design, and more.",
  });
}
