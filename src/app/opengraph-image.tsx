import {
  createOpenGraphImage,
  OPEN_GRAPH_CONTENT_TYPE,
  OPEN_GRAPH_SIZE,
} from "@/lib/open-graph";

export const alt = "Northstar Learning online course platform";
export const size = OPEN_GRAPH_SIZE;
export const contentType = OPEN_GRAPH_CONTENT_TYPE;

export default function Image() {
  return createOpenGraphImage({
    eyebrow: "Online learning platform",
    title: "Skills that move you forward.",
    description:
      "Build practical technology skills through focused courses and clear lessons.",
  });
}
