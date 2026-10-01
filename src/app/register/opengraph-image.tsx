import {
  createOpenGraphImage,
  OPEN_GRAPH_CONTENT_TYPE,
  OPEN_GRAPH_SIZE,
} from "@/lib/open-graph";

export const alt = "Join Northstar Learning";
export const size = OPEN_GRAPH_SIZE;
export const contentType = OPEN_GRAPH_CONTENT_TYPE;

export default function Image() {
  return createOpenGraphImage({
    eyebrow: "Join Northstar",
    title: "Explore freely. Learn at your pace.",
    description: "Browse practical technology courses and open focused lessons in minutes.",
  });
}
