import { ImageResponse } from "next/og";

export const OPEN_GRAPH_SIZE = { width: 1200, height: 630 };
export const OPEN_GRAPH_CONTENT_TYPE = "image/png";

interface OpenGraphImageOptions {
  eyebrow: string;
  title: string;
  description: string;
  accent?: string;
}

export function createOpenGraphImage({
  eyebrow,
  title,
  description,
  accent = "#2557d6",
}: OpenGraphImageOptions) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#f6f8ff",
          color: "#0b1d47",
          padding: "72px 82px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            opacity: 0.55,
            backgroundImage:
              "linear-gradient(#dfe7fa 1px, transparent 1px), linear-gradient(90deg, #dfe7fa 1px, transparent 1px)",
            backgroundSize: "74px 74px",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -130,
            top: -165,
            display: "flex",
            width: 570,
            height: 570,
            border: `92px solid ${accent}18`,
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            width: "100%",
            height: "100%",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                display: "flex",
                width: 52,
                height: 52,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
                background: accent,
                color: "white",
                fontSize: 30,
                fontWeight: 800,
              }}
            >
              N
            </div>
            <div style={{ display: "flex", fontSize: 27, fontWeight: 800 }}>
              Northstar Learning
            </div>
          </div>

          <div style={{ display: "flex", maxWidth: 960, flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                marginBottom: 18,
                color: accent,
                fontSize: 18,
                fontWeight: 800,
                letterSpacing: 3,
                textTransform: "uppercase",
              }}
            >
              {eyebrow}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: title.length > 46 ? 58 : 68,
                fontWeight: 800,
                letterSpacing: -3.5,
                lineHeight: 1.04,
              }}
            >
              {title}
            </div>
            <div
              style={{
                display: "flex",
                maxWidth: 850,
                marginTop: 24,
                color: "#526078",
                fontSize: 25,
                lineHeight: 1.45,
              }}
            >
              {description.slice(0, 155)}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
            <div style={{ display: "flex", width: 48, height: 5, background: "#f0a72c" }} />
            <div style={{ display: "flex", color: "#667288", fontSize: 18 }}>
              Practical skills. Clear lessons. Your pace.
            </div>
          </div>
        </div>
      </div>
    ),
    OPEN_GRAPH_SIZE,
  );
}
