import {
  createOpenGraphImage,
  OPEN_GRAPH_CONTENT_TYPE,
  OPEN_GRAPH_SIZE,
} from "@/lib/open-graph";

export const alt = "Northstar My Learning dashboard";
export const size = OPEN_GRAPH_SIZE;
export const contentType = OPEN_GRAPH_CONTENT_TYPE;

export default function Image() {
  return createOpenGraphImage({
    eyebrow: "My learning",
    title: "Keep building your momentum.",
    description: "Return to enrolled courses and continue your latest Northstar lesson.",
    accent: "#17785a",
  });
}
