import {
  createOpenGraphImage,
  OPEN_GRAPH_CONTENT_TYPE,
  OPEN_GRAPH_SIZE,
} from "@/lib/open-graph";

export const alt = "Northstar Learning login information";
export const size = OPEN_GRAPH_SIZE;
export const contentType = OPEN_GRAPH_CONTENT_TYPE;

export default function Image() {
  return createOpenGraphImage({
    eyebrow: "Account access",
    title: "Learn without unnecessary friction.",
    description: "Explore the live course catalog and start learning at your own pace.",
  });
}
