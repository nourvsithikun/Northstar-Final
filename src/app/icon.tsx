import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 7,
          background: "#2557d6",
          color: "white",
          fontSize: 20,
          fontWeight: 800,
        }}
      >
        N
      </div>
    ),
    size,
  );
}
