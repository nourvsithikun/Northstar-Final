import {
  createOpenGraphImage,
  OPEN_GRAPH_CONTENT_TYPE,
  OPEN_GRAPH_SIZE,
} from "@/lib/open-graph";

export const alt = "Meet the Northstar Learning team";
export const size = OPEN_GRAPH_SIZE;
export const contentType = OPEN_GRAPH_CONTENT_TYPE;

export default function Image() {
  return createOpenGraphImage({
    eyebrow: "About our team",
    title: "Built by learners, for learners.",
    description: "Meet the mentor and student team behind Northstar Learning at ISTAD.",
    accent: "#29449a",
  });
}
