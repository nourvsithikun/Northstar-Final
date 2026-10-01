import {
  createOpenGraphImage,
  OPEN_GRAPH_CONTENT_TYPE,
  OPEN_GRAPH_SIZE,
} from "@/lib/open-graph";

export const alt = "Northstar local learning profile";
export const size = OPEN_GRAPH_SIZE;
export const contentType = OPEN_GRAPH_CONTENT_TYPE;

export default function Image() {
  return createOpenGraphImage({
    eyebrow: "Learning profile",
    title: "Your learning, on your device.",
    description: "See enrolled courses and recently opened lessons in one focused place.",
    accent: "#6745b5",
  });
}
